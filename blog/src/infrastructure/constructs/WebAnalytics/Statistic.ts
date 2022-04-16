import { compile, extractSingleJsonSchema, TypeOf, v } from "suretype";
import { analyticsEventSchemaProps } from "./AnalyticsEvent";

const statisticSuretypeSchema = v.object({
  ...analyticsEventSchemaProps,
  count: v.number().integer().gte(1).required(),
});

export type Statistic = TypeOf<typeof statisticSuretypeSchema>;

export const ensureStatistic = compile(statisticSuretypeSchema, {
  ensure: true,
  ajvOptions: { removeAdditional: "all" },
});

export const analyticsEventSchema = extractSingleJsonSchema(
  statisticSuretypeSchema
).schema;
