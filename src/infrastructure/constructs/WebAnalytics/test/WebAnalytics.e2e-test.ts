import fetch from "node-fetch";

const url = process.env.WEB_ANAlYTICS_URL!;

describe("WebAnalytics", () => {
  it("returns an event that was just created", async () => {
    const path = "/test-url";
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({ url: path }),
    });

    const response = await fetch(url);
    expect(await response.json()).toContainEqual(
      expect.objectContaining({ url: path })
    );
  });
});
