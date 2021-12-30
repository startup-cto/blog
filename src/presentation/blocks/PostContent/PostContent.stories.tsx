import React from "react";

import { PostContent } from "./PostContent";
import { ComponentStory } from "@storybook/react";
import { exampleBlogPost } from "../../../test-helpers/exampleBlogPost";

export default {
  title: "blocks/PostContent",
  component: PostContent,
};

const Template: ComponentStory<typeof PostContent> = (args) => (
  <PostContent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  source: exampleBlogPost,
};
