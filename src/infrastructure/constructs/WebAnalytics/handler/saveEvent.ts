import { AnalyticsEvent } from "../AnalyticsEvent";
import { DBEvent } from "./DBEvent";
import { DynamoDB } from "aws-sdk";
import { DataMapper } from "@aws/dynamodb-data-mapper";

const client = new DynamoDB();
const mapper = new DataMapper({ client });

export async function saveEvent(event: AnalyticsEvent) {
  await mapper.put(new DBEvent(event));
}
