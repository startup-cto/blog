import { APIGatewayProxyHandler } from "aws-lambda";
import { loadEventsByMonth } from "./handler/loadEventsByMonth";
import { saveEvent } from "./handler/saveEvent";
import { AnalyticsEvent, ensureAnalyticsEvent } from "./AnalyticsEvent";

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

    let analyticsEvent: AnalyticsEvent;
    try {
      analyticsEvent = ensureAnalyticsEvent({
        ...JSON.parse(event.body!),
        name: "pageview",
        timestamp,
      });
    } catch {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Invalid event",
        }),
      };
    }

    await saveEvent(analyticsEvent);

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
