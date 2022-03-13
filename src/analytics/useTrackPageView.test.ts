/** @jest-environment jsdom */

import "../test-helpers/polyfillFetch";

import { renderHook } from "@testing-library/react-hooks";
import { useTrackPageView } from "./useTrackPageView";
import nock from "nock";
import { fullDomainName } from "../infrastructure/constants/domainName";
import { publicApiKey } from "../infrastructure/constants/publicApiKey";

describe("useTrackPageView", () => {
  it("tracks the current path", async () => {
    const pathname = "/some-path";

    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = { pathname };

    const postMock = nock(`https://${fullDomainName}`)
      .post("/", { path: pathname })
      .matchHeader("x-api-key", publicApiKey)
      .reply(201, "");

    const { waitFor } = renderHook(() => useTrackPageView());
    await waitFor(() => expect(postMock.isDone()).toBe(true));
  });

  it("does not crash in case of an error response", async () => {
    const pathname = "/some-path";

    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = { pathname };

    const postMock = nock(`https://${fullDomainName}`)
      .post("/", { path: pathname })
      .matchHeader("x-api-key", publicApiKey)
      .reply(500, "");

    const { result, waitFor } = renderHook(() => useTrackPageView());
    await waitFor(() => expect(postMock.isDone()).toBe(true));
    expect(result.error).toBeUndefined();
  });
});
