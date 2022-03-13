import { useEffect, useState } from "react";
import { fullDomainName } from "../infrastructure/constants/domainName";
import { publicApiKey } from "../infrastructure/constants/publicApiKey";
import { Statistic } from "../infrastructure/constructs/WebAnalytics/Statistic";

type Response<Data, Error = unknown> =
  | { loading: true; data: undefined; error: undefined }
  | { loading: false; data: Data; error: undefined }
  | { loading: false; data: undefined; error: Error };

export function useAnalyticsData(): Response<Statistic[]> {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
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
    return () => controller.abort();
  }, []);

  return { data, loading, error };
}
