import React from "react";

import { Heading } from "./Heading";
import { ComponentStory } from "@storybook/react";

export default {
  title: "elements/Heading",
  component: Heading,
};

const Template: ComponentStory<typeof Heading> = (args) => (
  <Heading {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "Heading",
  variant: "h1",
};
