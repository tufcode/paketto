import { DeserializerFunction } from "./DeserializerFunction";
import { PrimitiveTypeIds } from "./PrimitiveTypeIds";
import {
  serializeUInt8,
  serializeUInt16,
  serializeUInt32,
  serializeInt8,
  serializeInt16,
  serializeInt32,
  serializeFloat32,
  serializeString,
  serializeBoolean,
  deserializeBoolean,
  deserializeFloat32,
  deserializeInt16,
  deserializeInt32,
  deserializeInt8,
  deserializeString,
  deserializeUInt16,
  deserializeUInt32,
  deserializeUInt8,
} from "./PrimitiveSerializers";
import { CustomSerializer } from "./CustomSerializer";
import { SerializerFunction } from "./SerializerFunction";

export class PakettoInstance {
  private _customSerializers: Map<unknown, CustomSerializer<unknown>> =
    new Map();
  private _customSerializersByTypeId: Map<number, CustomSerializer<unknown>> =
    new Map();

  /**
   * @internal
   */
  constructor() {}

  addCustomSerializer<T extends abstract new (...args: any) => any>(
    type: T,
    serialize: SerializerFunction<InstanceType<T>>,
    deserialize: DeserializerFunction<InstanceType<T>>,
    typeId: number
  ): void {
    if (typeId < 50 || typeId > 255) {
      throw new Error(
        "Custom serializer type identifiers must be between 50 and 255"
      );
    }
    this._internalAddCustomSerializer(type, serialize, deserialize, typeId);
  }

  _internalAddCustomSerializer<T extends abstract new (...args: any) => any>(
    type: T,
    serialize: SerializerFunction<InstanceType<T>>,
    deserialize: DeserializerFunction<InstanceType<T>>,
    typeId: number
  ) {
    const serializer = { serialize, deserialize, typeId };
    this._customSerializers.set(type, serializer);
    this._customSerializersByTypeId.set(typeId, serializer);
  }

  clearCustomSerializers(): void {
    this._customSerializers.clear();
    this._customSerializersByTypeId.clear();
  }

  serialize<T extends abstract new (...args: any) => any>(
    buf: Uint8Array,
    value: InstanceType<T>,
    offset: number
  ): number {
    const serializer = value?.constructor
      ? this._getCustomSerializerByValue(value)
      : undefined;
    if (serializer) {
      offset = serializeUInt8(buf, serializer.typeId, offset);
      offset = serializer.serialize(buf, value, offset);
    } else {
      offset = this._serializePrimitive(buf, value, offset);
    }
    return offset;
  }

  deserialize(
    buf: Uint8Array,
    offset: number = 0
  ): { offset: number; value: unknown } {
    const { offset: typeOffset, value: type } = deserializeUInt8(buf, offset);
    const serializer = this._getCustomSerializerByTypeIdentifier(type);
    if (serializer) {
      return serializer.deserialize(buf, typeOffset);
    } else {
      return this._deserializePrimitive(buf, typeOffset, type);
    }
  }

  private _getCustomSerializerByValue<
    T extends abstract new (...args: any) => any
  >(obj: InstanceType<T>): CustomSerializer<T> {
    return this._customSerializers.get(obj.constructor) as CustomSerializer<T>;
  }

  private _getCustomSerializerByTypeIdentifier(
    typeIdentifier: number
  ): CustomSerializer<unknown> {
    return this._customSerializersByTypeId.get(
      typeIdentifier
    ) as CustomSerializer<unknown>;
  }

  private _serializePrimitive<T extends abstract new (...args: any) => any>(
    buf: Uint8Array,
    value: InstanceType<T>,
    offset: number
  ): number {
    const type = _getPrimitiveTypeIdentifier(value);
    offset = serializeUInt8(buf, type, offset);
    switch (type) {
      case PrimitiveTypeIds.UInt8:
        offset = serializeUInt8(buf, value as number, offset);
        break;
      case PrimitiveTypeIds.UInt16:
        offset = serializeUInt16(buf, value as number, offset);
        break;
      case PrimitiveTypeIds.UInt32:
        offset = serializeUInt32(buf, value as number, offset);
        break;
      case PrimitiveTypeIds.Int8:
        offset = serializeInt8(buf, value as number, offset);
        break;
      case PrimitiveTypeIds.Int16:
        offset = serializeInt16(buf, value as number, offset);
        break;
      case PrimitiveTypeIds.Int32:
        offset = serializeInt32(buf, value as number, offset);
        break;
      case PrimitiveTypeIds.Float32:
        offset = serializeFloat32(buf, value as number, offset);
        break;
      case PrimitiveTypeIds.String:
        offset = serializeString(buf, value as string, offset);
        break;
      case PrimitiveTypeIds.Boolean:
        offset = serializeBoolean(buf, value as boolean, offset);
        break;
      case PrimitiveTypeIds.Null:
        break;
      case PrimitiveTypeIds.Undefined:
        break;
      case PrimitiveTypeIds.NaN:
        break;
      case PrimitiveTypeIds.Infinity:
        break;
      case PrimitiveTypeIds.NegativeInfinity:
        break;
      case PrimitiveTypeIds.Object:
        const newVal = value as Record<string | number | symbol, unknown>;
        const keys = Object.keys(newVal);
        offset = serializeUInt16(buf, keys.length, offset);
        for (const key of keys) {
          offset = this.serialize(buf, key, offset);
          offset = this.serialize(buf, newVal[key], offset);
        }
        break;
      default:
        throw new Error("Unsupported type");
    }
    return offset;
  }

