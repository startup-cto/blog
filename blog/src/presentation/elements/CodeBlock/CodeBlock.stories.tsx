import React from "react";

import { CodeBlock } from "./CodeBlock";
import { ComponentStory } from "@storybook/react";

export default {
  title: "elements/CodeBlock",
  component: CodeBlock,
};

const Template: ComponentStory<typeof CodeBlock> = (args) => (
  <CodeBlock {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "const x = 1;",
  language: "tsx",
};
