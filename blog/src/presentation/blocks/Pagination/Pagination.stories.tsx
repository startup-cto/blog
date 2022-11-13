import React from "react";

import { ComponentStory } from "@storybook/react";
import { Pagination } from "./Pagination";

export default {
  title: "blocks/Pagination",
  component: Pagination,
};

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Default = Template.bind({});
Default.args = {
  currentPage: 1,
  pageCount: 3,
};
