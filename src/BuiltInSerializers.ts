import { BuiltInTypeIds } from "./BuiltInTypeIds";
import { PakettoInstance } from "./Paketto";
import {
  serializeUInt8,
  serializeUInt16,
  serializeUInt32,
  serializeInt8,
  serializeInt16,
  serializeInt32,
  serializeFloat32,
  deserializeFloat32,
  deserializeInt16,
  deserializeInt32,
  deserializeInt8,
  deserializeUInt16,
  deserializeUInt32,
  deserializeUInt8,
} from "./PrimitiveSerializers";

/**
 * Registers built-in custom serializers.
 *
 * The following types are added:
 * Array, Uint8Array, Uint16Array, Uint32Array, Int8Array, Int16Array,
 * Int32Array, Float32Array, Set, Map, Date
 *
 * Arrays or objects can be serialized if they contain only registered types
 * or primitives.
 * @param instance The Paketto instance to add the serializers to
 */
export const addBuiltInSerializers = (instance: PakettoInstance) => {
  instance._internalAddCustomSerializer(
    Uint8Array,
    (buf, value, offset) => {
      const length = value.length;
      offset = serializeUInt16(buf, length, offset);
      for (let i = 0; i < length; i++) {
        offset = serializeUInt8(buf, value[i], offset);
      }
      return offset;
    },
    (buf, offset) => {
      let deserialized = deserializeUInt16(buf, offset);
      const length = deserialized.value;
      offset = deserialized.offset;
      const value = new Uint8Array(length);
      for (let i = 0; i < length; i++) {
        deserialized = deserializeUInt8(buf, offset);
        value[i] = deserialized.value;
        offset = deserialized.offset;
      }
      return {
        value,
        offset,
      };
    },
    BuiltInTypeIds.Uint8Array
  );

  instance._internalAddCustomSerializer(
    Uint16Array,
    (buf, value, offset) => {
      const length = value.length;
      offset = serializeUInt16(buf, length, offset);
      for (let i = 0; i < length; i++) {
        offset = serializeUInt16(buf, value[i], offset);
      }
      return offset;
    },
    (buf, offset) => {
      let deserialized = deserializeUInt16(buf, offset);
      const length = deserialized.value;
      offset = deserialized.offset;
      const value = new Uint16Array(length);
      for (let i = 0; i < length; i++) {
        deserialized = deserializeUInt16(buf, offset);
        value[i] = deserialized.value;
        offset = deserialized.offset;
      }
      return {
        value,
        offset,
      };
    },
    BuiltInTypeIds.Uint16Array
  );

  instance._internalAddCustomSerializer(
    Uint32Array,
    (buf, value, offset) => {
      const length = value.length;
      offset = serializeUInt16(buf, length, offset);
      for (let i = 0; i < length; i++) {
        offset = serializeUInt32(buf, value[i], offset);
      }
      return offset;
    },
    (buf, offset) => {
      let deserialized = deserializeUInt16(buf, offset);
      const length = deserialized.value;
      offset = deserialized.offset;
      const value = new Uint32Array(length);
      for (let i = 0; i < length; i++) {
        deserialized = deserializeUInt32(buf, offset);
        value[i] = deserialized.value;
        offset = deserialized.offset;
      }
      return {
        value,
        offset,
      };
    },
    BuiltInTypeIds.Uint32Array
  );

  instance._internalAddCustomSerializer(
    Int8Array,
    (buf, value, offset) => {
      const length = value.length;
      offset = serializeUInt16(buf, length, offset);
      for (let i = 0; i < length; i++) {
        offset = serializeInt8(buf, value[i], offset);
      }
      return offset;
    },
    (buf, offset) => {
      let deserialized = deserializeUInt16(buf, offset);
      const length = deserialized.value;
      offset = deserialized.offset;
      const value = new Int8Array(length);
      for (let i = 0; i < length; i++) {
        deserialized = deserializeInt8(buf, offset);
        value[i] = deserialized.value;
        offset = deserialized.offset;
      }
      return {
        value,
        offset,
      };
    },
    BuiltInTypeIds.Int8Array
  );

  instance._internalAddCustomSerializer(
    Int16Array,
    (buf, value, offset) => {
      const length = value.length;
      offset = serializeUInt16(buf, length, offset);
      for (let i = 0; i < length; i++) {
        offset = serializeInt16(buf, value[i], offset);
      }
      return offset;
    },
    (buf, offset) => {
      let deserialized = deserializeUInt16(buf, offset);
      const length = deserialized.value;
      offset = deserialized.offset;
      const value = new Int16Array(length);
      for (let i = 0; i < length; i++) {
        deserialized = deserializeInt16(buf, offset);
        value[i] = deserialized.value;
        offset = deserialized.offset;
      }
      return {
        value,
        offset,
      };
    },
    BuiltInTypeIds.Int16Array
  );
  instance._internalAddCustomSerializer(
    Int32Array,
    (buf, value, offset) => {
      const length = value.length;
      offset = serializeUInt16(buf, length, offset);
      for (let i = 0; i < length; i++) {
        offset = serializeInt32(buf, value[i], offset);
      }
      return offset;
    },
    (buf, offset) => {
      let deserialized = deserializeUInt16(buf, offset);
      const length = deserialized.value;
      offset = deserialized.offset;
      const value = new Int32Array(length);
      for (let i = 0; i < length; i++) {
        deserialized = deserializeInt32(buf, offset);
        value[i] = deserialized.value;
        offset = deserialized.offset;
      }
      return {
        value,
        offset,
      };
    },
    BuiltInTypeIds.Int32Array
  );

  instance._internalAddCustomSerializer(
    Float32Array,
    (buf, value, offset) => {
      const length = value.length;
      offset = serializeUInt16(buf, length, offset);
      for (let i = 0; i < length; i++) {
        offset = serializeFloat32(buf, value[i], offset);
      }
      return offset;
    },
    (buf, offset) => {
      let deserialized = deserializeUInt16(buf, offset);
      const length = deserialized.value;
      offset = deserialized.offset;
      const value = new Float32Array(length);
      for (let i = 0; i < length; i++) {
        deserialized = deserializeFloat32(buf, offset);
        value[i] = deserialized.value;
        offset = deserialized.offset;
      }
      return {
        value,
        offset,
      };
    },
    BuiltInTypeIds.Float32Array
  );

  instance._internalAddCustomSerializer(
    Set,
    (buf, value, offset) => {
      const length = value.size;
      offset = serializeUInt16(buf, length, offset);
      for (const item of value) {
        offset = instance.serialize(buf, item, offset);
      }
      return offset;
    },
    (buf, offset) => {
      const deserialized = deserializeUInt16(buf, offset);
      const length = deserialized.value;
      offset = deserialized.offset;

      const value = new Set();
      for (let i = 0; i < length; i++) {
        const deserialized = instance.deserialize(buf, offset);
        value.add(deserialized.value);
        offset = deserialized.offset;
      }
      return {
        value,
        offset,
      };
    },
    BuiltInTypeIds.Set
  );

  instance._internalAddCustomSerializer(
    Map,
    (buf, value, offset) => {
      const length = value.size;
      offset = serializeUInt16(buf, length, offset);
      for (const [key, item] of value) {
        offset = instance.serialize(buf, key, offset);
        offset = instance.serialize(buf, item, offset);
      }
      return offset;
    },
    (buf, offset) => {
      const deserialized = deserializeUInt16(buf, offset);
      const length = deserialized.value;
      offset = deserialized.offset;

      const value = new Map();
      for (let i = 0; i < length; i++) {
        let deserialized = instance.deserialize(buf, offset);
        offset = deserialized.offset;
        const key = deserialized.value;

        deserialized = instance.deserialize(buf, offset);
        offset = deserialized.offset;
        const item = deserialized.value;

        value.set(key, item);
      }
      return {
        value,
        offset,
      };
    },
    BuiltInTypeIds.Map
  );

  instance._internalAddCustomSerializer(
    Array,
    (buf, value, offset) => {
      const length = value.length;
      offset = serializeUInt16(buf, length, offset);
      for (let i = 0; i < length; i++) {
        offset = instance.serialize(buf, value[i], offset);
      }
      return offset;
    },
    (buf, offset) => {
      const deserialized = deserializeUInt16(buf, offset);
      const length = deserialized.value;
      offset = deserialized.offset;

      const array = new Array(length);

      for (let i = 0; i < length; i++) {
        const deserialized = instance.deserialize(buf, offset);
        offset = deserialized.offset;
        array[i] = deserialized.value;
      }

      return { offset, value: array };
    },
    BuiltInTypeIds.Array
  );
};