  private _deserializePrimitive(
    buf: Uint8Array,
    offset: number,
    type: number
  ): { offset: number; value: unknown } {
    switch (type) {
      case PrimitiveTypeIds.UInt8:
        return deserializeUInt8(buf, offset);
      case PrimitiveTypeIds.UInt16:
        return deserializeUInt16(buf, offset);
      case PrimitiveTypeIds.UInt32:
        return deserializeUInt32(buf, offset);
      case PrimitiveTypeIds.Int8:
        return deserializeInt8(buf, offset);
      case PrimitiveTypeIds.Int16:
        return deserializeInt16(buf, offset);
      case PrimitiveTypeIds.Int32:
        return deserializeInt32(buf, offset);
      case PrimitiveTypeIds.Float32:
        return deserializeFloat32(buf, offset);
      case PrimitiveTypeIds.String:
        return deserializeString(buf, offset);
      case PrimitiveTypeIds.Boolean:
        return deserializeBoolean(buf, offset);
      case PrimitiveTypeIds.Null:
        return { offset, value: null };
      case PrimitiveTypeIds.Undefined:
        return { offset, value: undefined };
      case PrimitiveTypeIds.NaN:
        return { offset, value: NaN };
      case PrimitiveTypeIds.Infinity:
        return { offset, value: Infinity };
      case PrimitiveTypeIds.NegativeInfinity:
        return { offset, value: -Infinity };
      case PrimitiveTypeIds.Object:
        const { offset: lengthOffset, value: length } = deserializeUInt16(
          buf,
          offset
        );
        offset = lengthOffset;
        const obj: Record<string | number | symbol, unknown> = {};
        for (let i = 0; i < length; i++) {
          const { offset: keyOffset, value: key } = this.deserialize(
            buf,
            offset
          );
          offset = keyOffset;
          const { offset: valueOffset, value } = this.deserialize(buf, offset);
          offset = valueOffset;
          obj[key as string | number | symbol] = value;
        }

        return { offset, value: obj };
      default:
        throw new Error("Unsupported type " + type);
    }
  }

  getCustomSerializers(): CustomSerializer<unknown>[] {
    return Array.from(this._customSerializers.values());
  }
}

export function paketto() {
  return new PakettoInstance();
}

function _getPrimitiveTypeIdentifier(value: unknown): number {
  if (value === null) {
    return PrimitiveTypeIds.Null;
  } else if (value === undefined) {
    return PrimitiveTypeIds.Undefined;
  } else if (typeof value === "number") {
    if (value % 1 === 0) {
      if (value >= 0) {
        if (value <= 255) {
          return PrimitiveTypeIds.UInt8;
        } else if (value <= 65535) {
          return PrimitiveTypeIds.UInt16;
        } else {
          return PrimitiveTypeIds.UInt32;
        }
      } else {
        if (value >= -128) {
          return PrimitiveTypeIds.Int8;
        } else if (value >= -32768) {
          return PrimitiveTypeIds.Int16;
        } else {
          return PrimitiveTypeIds.Int32;
        }
      }
    } else if (value === Number.POSITIVE_INFINITY) {
      return PrimitiveTypeIds.Infinity;
    } else if (value === Number.NEGATIVE_INFINITY) {
      return PrimitiveTypeIds.NegativeInfinity;
    } else if (Number.isNaN(value)) {
      return PrimitiveTypeIds.NaN;
    } else {
      return PrimitiveTypeIds.Float32;
    }
  } else if (typeof value === "string") {
    return PrimitiveTypeIds.String;
  } else if (typeof value === "boolean") {
    return PrimitiveTypeIds.Boolean;
  } else if (typeof value === "object") {
    return PrimitiveTypeIds.Object;
  }
  throw new Error("Unsupported type");
}
