import { analyticsEventSchemaProps } from "./AnalyticsEvent";
import { FromSchema, makeEnsureType } from "validation";

const statisticSchema = {
  type: "object",
  properties: {
    ...analyticsEventSchemaProps,
    count: { type: "integer", minimum: 1 },
  },
  required: ["count", "timestamp", "name", "path"],
} as const;

export type Statistic = FromSchema<typeof statisticSchema>;

export const ensureStatistic = makeEnsureType(statisticSchema, {
  removeAdditional: "all",
});
