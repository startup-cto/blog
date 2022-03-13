import { compile, extractSingleJsonSchema, TypeOf, v } from "suretype";
import { analyticsEentInputSchemaProps } from "./AnalyticsEventInput";

const analyticsEventSuretypeSchema = v.object({
  timestamp: v.string().format("date-time").required(),
  name: v.string().enum("pageview").required(),
  ...analyticsEentInputSchemaProps,
});

export type AnalyticsEvent = TypeOf<typeof analyticsEventSuretypeSchema>;

export const ensureAnalyticsEvent = compile(analyticsEventSuretypeSchema, {
  ensure: true,
  ajvOptions: { removeAdditional: "all" },
});

export const analyticsEventSchema = extractSingleJsonSchema(
  analyticsEventSuretypeSchema
).schema;
