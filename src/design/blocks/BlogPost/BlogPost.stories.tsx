import React from "react";

import { BlogPost } from "./BlogPost";
import { ComponentStory } from "@storybook/react";
import { exampleBlogPost } from "../../../fixtures/exampleBlogPost";

export default {
  title: "blocks/BlogPost",
  component: BlogPost,
};

const Template: ComponentStory<typeof BlogPost> = (args) => (
  <BlogPost {...args} />
);

export const Default = Template.bind({});
Default.args = {
  post: {
    title: "Blog title",
    publishedAt: "2020-01-01",
    source: exampleBlogPost,
    tags: ["Tag 1"],
  },
};
