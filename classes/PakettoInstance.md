# Class: PakettoInstance

## Table of contents

### Properties

- [\_customSerializers](PakettoInstance.md#_customserializers)
- [\_customSerializersByTypeId](PakettoInstance.md#_customserializersbytypeid)

### Methods

- [\_deserializePrimitive](PakettoInstance.md#_deserializeprimitive)
- [\_getCustomSerializerByTypeIdentifier](PakettoInstance.md#_getcustomserializerbytypeidentifier)
- [\_getCustomSerializerByValue](PakettoInstance.md#_getcustomserializerbyvalue)
- [\_internalAddCustomSerializer](PakettoInstance.md#_internaladdcustomserializer)
- [\_serializePrimitive](PakettoInstance.md#_serializeprimitive)
- [addCustomSerializer](PakettoInstance.md#addcustomserializer)
- [clearCustomSerializers](PakettoInstance.md#clearcustomserializers)
- [deserialize](PakettoInstance.md#deserialize)
- [getCustomSerializers](PakettoInstance.md#getcustomserializers)
- [serialize](PakettoInstance.md#serialize)

## Properties

### \_customSerializers

• `Private` **\_customSerializers**: `Map`<`unknown`, `CustomSerializer`<`unknown`\>\>

#### Defined in

[Paketto.ts:27](https://github.com/tufcode/paketto/blob/05e1935/src/Paketto.ts#L27)

___

### \_customSerializersByTypeId

• `Private` **\_customSerializersByTypeId**: `Map`<`number`, `CustomSerializer`<`unknown`\>\>

#### Defined in

[Paketto.ts:29](https://github.com/tufcode/paketto/blob/05e1935/src/Paketto.ts#L29)

## Methods

### \_deserializePrimitive

▸ `Private` **_deserializePrimitive**(`buf`, `offset`, `type`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Uint8Array` |
| `offset` | `number` |
| `type` | `number` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `offset` | `number` |
| `value` | `unknown` |

#### Defined in

[Paketto.ts:171](https://github.com/tufcode/paketto/blob/05e1935/src/Paketto.ts#L171)

___

### \_getCustomSerializerByTypeIdentifier

▸ `Private` **_getCustomSerializerByTypeIdentifier**(`typeIdentifier`): `CustomSerializer`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `typeIdentifier` | `number` |

#### Returns

`CustomSerializer`<`unknown`\>

#### Defined in

[Paketto.ts:103](https://github.com/tufcode/paketto/blob/05e1935/src/Paketto.ts#L103)

___

### \_getCustomSerializerByValue

▸ `Private` **_getCustomSerializerByValue**<`T`\>(`obj`): `CustomSerializer`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`) => `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `InstanceType`<`T`\> |

#### Returns

`CustomSerializer`<`T`\>

#### Defined in

[Paketto.ts:97](https://github.com/tufcode/paketto/blob/05e1935/src/Paketto.ts#L97)

___

### \_internalAddCustomSerializer

▸ **_internalAddCustomSerializer**<`T`\>(`type`, `serialize`, `deserialize`, `typeId`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`) => `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `T` |
| `serialize` | [`SerializerFunction`](../API.md#serializerfunction)<`InstanceType`<`T`\>\> |
| `deserialize` | [`DeserializerFunction`](../API.md#deserializerfunction)<`InstanceType`<`T`\>\> |
| `typeId` | `number` |

#### Returns

`void`

#### Defined in

[Paketto.ts:51](https://github.com/tufcode/paketto/blob/05e1935/src/Paketto.ts#L51)

___

### \_serializePrimitive

▸ `Private` **_serializePrimitive**<`T`\>(`buf`, `value`, `offset`): `number`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`) => `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Uint8Array` |
| `value` | `InstanceType`<`T`\> |
| `offset` | `number` |

#### Returns

`number`

#### Defined in

[Paketto.ts:111](https://github.com/tufcode/paketto/blob/05e1935/src/Paketto.ts#L111)

___

### addCustomSerializer

▸ **addCustomSerializer**<`T`\>(`type`, `serialize`, `deserialize`, `typeId`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`) => `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `T` |
| `serialize` | [`SerializerFunction`](../API.md#serializerfunction)<`InstanceType`<`T`\>\> |
| `deserialize` | [`DeserializerFunction`](../API.md#deserializerfunction)<`InstanceType`<`T`\>\> |
| `typeId` | `number` |

#### Returns

`void`

#### Defined in

[Paketto.ts:37](https://github.com/tufcode/paketto/blob/05e1935/src/Paketto.ts#L37)

___

### clearCustomSerializers

▸ **clearCustomSerializers**(): `void`

#### Returns

`void`

#### Defined in

[Paketto.ts:62](https://github.com/tufcode/paketto/blob/05e1935/src/Paketto.ts#L62)

___

### deserialize

▸ **deserialize**(`buf`, `offset?`): `Object`

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
| `value` | `unknown` |

#### Defined in

[Paketto.ts:84](https://github.com/tufcode/paketto/blob/05e1935/src/Paketto.ts#L84)

___

### getCustomSerializers

▸ **getCustomSerializers**(): `CustomSerializer`<`unknown`\>[]

#### Returns

`CustomSerializer`<`unknown`\>[]

#### Defined in

[Paketto.ts:229](https://github.com/tufcode/paketto/blob/05e1935/src/Paketto.ts#L229)

___

### serialize

▸ **serialize**<`T`\>(`buf`, `value`, `offset`): `number`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`) => `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Uint8Array` |
| `value` | `InstanceType`<`T`\> |
| `offset` | `number` |

#### Returns

`number`

#### Defined in

[Paketto.ts:67](https://github.com/tufcode/paketto/blob/05e1935/src/Paketto.ts#L67)
