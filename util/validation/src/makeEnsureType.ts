import type { JSONSchema } from "json-schema-to-ts";
import type { Options } from "ajv";

import betterAjvErrors from "better-ajv-errors";
import { klona as clone } from "klona";
import { createAjv } from "./ajv";

export function makeEnsureType<Type>(schema: JSONSchema, ajvOptions?: Options) {
  return function ensure(data: unknown): Type {
    const validate = createAjv(ajvOptions).compile(schema);
    const clonedData = clone(data);
    validate(clonedData);
    const { errors } = validate;
    if (errors) {
      const errorMessage = betterAjvErrors(schema, clonedData, errors);
      throw new TypeError(errorMessage);
    }
    return clonedData as Type;
  };
}
