import React from "react";

import { InlineCode } from "./InlineCode";
import { ComponentStory } from "@storybook/react";

export default {
  title: "elements/InlineCode",
  component: InlineCode,
};

const Template: ComponentStory<typeof InlineCode> = (args) => (
  <InlineCode {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "some code",
};
