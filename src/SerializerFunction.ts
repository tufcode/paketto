export type SerializerFunction<T> = (
  buf: Uint8Array,
  value: T,
  offset: number
) => number;
