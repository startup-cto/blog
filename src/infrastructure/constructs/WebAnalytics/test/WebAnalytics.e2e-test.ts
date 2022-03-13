import fetch from "node-fetch";
import { v4 as uuid } from "uuid";
import { publicApiKey } from "../publicApiKey";

const domainName = "analytics.startup-cto.net";
const url = `https://${domainName}`;
const apiKey = publicApiKey;

describe("WebAnalytics", () => {
  it("returns an event that was just created", async () => {
    const path = `/test-url/${uuid()}`;
    const postResponse = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ url: path }),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    });

    expect(postResponse.ok).toBe(true);

    const response = await fetch(url, {
      headers: {
        "x-api-key": apiKey,
      },
    });
    expect(await response.json()).toContainEqual(
      expect.objectContaining({ url: path })
    );
  });
});
