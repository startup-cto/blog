import { FromSchema, JSONSchema } from "json-schema-to-ts";
import { Options } from "ajv";
import { createAjv } from "./ajv";
import betterAjvErrors from "better-ajv-errors";
import { klona as clone } from "klona";

export function makeEnsureType<Schema extends JSONSchema>(
  schema: Schema,
  ajvOptions?: Options
) {
  return function ensure(data: unknown): FromSchema<Schema> {
    const validate = createAjv(ajvOptions).compile(schema);
    const clonedData = clone(data);
    validate(clonedData);
    const { errors } = validate;
    if (errors) {
      const errorMessage = betterAjvErrors(schema, clonedData, errors);
      throw new TypeError(errorMessage);
    }
    return clonedData as FromSchema<Schema>;
  };
}
