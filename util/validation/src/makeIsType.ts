import type { Options } from "ajv";
import { makeEnsureType } from "./makeEnsureType";
import { JSONSchema } from "json-schema-to-ts";

export function makeIsType<Type>(
  schema: JSONSchema,
  ajvOptions?: Options
): (data: unknown) => data is Type {
  const ensure: (data: unknown) => asserts data is Type = makeEnsureType(
    schema,
    ajvOptions
  );
  return function isType(data: unknown): data is Type {
    try {
      ensure(data);
      return true;
    } catch {
      return false;
    }
  };
}
