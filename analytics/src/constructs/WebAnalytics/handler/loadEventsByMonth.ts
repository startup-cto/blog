import { AnalyticsEvent, ensureAnalyticsEvent } from "../model/AnalyticsEvent";
import { DBEvent } from "../model/DBEvent";
import { config } from "./config";
import { DynamoDB } from "aws-sdk";
import { DataMapper } from "@aws/dynamodb-data-mapper";
import { beginsWith, equals } from "@aws/dynamodb-expressions";
import { toArray } from "../util/toArray";

const client = new DynamoDB();
const mapper = new DataMapper({ client });

export async function loadEventsByMonth(
  year: number,
  month: number
): Promise<AnalyticsEvent[]> {
  const scatters = Array.from(Array(config.maxScatter).keys());
  const results = await Promise.all(
    scatters.flatMap((scatter) => {
      return toArray(
        mapper.query(DBEvent, {
          [config.partitionKey]: equals(scatter),
          [config.sortKey]: beginsWith(
            `${year}-${month.toString().padStart(2, "0")}`
          ),
        })
      );
    })
  );
  const events = results.flat();
  return events.map((event) => ensureAnalyticsEvent(event));
}
