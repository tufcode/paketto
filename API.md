# API Docs for paketto

## Table of contents

### Type Aliases

- [DeserializerFunction](API.md#deserializerfunction)
- [SerializerFunction](API.md#serializerfunction)

### Functions

- [addBuiltInSerializers](API.md#addbuiltinserializers)
- [addCustomSerializer](API.md#addcustomserializer)
- [clearCustomSerializers](API.md#clearcustomserializers)
- [debug\_printCustomSerializers](API.md#debug_printcustomserializers)
- [deserialize](API.md#deserialize)
- [deserializeBoolean](API.md#deserializeboolean)
- [deserializeFloat32](API.md#deserializefloat32)
- [deserializeFloat64](API.md#deserializefloat64)
- [deserializeInt16](API.md#deserializeint16)
- [deserializeInt32](API.md#deserializeint32)
- [deserializeInt8](API.md#deserializeint8)
- [deserializeString](API.md#deserializestring)
- [deserializeUInt16](API.md#deserializeuint16)
- [deserializeUInt32](API.md#deserializeuint32)
- [deserializeUInt8](API.md#deserializeuint8)
- [removeCustomSerializer](API.md#removecustomserializer)
- [serialize](API.md#serialize)
- [serializeBoolean](API.md#serializeboolean)
- [serializeFloat32](API.md#serializefloat32)
- [serializeFloat64](API.md#serializefloat64)
- [serializeInt16](API.md#serializeint16)
- [serializeInt32](API.md#serializeint32)
- [serializeInt8](API.md#serializeint8)
- [serializeString](API.md#serializestring)
- [serializeUInt16](API.md#serializeuint16)
- [serializeUInt32](API.md#serializeuint32)
- [serializeUInt8](API.md#serializeuint8)

## Type Aliases

### DeserializerFunction

Ƭ **DeserializerFunction**<`T`\>: (`buf`: `Uint8Array`, `offset`: `number`) => { `offset`: `number` ; `value`: `T`  }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`buf`, `offset`): `Object`

##### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Uint8Array` |
| `offset` | `number` |

##### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `offset` | `number` |
| `value` | `T` |

#### Defined in

[DeserializerFunction.ts:1](https://github.com/tufcode/paketto/blob/39d09ba/src/DeserializerFunction.ts#L1)

___

### SerializerFunction

Ƭ **SerializerFunction**<`T`\>: (`buf`: `Uint8Array`, `value`: `T`, `offset`: `number`) => `number`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`buf`, `value`, `offset`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Uint8Array` |
| `value` | `T` |
| `offset` | `number` |

##### Returns

`number`

#### Defined in

[SerializerFunction.ts:1](https://github.com/tufcode/paketto/blob/39d09ba/src/SerializerFunction.ts#L1)

## Functions

### addBuiltInSerializers

▸ **addBuiltInSerializers**(): `void`

Registers built-in custom serializers.

The following types are added:
Array, Uint8Array, Uint16Array, Uint32Array, Int8Array, Int16Array,
Int32Array, Float32Array, Set, Map, Date

Arrays or objects can be serialized if they contain only registered types
or primitives.

#### Returns

`void`

#### Defined in

[BuiltInSerializers.ts:34](https://github.com/tufcode/paketto/blob/39d09ba/src/BuiltInSerializers.ts#L34)

___

### addCustomSerializer

▸ **addCustomSerializer**<`T`\>(`type`, `serialize`, `deserialize`, `typeId`): `void`

Register a custom serializer for a type

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`) => `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `T` | The type to register a serializer for |
| `serialize` | [`SerializerFunction`](API.md#serializerfunction)<`InstanceType`<`T`\>\> | The serialize function |
| `deserialize` | [`DeserializerFunction`](API.md#deserializerfunction)<`InstanceType`<`T`\>\> | The deserialize function |
| `typeId` | `number` | The type ID to use for this type |

#### Returns

`void`

#### Defined in

[Paketto.ts:258](https://github.com/tufcode/paketto/blob/39d09ba/src/Paketto.ts#L258)

___

### clearCustomSerializers

▸ **clearCustomSerializers**(): `void`

Removes all custom serializers

#### Returns

`void`

#### Defined in

[Paketto.ts:306](https://github.com/tufcode/paketto/blob/39d09ba/src/Paketto.ts#L306)

___

### debug\_printCustomSerializers

▸ **debug_printCustomSerializers**(): `void`

#### Returns

`void`

#### Defined in

[Paketto.ts:32](https://github.com/tufcode/paketto/blob/39d09ba/src/Paketto.ts#L32)

___

### deserialize

▸ **deserialize**(`buf`, `offset?`): `Object`

Deserialize a value from an Uint8Array

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` | The buffer to deserialize from |
| `offset` | `number` | `0` | The offset to start deserializing at |

#### Returns

`Object`

The new offset and the deserialized value

| Name | Type |
| :------ | :------ |
| `offset` | `number` |
| `value` | `unknown` |

#### Defined in

[Paketto.ts:238](https://github.com/tufcode/paketto/blob/39d09ba/src/Paketto.ts#L238)

___

### deserializeBoolean

▸ **deserializeBoolean**(`buf`, `offset?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `offset` | `number` |
| `value` | `boolean` |

#### Defined in

[PrimitiveSerializers.ts:150](https://github.com/tufcode/paketto/blob/39d09ba/src/PrimitiveSerializers.ts#L150)

___

### deserializeFloat32

▸ **deserializeFloat32**(`buf`, `offset?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `offset` | `number` |
| `value` | `number` |

#### Defined in

[PrimitiveSerializers.ts:91](https://github.com/tufcode/paketto/blob/39d09ba/src/PrimitiveSerializers.ts#L91)

___

### deserializeFloat64

▸ **deserializeFloat64**(`buf`, `offset?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `offset` | `number` |
| `value` | `number` |

#### Defined in

[PrimitiveSerializers.ts:109](https://github.com/tufcode/paketto/blob/39d09ba/src/PrimitiveSerializers.ts#L109)

___

### deserializeInt16

▸ **deserializeInt16**(`buf`, `offset?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `offset` | `number` |
| `value` | `number` |

#### Defined in

[PrimitiveSerializers.ts:42](https://github.com/tufcode/paketto/blob/39d09ba/src/PrimitiveSerializers.ts#L42)

___

### deserializeInt32

▸ **deserializeInt32**(`buf`, `offset?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `offset` | `number` |
| `value` | `number` |

#### Defined in

[PrimitiveSerializers.ts:73](https://github.com/tufcode/paketto/blob/39d09ba/src/PrimitiveSerializers.ts#L73)

___

### deserializeInt8

▸ **deserializeInt8**(`buf`, `offset?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `offset` | `number` |
| `value` | `number` |

#### Defined in

[PrimitiveSerializers.ts:17](https://github.com/tufcode/paketto/blob/39d09ba/src/PrimitiveSerializers.ts#L17)

___

### deserializeString

▸ **deserializeString**(`buf`, `offset?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `offset` | `number` |
| `value` | `string` |

#### Defined in

[PrimitiveSerializers.ts:126](https://github.com/tufcode/paketto/blob/39d09ba/src/PrimitiveSerializers.ts#L126)

___

### deserializeUInt16

▸ **deserializeUInt16**(`buf`, `offset?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `offset` | `number` |
| `value` | `number` |

#### Defined in

[PrimitiveSerializers.ts:31](https://github.com/tufcode/paketto/blob/39d09ba/src/PrimitiveSerializers.ts#L31)

___

### deserializeUInt32

▸ **deserializeUInt32**(`buf`, `offset?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `offset` | `number` |
| `value` | `number` |

#### Defined in

[PrimitiveSerializers.ts:58](https://github.com/tufcode/paketto/blob/39d09ba/src/PrimitiveSerializers.ts#L58)

___

### deserializeUInt8

▸ **deserializeUInt8**(`buf`, `offset?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `offset` | `number` |
| `value` | `number` |

#### Defined in

[PrimitiveSerializers.ts:6](https://github.com/tufcode/paketto/blob/39d09ba/src/PrimitiveSerializers.ts#L6)

___

### removeCustomSerializer

▸ **removeCustomSerializer**<`T`\>(`type`): `void`

Removes custom serializer added for a type

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`) => `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `T` | The type to remove the serializer for |

#### Returns

`void`

#### Defined in

[Paketto.ts:293](https://github.com/tufcode/paketto/blob/39d09ba/src/Paketto.ts#L293)

___

### serialize

▸ **serialize**<`T`\>(`buf`, `value`, `offset?`): `number`

Serialize a value into an Uint8Array

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`) => `any` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` | The buffer to serialize into |
| `value` | `InstanceType`<`T`\> | `undefined` | The value to serialize |
| `offset` | `number` | `0` | The offset to start serializing at |

#### Returns

`number`

The new offset

#### Defined in

[Paketto.ts:215](https://github.com/tufcode/paketto/blob/39d09ba/src/Paketto.ts#L215)

___

### serializeBoolean

▸ **serializeBoolean**(`buf`, `value`, `offset?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` |
| `value` | `boolean` | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`number`

#### Defined in

[PrimitiveSerializers.ts:142](https://github.com/tufcode/paketto/blob/39d09ba/src/PrimitiveSerializers.ts#L142)

___

### serializeFloat32

▸ **serializeFloat32**(`buf`, `value`, `offset?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` |
| `value` | `number` | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`number`

#### Defined in

[PrimitiveSerializers.ts:81](https://github.com/tufcode/paketto/blob/39d09ba/src/PrimitiveSerializers.ts#L81)

___

### serializeFloat64

▸ **serializeFloat64**(`buf`, `value`, `offset?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` |
| `value` | `number` | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`number`

#### Defined in

[PrimitiveSerializers.ts:99](https://github.com/tufcode/paketto/blob/39d09ba/src/PrimitiveSerializers.ts#L99)

___

### serializeInt16

▸ **serializeInt16**(`buf`, `value`, `offset?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` |
| `value` | `number` | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`number`

#### Defined in

[PrimitiveSerializers.ts:38](https://github.com/tufcode/paketto/blob/39d09ba/src/PrimitiveSerializers.ts#L38)

___

### serializeInt32

▸ **serializeInt32**(`buf`, `value`, `offset?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` |
| `value` | `number` | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`number`

#### Defined in

[PrimitiveSerializers.ts:69](https://github.com/tufcode/paketto/blob/39d09ba/src/PrimitiveSerializers.ts#L69)

___

### serializeInt8

▸ **serializeInt8**(`buf`, `value`, `offset?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` |
| `value` | `number` | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`number`

#### Defined in

[PrimitiveSerializers.ts:13](https://github.com/tufcode/paketto/blob/39d09ba/src/PrimitiveSerializers.ts#L13)

___

### serializeString

▸ **serializeString**(`buf`, `value`, `offset?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` |
| `value` | `string` | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`number`

#### Defined in

[PrimitiveSerializers.ts:117](https://github.com/tufcode/paketto/blob/39d09ba/src/PrimitiveSerializers.ts#L117)

___

### serializeUInt16

▸ **serializeUInt16**(`buf`, `value`, `offset?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` |
| `value` | `number` | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`number`

#### Defined in

[PrimitiveSerializers.ts:25](https://github.com/tufcode/paketto/blob/39d09ba/src/PrimitiveSerializers.ts#L25)

___

### serializeUInt32

▸ **serializeUInt32**(`buf`, `value`, `offset?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` |
| `value` | `number` | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`number`

#### Defined in

[PrimitiveSerializers.ts:50](https://github.com/tufcode/paketto/blob/39d09ba/src/PrimitiveSerializers.ts#L50)

___

### serializeUInt8

▸ **serializeUInt8**(`buf`, `value`, `offset?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buf` | `Uint8Array` | `undefined` |
| `value` | `number` | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`number`

#### Defined in

[PrimitiveSerializers.ts:1](https://github.com/tufcode/paketto/blob/39d09ba/src/PrimitiveSerializers.ts#L1)
