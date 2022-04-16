import React from "react";

import { ComponentStory } from "@storybook/react";
import { Analytics } from "./Analytics";

export default {
  title: "templates/Analytics",
  component: Analytics,
};

const Template: ComponentStory<typeof Analytics> = () => <Analytics />;

export const Default = Template.bind({});
