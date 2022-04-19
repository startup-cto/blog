import { Statistic } from "analytics";
import { TimeSeriesGraph } from "../../elements/TimeSeriesGraph/TimeSeriesGraph";

interface Props {
  data: Statistic[];
}

export function AnalyticsList({ data }: Props) {
  const paths = Array.from(new Set(data.map((statistic) => statistic.path)));

  return (
    <>
      {paths.map((path) => (
        <TimeSeriesGraph
          key={path}
          title={path}
          data={data.filter((statistic) => statistic.path === path)}
        />
      ))}
    </>
  );
}
