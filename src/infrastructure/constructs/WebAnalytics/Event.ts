import { compile, extractSingleJsonSchema, TypeOf, v } from "suretype";

const eventSuretypeSchema = v.object({
  timestamp: v.string().format("date-time").required(),
  name: v.string().const("pageview").required(),
  url: v.string().format("uri-reference").required(),
  utmSource: v.string(),
  utmMedium: v.string(),
  utmCampaign: v.string(),
  utmTerm: v.string(),
  utmContent: v.string(),
});

export type Event = TypeOf<typeof eventSuretypeSchema>;

export const ensureEvent = compile(eventSuretypeSchema, {
  ensure: true,
  ajvOptions: { removeAdditional: "all" },
});

export const eventSchema = extractSingleJsonSchema(eventSuretypeSchema).schema;
