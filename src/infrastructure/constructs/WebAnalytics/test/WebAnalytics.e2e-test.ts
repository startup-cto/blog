import fetch from "node-fetch";
import { v4 as uuid } from "uuid";

const url = process.env.WEB_ANAlYTICS_URL!;

describe("WebAnalytics", () => {
  it("returns an event that was just created", async () => {
    const path = `/test-url/${uuid()}`;
    const postResponse = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ url: path }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(postResponse.ok).toBe(true);

    const response = await fetch(url);
    expect(await response.json()).toContainEqual(
      expect.objectContaining({ url: path })
    );
  });
});
