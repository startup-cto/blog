import type { FromSchema, JSONSchema } from "json-schema-to-ts";
import type { Options } from "ajv";
import { makeEnsureType } from "./makeEnsureType";

export function makeAssertType<Schema extends JSONSchema>(
  schema: Schema,
  ajvOptions?: Options
): (data: unknown) => asserts data is FromSchema<Schema> {
  const ensureType = makeEnsureType(schema, ajvOptions);
  return function assert(data: unknown): asserts data is FromSchema<Schema> {
    ensureType(data);
  };
}
