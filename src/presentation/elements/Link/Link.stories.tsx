import React from "react";

import { Link } from "./Link";
import { ComponentStory } from "@storybook/react";

export default {
  title: "elements/Link",
  component: Link,
};

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

export const Default = Template.bind({});
Default.args = {
  href: "#",
  children: "Click me",
};
