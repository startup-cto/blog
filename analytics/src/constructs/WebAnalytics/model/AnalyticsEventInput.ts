import { makeEnsureType } from "validation";

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

export const ensureAnalyticsEventInput = makeEnsureType(
  analyticsEventInputSchema,
  { removeAdditional: "all" }
);
