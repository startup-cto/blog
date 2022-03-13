import React from "react";

import { TimeSeriesGraph } from "./TimeSeriesGraph";
import { ComponentStory } from "@storybook/react";

export default {
  title: "elements/TimeSeriesGraph",
  component: TimeSeriesGraph,
};

export const Default: ComponentStory<typeof TimeSeriesGraph> = (args) => (
  <TimeSeriesGraph {...args} />
);
Default.args = {
  data: [
    { timestamp: "2022-03-01", count: 1 },
    { timestamp: "2022-03-02", count: 2 },
    { timestamp: "2022-03-03", count: 1 },
  ],
};
