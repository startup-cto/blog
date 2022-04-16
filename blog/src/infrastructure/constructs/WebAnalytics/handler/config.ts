import { compile, v } from "suretype";

const configSchema = v.object({
  maxScatter: v.number().integer().gte(1).required(),
  tableName: v.string().required(),
  partitionKey: v.string().required(),
  sortKey: v.string().required(),
  ttlAttribute: v.string().required(),
});

const ensureConfig = compile(configSchema, {
  ensure: true,
  ajvOptions: { coerceTypes: true },
});

export const config = ensureConfig({
  maxScatter: process.env.MAX_SCATTER,
  tableName: process.env.DYNAMODB_TABLE,
  partitionKey: process.env.DYNAMODB_PARTITION_KEY,
  sortKey: process.env.DYNAMODB_SORT_KEY,
  ttlAttribute: process.env.DYNAMODB_TTL_ATTRIBUTE,
});
