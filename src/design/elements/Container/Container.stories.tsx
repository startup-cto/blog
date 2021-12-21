import React from "react";

import { Container } from "./Container";
import { ComponentStory } from "@storybook/react";

export default {
  title: "elements/Container",
  component: Container,
};

const Template: ComponentStory<typeof Container> = (args) => (
  <Container {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "some content",
};
