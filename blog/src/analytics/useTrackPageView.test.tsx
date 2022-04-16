/** @jest-environment jsdom */

import "../test-helpers/polyfillFetch";

import { renderHook } from "@testing-library/react-hooks";
import { useTrackPageView } from "./useTrackPageView";
import nock from "nock";
import { domainName, publicApiKey } from "analytics";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    events: {
      on: jest.fn(),
    },
  }),
}));

describe("useTrackPageView", () => {
  it("tracks the current path", async () => {
    const pathname = "/some-path";

    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = { pathname };

    const postMock = nock(`https://${domainName}`)
      .post("/", { path: pathname })
      .matchHeader("x-api-key", publicApiKey)
      .reply(201, "");

    const { waitFor } = renderHook(() => useTrackPageView());
    await waitFor(() => expect(postMock.isDone()).toBe(true));
  });

  it.each(["Source", "Medium", "Campaign", "Term", "Content"])(
    "tracks the utm %s",
    async (utmType) => {
      const pathname = "/";
      const utmValue = `some-value`;
      const search = `?utm_${utmType.toLowerCase()}=${utmValue}`;

      // @ts-ignore
      delete window.location;
      // @ts-ignore
      window.location = { pathname, search };

      const postMock = nock(`https://${domainName}`)
        .post("/", { path: pathname, [`utm${utmType}`]: utmValue })
        .matchHeader("x-api-key", publicApiKey)
        .reply(201, "");

      const { waitFor } = renderHook(() => useTrackPageView());
      await waitFor(() => expect(postMock.isDone()).toBe(true));
    }
  );

  it("does not crash in case of an error response", async () => {
    const pathname = "/some-path";

    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = { pathname };

    const postMock = nock(`https://${domainName}`)
      .post("/", { path: pathname })
      .matchHeader("x-api-key", publicApiKey)
      .reply(500, "");

    const { result, waitFor } = renderHook(() => useTrackPageView());
    await waitFor(() => expect(postMock.isDone()).toBe(true));
    expect(result.error).toBeUndefined();
  });
});
