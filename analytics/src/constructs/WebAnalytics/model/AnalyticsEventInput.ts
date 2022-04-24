import { makeEnsureType } from "validation";
import { FromSchema } from "validation/src";

export const analyticsEventInputSchemaProps = {
  path: { type: "string", format: "uri-reference" },
  utmSource: { type: "string" },
  utmMedium: { type: "string" },
  utmCampaign: { type: "string" },
  utmTerm: { type: "string" },
  utmContent: { type: "string" },
} as const;

export const analyticsEventInputSchema = {
  type: "object",
  properties: analyticsEventInputSchemaProps,
  required: ["path"],
} as const;

type AnalyticsEventInput = FromSchema<typeof analyticsEventInputSchema>;

export const ensureAnalyticsEventInput = makeEnsureType<AnalyticsEventInput>(
  analyticsEventInputSchema,
  { removeAdditional: "all" }
);
