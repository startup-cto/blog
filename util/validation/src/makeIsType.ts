import { type FromSchema, JSONSchema } from "json-schema-to-ts";
import { Options } from "ajv";
import { makeEnsureType } from "./makeEnsureType";

export function makeIsType<Schema extends JSONSchema>(
  schema: JSONSchema,
  ajvOptions?: Options
) {
  const ensure: (data: unknown) => asserts data is FromSchema<Schema> =
    makeEnsureType(schema, ajvOptions);
  return function isType(data: FromSchema<Schema>) {
    try {
      ensure(data);
      return true;
    } catch {
      return false;
    }
  };
}
