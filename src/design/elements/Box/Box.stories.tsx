import React from "react";

import { Box } from "./Box";
import { ComponentStory } from "@storybook/react";

export default {
  title: "elements/Box",
  component: Box,
};

const Template: ComponentStory<typeof Box> = (args) => <Box {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Some text",
};
