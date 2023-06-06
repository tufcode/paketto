import { DeserializerFunction } from "./DeserializerFunction";
import { SerializerFunction } from "./SerializerFunction";

export interface CustomSerializer<T> {
  typeId: number;
  serialize: SerializerFunction<T>;
  deserialize: DeserializerFunction<T>;
}
