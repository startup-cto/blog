import Ajv from "ajv";
import addFormats from "ajv-formats";
import betterAjvErrors from "better-ajv-errors";
import { JSONSchema } from "json-schema-to-ts";

const ajv = new Ajv();
addFormats(ajv);

export function makeAssert<Type>(schema: JSONSchema) {
  function assert(data: unknown): asserts data is Type {
    const validate = ajv.compile(schema);
    if (!validate(data)) {
      const errorMessage = betterAjvErrors(schema, data, validate.errors!);
      throw new TypeError(errorMessage);
    }
  }
  return assert;
}
