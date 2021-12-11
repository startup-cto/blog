import React from "react";

import { PostSummary } from "./PostSummary";
import { ComponentStory } from "@storybook/react";

export default {
  title: "Components/PostSummary",
  component: PostSummary,
};

const Template: ComponentStory<typeof PostSummary> = (args) => (
  <PostSummary {...args} />
);

export const Default = Template.bind({});
Default.args = {
  post: {
    slug: "test",
    title: "Blog title",
    excerpt: "Blog excerpt",
    publishedAt: "2020-01-01",
    tags: [],
  },
};
