import { useEffect } from "react";
import { domainName, publicApiKey } from "analytics";
import { useRouter } from "next/router";

export function useTrackPageView() {
  const router = useRouter();
  useEffect(() => {
    void logPageView();
    router.events.on("routeChangeComplete", logPageView);
    return () => {
      router.events.off("routeChangeComplete", logPageView);
    };
  }, [router.events]);
}

async function logPageView() {
  const searchParams = new URLSearchParams(window.location.search);
  const entries = Array.from(searchParams.entries()).map(([key, value]) => [
    transformUtmParam(key),
    value,
  ]);
  try {
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
  } catch {}
}

function transformUtmParam(param: string): string {
  if (!param.startsWith("utm_")) {
    return param;
  }
  return `utm${param.charAt(4).toUpperCase()}${param.slice(5)}`;
}
