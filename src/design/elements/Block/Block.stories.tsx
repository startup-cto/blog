import React from "react";

import { Block } from "./Block";
import { ComponentStory } from "@storybook/react";

export default {
  title: "elements/Block",
  component: Block,
};

const Template: ComponentStory<typeof Block> = (args) => <Block {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Some text",
};
