/** @jest-environment jsdom */

import { renderHook } from "@testing-library/react-hooks";
import { useAnalyticsData } from "./useAnalyticsData";
import nock from "nock";
import fetch from "node-fetch";
import { publicApiKey } from "../infrastructure/constants/publicApiKey";
import { fullDomainName } from "../infrastructure/constants/domainName";

global["fetch"] = fetch as any;

describe("useAnalyticsData", () => {
  it("starts in loading state", async () => {
    const { result } = renderHook(() => useAnalyticsData());

    expect(result.current.loading).toBe(true);
  });

  it("returns the data from the endpoint", async () => {
    nock(`https://${fullDomainName}`)
      .get("/")
      .matchHeader("x-api-key", publicApiKey)
      .reply(200, []);

    const { result, waitForValueToChange } = renderHook(() =>
      useAnalyticsData()
    );

    await waitForValueToChange(() => result.current.loading);

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual([]);
  });

  it("returns the error from the endpoint", async () => {
    const error = { message: "error" };
    nock(`https://${fullDomainName}`)
      .get("/")
      .matchHeader("x-api-key", publicApiKey)
      .reply(400, error);

    const { result, waitForValueToChange } = renderHook(() =>
      useAnalyticsData()
    );

    await waitForValueToChange(() => result.current.loading);

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual(error);
  });
});
