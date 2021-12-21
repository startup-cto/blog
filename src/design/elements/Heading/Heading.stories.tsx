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

export const All = () => (
  <>
    <Heading variant="h1">Heading 1</Heading>
    <Heading variant="h2">Heading 2</Heading>
    <Heading variant="h3">Heading 3</Heading>
    <Heading variant="h4">Heading 4</Heading>
    <Heading variant="h5">Heading 5</Heading>
  </>
);
