import { useEffect, useState } from "react";
import { fullDomainName } from "../infrastructure/constants/domainName";
import { publicApiKey } from "../infrastructure/constants/publicApiKey";

type Response<Data, Error = unknown> =
  | { loading: true; data: undefined; error: undefined }
  | { loading: false; data: Data; error: undefined }
  | { loading: false; data: undefined; error: Error };

export function useAnalyticsData(): Response<unknown[]> {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    (async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30 * 1000);

      const response = await fetch(`https://${fullDomainName}`, {
        headers: {
          "x-api-key": publicApiKey,
        },
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const data = await response.json();
      if (response.status === 200) {
        setData(data);
      } else {
        setError(data);
      }
      setLoading(false);
    })();
  }, []);

  return { data, loading, error };
}
