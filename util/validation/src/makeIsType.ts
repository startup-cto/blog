import { JSONSchema } from "json-schema-to-ts";
import { createAjv } from "./ajv";
import { Options } from "ajv";

export function makeIsType(fooSchema: JSONSchema, ajvOptions?: Options) {
  return createAjv(ajvOptions).compile(fooSchema);
}
