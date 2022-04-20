import { loadEventsByMonth } from "./handler/loadEventsByMonth";
import { aggregateEvents } from "./handler/aggregateEvents";
import { APIGatewayProxyHandler } from "aws-lambda";
import { cors } from "@lambda-middleware/cors";

export const handler: APIGatewayProxyHandler = cors({
  allowedOrigins: [
    "http://localhost:3000",
    "http://localhost:6006",
    "https://startup-cto.net",
  ],
})(async function () {
  const now = new Date();
  const events = await loadEventsByMonth(now.getFullYear(), now.getMonth() + 1);
  return {
    statusCode: 200,
    body: JSON.stringify(aggregateEvents(events), null, 2),
  };
});
