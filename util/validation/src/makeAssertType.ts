import type { JSONSchema } from "json-schema-to-ts";
import type { Options } from "ajv";

import { makeEnsureType } from "./makeEnsureType";

export function makeAssertType<Type>(
  schema: JSONSchema,
  ajvOptions?: Options
): (data: unknown) => asserts data is Type {
  const ensureType = makeEnsureType(schema, ajvOptions);
  return function assert(data: unknown): asserts data is Type {
    ensureType(data);
  };
}
