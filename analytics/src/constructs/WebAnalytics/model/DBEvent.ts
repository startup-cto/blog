import { config } from "../handler/config";
import { AnalyticsEvent } from "./AnalyticsEvent";
import { DBSchema } from "../util/DBSchema";
import { DynamoDbSchema, DynamoDbTable } from "@aws/dynamodb-data-mapper";
import { createScatter } from "../handler/createScatter";

const dbEventSchema: DBSchema<AnalyticsEvent> = {
  name: { type: "String" },
  timestamp: { type: "String", keyType: "RANGE" },
  path: { type: "String" },
  utmCampaign: { type: "String" },
  utmContent: { type: "String" },
  utmTerm: { type: "String" },
  utmMedium: { type: "String" },
  utmSource: { type: "String" },
};

interface EventDBSpecifics {
  scatter: number;
  ttl: Date;
}

export class DBEvent implements AnalyticsEvent, EventDBSpecifics {
  /* eslint-disable @typescript-eslint/ban-ts-comment */
  // @ts-ignore
  path: string;
  // @ts-ignore
  timestamp: string;
  // @ts-ignore
  name: "pageview";
  // @ts-ignore
  scatter: number;
  // @ts-ignore
  ttl: Date;
  /* eslint-enable @typescript-eslint/ban-ts-comment */

  constructor(event?: AnalyticsEvent) {
    if (!event) {
      return;
    }
    const oneYearInMilliseconds = 60 * 60 * 24 * 365 * 1000;
    this.ttl = new Date(
      new Date(event.timestamp).getTime() + oneYearInMilliseconds
    );
    this.scatter = createScatter();

    Object.assign(this, event);
  }
}

Object.defineProperties(DBEvent.prototype, {
  [DynamoDbTable]: { value: config.tableName },
  [DynamoDbSchema]: {
    value: {
      ...dbEventSchema,
      scatter: { type: "Number", keyType: "HASH" },
      ttl: { type: "Date" },
    },
  },
});
