import { compile, extractSingleJsonSchema, TypeOf, v } from "suretype";
import { analyticsEventInputSchemaProps } from "./AnalyticsEventInput";

export const analyticsEventSchemaProps = {
  timestamp: v.string().format("date-time").required(),
  name: v.string().enum("pageview").required(),
  ...analyticsEventInputSchemaProps,
};
const analyticsEventSuretypeSchema = v.object(analyticsEventSchemaProps);

export type AnalyticsEvent = TypeOf<typeof analyticsEventSuretypeSchema>;

export const ensureAnalyticsEvent = compile(analyticsEventSuretypeSchema, {
  ensure: true,
  ajvOptions: { removeAdditional: "all" },
});

export const analyticsEventSchema = extractSingleJsonSchema(
  analyticsEventSuretypeSchema
).schema;
