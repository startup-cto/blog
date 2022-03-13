import { ensureAnalyticsEvent } from "./AnalyticsEvent";
import { AnalyticsEventMock } from "./AnalyticsEventMock";

describe("AnalyticsEventMock", () => {
  it("is an AnalyticsEvent", () => {
    expect(ensureAnalyticsEvent(new AnalyticsEventMock())).toBeDefined();
  });
});
