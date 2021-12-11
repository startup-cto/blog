import { Static, Type } from "@sinclair/typebox";
import Ajv, { ErrorObject } from "ajv";
import addFormats from "ajv-formats";

const ajv = addFormats(new Ajv(), [
  "date-time",
  "time",
  "date",
  "email",
  "hostname",
  "ipv4",
  "ipv6",
  "uri",
  "uri-reference",
  "uuid",
  "uri-template",
  "json-pointer",
  "relative-json-pointer",
  "regex",
])
  .addKeyword("kind")
  .addKeyword("modifier");

const postMetaDataSchema = Type.Object({
  title: Type.String(),
  slug: Type.String(),
  publishedAt: Type.Optional(Type.String({ format: "date-time" })),
  updatedAt: Type.Optional(Type.String({ format: "date-time" })),
  tags: Type.Optional(Type.Array(Type.String())),
  excerpt: Type.String(),
});

export function assertPostMetaData(
  data: unknown
): asserts data is PostMetaData {
  const isPostMetaData = ajv.compile(postMetaDataSchema);

  if (isPostMetaData(data)) {
    return;
  }

  throw new ValidationError(isPostMetaData.errors);
}

class ValidationError extends Error {
  errors: ErrorObject[];

  constructor(errors: ErrorObject[]) {
    super(
      "Validation failed:\n" + errors.map((error) => error.message).join("\n")
    );
    this.errors = errors;
  }
}

export type PostMetaData = Static<typeof postMetaDataSchema>;
