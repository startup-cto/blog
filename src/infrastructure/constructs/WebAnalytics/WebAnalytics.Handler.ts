import { APIGatewayProxyHandler } from "aws-lambda";
import { loadEventsByMonth } from "./handler/loadEventsByMonth";
import { saveEvent } from "./handler/saveEvent";
import { ensureAnalyticsEventInput } from "./AnalyticsEventInput";

export const handler: APIGatewayProxyHandler = async function (event) {
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      body: JSON.stringify(await loadEventsByMonth(2022, 3), null, 2),
    };
  }

  if (event.httpMethod === "POST") {
    const timestamp = new Date(
      event.requestContext.requestTimeEpoch
    ).toISOString();

    const analyticsEventInput = ensureAnalyticsEventInput(
      JSON.parse(event.body!)
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
};
