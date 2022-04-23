import { JSONSchema } from "json-schema-to-ts";
import { ajv } from "./ajv";

export function makeIsType(fooSchema: JSONSchema) {
  return ajv.compile(fooSchema);
}
