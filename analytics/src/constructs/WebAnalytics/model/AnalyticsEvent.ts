import { FromSchema, makeEnsureType } from "validation";
import { analyticsEventInputSchemaProps } from "./AnalyticsEventInput";

export const analyticsEventSchemaProps = {
  timestamp: { type: "string", format: "date-time" },
  name: { enum: ["pageview"] },
  ...analyticsEventInputSchemaProps,
} as const;

const analyticsEventSchema = {
  type: "object",
  properties: analyticsEventSchemaProps,
  required: ["path", "name", "timestamp"],
} as const;

export type AnalyticsEvent = FromSchema<typeof analyticsEventSchema>;

export const ensureAnalyticsEvent = makeEnsureType<AnalyticsEvent>(
  analyticsEventSchema,
  {
    removeAdditional: "all",
  }
);
