import React from "react";

import { PostHeader } from "./PostHeader";
import { ComponentStory } from "@storybook/react";

export default {
  title: "blocks/PostHeader",
  component: PostHeader,
};

const Template: ComponentStory<typeof PostHeader> = (args) => (
  <PostHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  post: {
    title: "Blog title",
    publishedAt: "2020-01-01",
    tags: [],
  },
};
