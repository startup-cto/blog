import { compile, extractSingleJsonSchema, TypeOf, v } from "suretype";

const statisticsSuretypeSchema = v.object({
  count: v.number().integer().required(),
  timestamp: v.string().format("date-time").required(),
  url: v.string().format("uri").required(),
  utm: v.object({
    source: v.string(),
    medium: v.string(),
    campaign: v.string(),
    term: v.string(),
    content: v.string(),
  }),
});

export type Statistics = TypeOf<typeof statisticsSuretypeSchema>;

export const ensureStatistics = compile(statisticsSuretypeSchema, {
  ensure: true,
});

export const statisticsSchema = extractSingleJsonSchema(
  statisticsSuretypeSchema
).schema;
