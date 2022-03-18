import { useEffect } from "react";
import { domainName } from "../infrastructure/constants/domainName";
import { publicApiKey } from "../infrastructure/constants/publicApiKey";

export function useTrackPageView() {
  useEffect(() => {
    (async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const entries = Array.from(searchParams.entries()).map(([key, value]) => [
        transformUtmParam(key),
        value,
      ]);
      await fetch(`https://${domainName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": publicApiKey,
        },
        body: JSON.stringify({
          path: window.location.pathname,
          ...Object.fromEntries(entries),
        }),
      });
    })();
  }, []);
}

function transformUtmParam(param: string): string {
  if (!param.startsWith("utm_")) {
    return param;
  }
  return `utm${param.charAt(4).toUpperCase()}${param.slice(5)}`;
}
