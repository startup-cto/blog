import { compile, extractSingleJsonSchema, TypeOf, v } from "suretype";

const analyticsEventSuretypeSchema = v.object({
  timestamp: v.string().format("date-time").required(),
  name: v.string().const("pageview").required(),
  url: v.string().format("uri-reference").required(),
  utmSource: v.string(),
  utmMedium: v.string(),
  utmCampaign: v.string(),
  utmTerm: v.string(),
  utmContent: v.string(),
});

export type AnalyticsEvent = TypeOf<typeof analyticsEventSuretypeSchema>;

export const ensureAnalyticsEvent = compile(analyticsEventSuretypeSchema, {
  ensure: true,
  ajvOptions: { removeAdditional: "all" },
});

export const analyticsEventSchema = extractSingleJsonSchema(
  analyticsEventSuretypeSchema
).schema;
