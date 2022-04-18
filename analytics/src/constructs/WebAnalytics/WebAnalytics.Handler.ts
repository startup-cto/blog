import { APIGatewayProxyHandler } from "aws-lambda";
import { loadEventsByMonth } from "./handler/loadEventsByMonth";
import { saveEvent } from "./handler/saveEvent";
import { ensureAnalyticsEventInput } from "./AnalyticsEventInput";
import { aggregateEvents } from "./handler/aggregateEvents";
import { cors } from "@lambda-middleware/cors";

export const handler: APIGatewayProxyHandler = cors({
  allowedOrigins: [
    "http://localhost:3000",
    "http://localhost:6006",
    "https://startup-cto.net",
  ],
})(async function (event) {
  if (event.httpMethod === "GET") {
    const now = new Date();
    const events = await loadEventsByMonth(
      now.getFullYear(),
      now.getMonth() + 1
    );
    return {
      statusCode: 200,
      body: JSON.stringify(aggregateEvents(events), null, 2),
    };
  }

  if (event.httpMethod === "POST") {
    const timestamp = new Date(
      event.requestContext.requestTimeEpoch
    ).toISOString();

    const analyticsEventInput = ensureAnalyticsEventInput(
      JSON.parse(event.body ?? "{}")
    );

    await saveEvent({
      ...analyticsEventInput,
      name: "pageview",
      timestamp,
    });

    return {
      statusCode: 201,
      body: "",
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ error: "Unsupported method" }, null, 2),
  };
});
