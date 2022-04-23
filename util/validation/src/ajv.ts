import Ajv, { Options } from "ajv";
import addFormats from "ajv-formats";

export function createAjv(ajvOptions?: Options) {
  const ajv = new Ajv(ajvOptions);
  addFormats(ajv);

  return ajv;
}
