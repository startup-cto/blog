import betterAjvErrors from "better-ajv-errors";
import { JSONSchema } from "json-schema-to-ts";
import { ajv } from "./ajv";

export function makeAssertType<Type>(schema: JSONSchema) {
  function assert(data: unknown): asserts data is Type {
    const validate = ajv.compile(schema);
    if (!validate(data)) {
      const errorMessage = betterAjvErrors(schema, data, validate.errors!);
      throw new TypeError(errorMessage);
    }
  }
  return assert;
}
