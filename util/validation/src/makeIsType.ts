import type { JSONSchema } from "json-schema-to-ts";
import type { Options } from "ajv";

import type { FromSchema } from "./FromSchema";
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
