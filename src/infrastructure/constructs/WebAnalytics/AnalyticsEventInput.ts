import { compile, extractSingleJsonSchema, TypeOf, v } from "suretype";

export const analyticsEventInputSchemaProps = {
  path: v.string().format("uri-reference").required(),
  utmSource: v.string(),
  utmMedium: v.string(),
  utmCampaign: v.string(),
  utmTerm: v.string(),
  utmContent: v.string(),
};

const analyticsEventInputSuretypeSchema = v.object(
  analyticsEventInputSchemaProps
);

export type AnalyticsEventInput = TypeOf<
  typeof analyticsEventInputSuretypeSchema
>;

export const ensureAnalyticsEventInput = compile(
  analyticsEventInputSuretypeSchema,
  {
    ensure: true,
    ajvOptions: { removeAdditional: "all" },
  }
);

export const analyticsEventInputSchema = extractSingleJsonSchema(
  analyticsEventInputSuretypeSchema
).schema;
