export const serializeUInt8 = (buf: Uint8Array, value: number, offset = 0) => {
  buf[offset] = value;
  return offset + 1;
};

export const deserializeUInt8 = (buf: Uint8Array, offset = 0) => {
  return {
    value: buf[offset],
    offset: offset + 1,
  };
};

export const serializeInt8 = (buf: Uint8Array, value: number, offset = 0) => {
  return serializeUInt8(buf, value, offset);
};

export const deserializeInt8 = (buf: Uint8Array, offset = 0) => {
  const result = deserializeUInt8(buf, offset);
  return {
    value: result.value > 127 ? result.value - 256 : result.value,
    offset: result.offset,
  };
};

export const serializeUInt16 = (buf: Uint8Array, value: number, offset = 0) => {
  buf[offset] = value;
  buf[offset + 1] = value >> 8;
  return offset + 2;
};

export const deserializeUInt16 = (buf: Uint8Array, offset = 0) => {
  return {
    value: (buf[offset + 1] << 8) | buf[offset],
    offset: offset + 2,
  };
};

export const serializeInt16 = (buf: Uint8Array, value: number, offset = 0) => {
  return serializeUInt16(buf, value, offset);
};

export const deserializeInt16 = (buf: Uint8Array, offset = 0) => {
  const result = deserializeUInt16(buf, offset);
  return {
    value: result.value > 32767 ? result.value - 65536 : result.value,
    offset: result.offset,
  };
};

export const serializeUInt32 = (buf: Uint8Array, value: number, offset = 0) => {
  buf[offset] = value;
  buf[offset + 1] = value >> 8;
  buf[offset + 2] = value >> 16;
  buf[offset + 3] = value >> 24;
  return offset + 4;
};

export const deserializeUInt32 = (buf: Uint8Array, offset = 0) => {
  return {
    value:
      (buf[offset + 3] << 24) |
      (buf[offset + 2] << 16) |
      (buf[offset + 1] << 8) |
      buf[offset],
    offset: offset + 4,
  };
};

export const serializeInt32 = (buf: Uint8Array, value: number, offset = 0) => {
  return serializeUInt32(buf, value, offset);
};

export const deserializeInt32 = (buf: Uint8Array, offset = 0) => {
  const result = deserializeUInt32(buf, offset);
  return {
    value: result.value > 2147483647 ? result.value - 4294967296 : result.value,
    offset: result.offset,
  };
};

export const serializeFloat32 = (
  buf: Uint8Array,
  value: number,
  offset = 0
) => {
  const view = new DataView(buf.buffer);
  view.setFloat32(offset, value, true);
  return offset + 4;
};

export const deserializeFloat32 = (buf: Uint8Array, offset = 0) => {
  const view = new DataView(buf.buffer);
  return {
    value: view.getFloat32(offset, true),
    offset: offset + 4,
  };
};

export const serializeFloat64 = (
  buf: Uint8Array,
  value: number,
  offset = 0
) => {
  const view = new DataView(buf.buffer);
  view.setFloat64(offset, value, true);
  return offset + 8;
};

export const deserializeFloat64 = (buf: Uint8Array, offset = 0) => {
  const view = new DataView(buf.buffer);
  return {
    value: view.getFloat64(offset, true),
    offset: offset + 8,
  };
};

export const serializeString = (buf: Uint8Array, value: string, offset = 0) => {
  const length = value.length;
  offset = serializeUInt16(buf, length, offset);
  for (let i = 0; i < length; i++) {
    offset = serializeUInt16(buf, value.charCodeAt(i), offset);
  }
  return offset;
};

export const deserializeString = (buf: Uint8Array, offset = 0) => {
  const length = deserializeUInt16(buf, offset);
  offset = length.offset;

  let value = "";
  for (let i = 0; i < length.value; i++) {
    const char = deserializeUInt16(buf, length.offset);
    value += String.fromCharCode(char.value);
    length.offset = char.offset;
  }
  return {
    value,
    offset: length.offset,
  };
};

export const serializeBoolean = (
  buf: Uint8Array,
  value: boolean,
  offset = 0
) => {
  return serializeUInt8(buf, value ? 1 : 0, offset);
};

export const deserializeBoolean = (buf: Uint8Array, offset = 0) => {
  const result = deserializeUInt8(buf, offset);
  return {
    value: result.value === 1,
    offset: result.offset,
  };
};
