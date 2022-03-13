import { useEffect } from "react";
import { domainName } from "../infrastructure/constants/domainName";
import { publicApiKey } from "../infrastructure/constants/publicApiKey";

export function useTrackPageView() {
  useEffect(() => {
    (async () => {
      await fetch(`https://${domainName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": publicApiKey,
        },
        body: JSON.stringify({
          path: window.location.pathname,
        }),
      });
    })();
  }, []);
}
