import { model } from "dynamoose";
import type { Document } from "dynamoose/dist/Document";
import { config } from "./config";
import { Event } from "../Event";
import { DBSchema } from "./DBSchema";

const dbEventSchema: DBSchema<Event> = {
  name: { type: String, required: true },
  timestamp: { type: String, required: true, rangeKey: true },
  url: { type: String, required: true },
  utmCampaign: String,
  utmContent: String,
  utmTerm: String,
  utmMedium: String,
  utmSource: String,
};

interface EventDBSpecifics {
  scatter: number;
  ttl: number;
}

export const DBEvent = model<Document & Event & EventDBSpecifics>(
  config.tableName,
  {
    ...dbEventSchema,
    scatter: { type: Number, required: true, hashKey: true },
    ttl: { type: Number, required: true },
  }
);
