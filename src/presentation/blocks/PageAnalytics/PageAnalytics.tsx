import { useAnalyticsData } from "../../../analytics/useAnalyticsData";
import { AnalyticsList } from "../AnalyticsList/AnalyticsList";

export function PageAnalytics() {
  const analytics = useAnalyticsData();
  if (analytics.loading) {
    return <div>Loading...</div>;
  }

  if (analytics.error) {
    return <div>Error</div>;
  }

  return <AnalyticsList data={analytics.data!} />;
}
