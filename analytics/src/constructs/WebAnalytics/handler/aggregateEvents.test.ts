import { aggregateEvents } from "./aggregateEvents";
import { AnalyticsEventMock } from "../AnalyticsEventMock";

describe("aggregateEvents", () => {
  it("returns an array", () => {
    expect(aggregateEvents([])).toEqual([]);
  });

  it("aggregates multiple events on the same day", () => {
    const timestamp = "2022-01-01T00:00:00.000Z";
    const path = "/some-path";
    const name = "pageview";

    expect(
      aggregateEvents([
        new AnalyticsEventMock({ name, timestamp, path }),
        new AnalyticsEventMock({ name, timestamp, path }),
      ])
    ).toEqual([{ timestamp: "2022-01-01", name, path, count: 2 }]);
  });

  it("does not aggregate events on different days", () => {
    expect(
      aggregateEvents([
        new AnalyticsEventMock({ timestamp: "2022-01-01T00:00:00.000Z" }),
        new AnalyticsEventMock({ timestamp: "2022-01-02T00:00:00.000Z" }),
      ])
    ).toHaveLength(2);
  });

  it("does not aggregate events on different paths", () => {
    const timestamp = "2022-01-01T00:00:00.000Z";

    expect(
      aggregateEvents([
        new AnalyticsEventMock({ timestamp, path: "/some-path-1" }),
        new AnalyticsEventMock({ timestamp, path: "/some-path-2" }),
      ])
    ).toHaveLength(2);
  });
});
