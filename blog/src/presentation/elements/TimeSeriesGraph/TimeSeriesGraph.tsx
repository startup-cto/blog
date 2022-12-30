import { Line, LineChart, XAxis, YAxis } from "recharts";

interface Props {
  data: { timestamp: string; count: number }[];
  title: string;
}

export function TimeSeriesGraph({ data, title }: Props) {
  return (
    <>
      <h3>{title}</h3>
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
        <Line dataKey="count" isAnimationActive={false} />
      </LineChart>
    </>
  );
}
