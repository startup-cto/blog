import { APIGatewayProxyHandler } from "aws-lambda";
import { ensureAnalyticsEventInput } from "./model/AnalyticsEventInput";
import { saveEvent } from "./handler/saveEvent";
import { cors } from "@lambda-middleware/cors";

export const handler: APIGatewayProxyHandler = cors({
  allowedOrigins: [
    "http://localhost:3000",
    "http://localhost:6006",
    "https://startup-cto.net",
  ],
})(async function (event) {
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
});
