import { makeEnsureType } from "validation";

const configSchema = {
  type: "object",
  properties: {
    maxScatter: { type: "integer", minimum: 1 },
    tableName: { type: "string" },
    partitionKey: { type: "string" },
    sortKey: { type: "string" },
    ttlAttribute: { type: "string" },
  },
  required: [
    "maxScatter",
    "tableName",
    "partitionKey",
    "sortKey",
    "ttlAttribute",
  ],
} as const;

const ensureConfig = makeEnsureType(configSchema, {
  coerceTypes: true,
});

export const config = ensureConfig({
  maxScatter: process.env.MAX_SCATTER,
  tableName: process.env.DYNAMODB_TABLE,
  partitionKey: process.env.DYNAMODB_PARTITION_KEY,
  sortKey: process.env.DYNAMODB_SORT_KEY,
  ttlAttribute: process.env.DYNAMODB_TTL_ATTRIBUTE,
});
