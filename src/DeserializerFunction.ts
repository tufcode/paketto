export type DeserializerFunction<T> = (
  buf: Uint8Array,
  offset: number
) => { offset: number; value: T };
