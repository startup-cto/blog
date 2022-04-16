import fetch from "node-fetch";
import { v4 as uuid } from "uuid";
import { domainName } from "./constants/domainName";
import { publicApiKey } from "./constants/publicApiKey";

const url = `https://${domainName}`;

describe("WebAnalytics", () => {
  it("returns an event that was just created", async () => {
    const path = `/test-url/${uuid()}`;
    const postResponse = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ path }),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": publicApiKey,
      },
    });

    expect(postResponse.ok).toBe(true);

    const response = await fetch(url, {
      headers: {
        "x-api-key": publicApiKey,
      },
    });
    expect(await response.json()).toContainEqual(
      expect.objectContaining({ path })
    );
  });
});
