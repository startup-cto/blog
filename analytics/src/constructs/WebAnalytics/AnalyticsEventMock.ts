import { AnalyticsEvent } from "./AnalyticsEvent";

export class AnalyticsEventMock implements AnalyticsEvent {
  public name = "pageview" as const;
  public path = "/some-page";
  public timestamp = "2022-01-01T00:00:00.000Z";

  constructor(override: Partial<AnalyticsEvent> = {}) {
    Object.assign(this, override);
  }
}
