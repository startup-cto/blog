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

export const ReallyLong = Template.bind({});
ReallyLong.args = {
  children:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id metus a enim laoreet lobortis vitae vel tortor. Phasellus mollis turpis non tortor vestibulum maximus. Morbi id aliquam mi.",
};
