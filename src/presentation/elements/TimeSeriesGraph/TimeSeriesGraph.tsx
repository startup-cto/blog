import { Line, LineChart, XAxis, YAxis } from "recharts";

interface Props {
  data: { timestamp: string; count: number }[];
}

export function TimeSeriesGraph({ data }: Props) {
  return (
    <LineChart
      width={400}
      height={400}
      data={data}
      margin={{
        top: 50,
        left: 50,
        right: 50,
        bottom: 50,
      }}
    >
      <XAxis dataKey="timestamp" />
      <YAxis domain={[0, "dataMax"]} />
      <Line dataKey="count" />
    </LineChart>
  );
}
