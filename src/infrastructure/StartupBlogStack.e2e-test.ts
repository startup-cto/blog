import fetch from "node-fetch";
import { v4 as uuid } from "uuid";
import { fullDomainName } from "./constants/domainName";
import { publicApiKey } from "./constants/publicApiKey";

const url = `https://${fullDomainName}`;

describe("WebAnalytics", () => {
  it("returns an event that was just created", async () => {
    const path = `/test-url/${uuid()}`;
    const postResponse = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ url: path }),
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
      expect.objectContaining({ url: path })
    );
  });
});
