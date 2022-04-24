import type {
  FromSchema as RawFromSchema,
  JSONSchema,
} from "json-schema-to-ts";

type RemoveIndex<T> = {
  [P in keyof T as string extends P
    ? never
    : number extends P
    ? never
    : P]: T[P];
};

export type FromSchema<T extends JSONSchema> = RemoveIndex<RawFromSchema<T>>;
