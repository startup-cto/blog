import betterAjvErrors from "better-ajv-errors";
import { JSONSchema } from "json-schema-to-ts";
import { createAjv } from "./ajv";
import { Options } from "ajv";

export function makeAssertType<Type>(schema: JSONSchema, ajvOptions?: Options) {
  function assert(data: unknown): asserts data is Type {
    const validate = createAjv(ajvOptions).compile(schema);
    validate(data);
    const { errors } = validate;
    if (errors) {
      const errorMessage = betterAjvErrors(schema, data, errors);
      throw new TypeError(errorMessage);
    }
  }
  return assert;
}
