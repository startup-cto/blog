import React from "react";

import { AnalyticsList } from "./AnalyticsList";
import { ComponentStory } from "@storybook/react";

export default {
  title: "blocks/AnalyticsList",
  component: AnalyticsList,
};

export const Default: ComponentStory<typeof AnalyticsList> = (args) => (
  <AnalyticsList {...args} />
);
Default.args = {
  data: [
    { timestamp: "2022-03-01", count: 1, path: "/", name: "pageview" },
    { timestamp: "2022-03-02", count: 2, path: "/", name: "pageview" },
    { timestamp: "2022-03-03", count: 1, path: "/article", name: "pageview" },
  ],
};
