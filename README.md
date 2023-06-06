# パケット (paketto)
[![Node.js Package](https://github.com/tufcode/paketto/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/tufcode/paketto/actions/workflows/npm-publish.yml)

paketto (Japanese for "packet") is a small library for serializing and deserializing data in JavaScript.
It is fast, lightweight and has no dependencies.

## Features

- Simple API
- Small size
- No dependencies
- Supports primitive types out of the box
- Supports custom types
- Supports nested objects and arrays
- Optional built-in serializers for common types (Array, Map, Set, etc.)

## Documentation

See [API documentation](API.md).

## Supported primitives

These types are supported out of the box:

- UInt8
- UInt16
- UInt32
- Int8
- Int16
- Int32
- Float32
- Float64
- String
- Boolean
- Null
- Undefined
- NaN
- Infinity
- NegativeInfinity

## Built-in serializers

This package also includes serializers for common types.

- Array
- Uint8Array
- Uint16Array
- Uint32Array
- Int8Array
- Int16Array
- Int32Array
- Float32Array
- Map
- Set

These serializers can be registered using `addBuiltInSerializers()`.

## Installation

```sh
npm install paketto --save
```

or

```sh
yarn add paketto
```

## Usage

### ES6

```js
import { serialize, deserialize } from "paketto";
// or import * as paketto from "paketto"; and use methods as paketto.serialize, paketto.deserialize etc.

const buf = new Uint8Array(1024); // We don't need a buffer that big, but it's fine for this example.

let offset = 0;

offset = serialize(buf, 123, offset); // serialized as UInt8
offset = serialize(buf, 6660, offset); // serialized as UInt16
offset = serialize(buf, 666000, offset); // serialized as UInt32
offset = serialize(buf, -42, offset); // serialized as Int8
offset = serialize(buf, 123.456, offset); // serialized as Float32
offset = serialize(buf, "Hello world!", offset); // serialized as String

let deserialized = deserialize(buf, 0);
console.log(deserialized.value); // 123
deserialized = deserialize(buf, deserialized.offset);
console.log(deserialized.value); // 6660
deserialized = deserialize(buf, deserialized.offset);
console.log(deserialized.value); // 666000
deserialized = deserialize(buf, deserialized.offset);
console.log(deserialized.value); // -42
deserialized = deserialize(buf, deserialized.offset);
console.log(deserialized.value); // 123.456
deserialized = deserialize(buf, deserialized.offset);
console.log(deserialized.value); // "Hello world!"
```

### Using CDN (unpkg)

```html
<html>
  <head>
    <script src="https://unpkg.com/paketto@latest/dist/paketto.js"></script>
  </head>
  <body>
    <script>
      const buf = new Uint8Array(1024);
      let offset = 0;

      offset = paketto.serialize(buf, 123, offset);
      offset = paketto.serialize(buf, 6660, offset);
      offset = paketto.serialize(buf, 666000, offset);
      offset = paketto.serialize(buf, -42, offset);
      offset = paketto.serialize(buf, 123.456, offset);
      offset = paketto.serialize(buf, "Hello world!", offset);

      let deserialized = paketto.deserialize(buf, 0);
      console.log(deserialized.value); // 123
      deserialized = paketto.deserialize(buf, deserialized.offset);
      console.log(deserialized.value); // 6660
      deserialized = paketto.deserialize(buf, deserialized.offset);
      console.log(deserialized.value); // 666000
      deserialized = paketto.deserialize(buf, deserialized.offset);
      console.log(deserialized.value); // -42
      deserialized = paketto.deserialize(buf, deserialized.offset);
      console.log(deserialized.value); // 123.456
      deserialized = paketto.deserialize(buf, deserialized.offset);
      console.log(deserialized.value); // "Hello world!"
    </script>
  </body>
</html>
```

When using `serialize()`, paketto will automatically choose the smallest
type that can fit the value. For example, `123` will be serialized as `UInt8`,
`-123` will be serialized as `Int8`, `300` will be serialized as `UInt16`, etc.

## Overhead

There is a small 1 byte overhead for each serialized value.

Packet in the example above has the following structure:

| Type      | Size   | Value                            |
| --------- | ------ | -------------------------------- |
| UInt8     | 1      | Type of the next value (UInt8)   |
| UInt8     | 1      | 123                              |
| UInt8     | 1      | Type of the next value (UInt16)  |
| UInt16    | 2      | 6660                             |
| UInt8     | 1      | Type of the next value (UInt32)  |
| UInt32    | 4      | 666000                           |
| UInt8     | 1      | Type of the next value (Int8)    |
| Int8      | 1      | -42                              |
| UInt8     | 1      | Type of the next value (Float32) |
| Float32   | 4      | 123.456                          |
| UInt8     | 1      | Type of the next value (String)  |
| UInt16    | 2      | Length of the string (12)        |
| UInt16    | 2      | "H"                              |
| UInt16    | 2      | "e"                              |
| UInt16    | 2      | "l"                              |
| UInt16    | 2      | "l"                              |
| UInt16    | 2      | "o"                              |
| UInt16    | 2      | " "                              |
| UInt16    | 2      | "w"                              |
| UInt16    | 2      | "o"                              |
| UInt16    | 2      | "r"                              |
| UInt16    | 2      | "l"                              |
| UInt16    | 2      | "d"                              |
| UInt16    | 2      | "!"                              |
| **Total** | **34** |                                  |

If you don't want the overhead, you can use primitive serializers directly.

This is less convenient, but it's probably faster, and it has no overhead.

```js
import { serializeString, deserializeString } from "paketto";

const buf = new Uint8Array(26);

serializeString(buf, "Hello world!", 0);

const deserialized = deserializeString(buf, 0);
console.log(deserialized.value); // "Hello world!"
```

## Serializing custom types

You can also register your own serializers.

```js
import { addCustomSerializer, serializeFloat32, deserializeFloat32 } from "paketto";

class Vector2 {
  constructor(public x: number, public y: number) {}
}

addCustomSerializer(
  // Type to serialize (any object that has .constructor property)
  Vector2,
  // Serializer function
  (buf, value, offset) => {
    offset = serializeFloat32(buf, value.x, offset);
    offset = serializeFloat32(buf, value.y, offset);
    return offset;
  },
  // Deserializer function
  (buf, offset) => {
    const deserializedX = deserializeFloat32(buf, offset);
    offset = deserializedX.offset;
    const deserializedY = deserializeFloat32(buf, offset);
    offset = deserializedY.offset;
    return {
      offset,
      value: new Vector2(deserializedX.value, deserializedY.value),
    };
  },
  // Unique ID for this type. Must be between 50 and 255.
  50
);
```
