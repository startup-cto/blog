import React from "react";

import { ComponentStory } from "@storybook/react";
import { exampleBlogPost } from "../components/exampleBlogPost";
import { Post } from "./Post";

export default {
  title: "Pages/Post",
  component: Post,
};

const Template: ComponentStory<typeof Post> = (args) => <Post {...args} />;

export const Default = Template.bind({});
Default.args = {
  post: {
    title: "Blog title",
    publishedAt: "2020-01-01",
    excerpt: "Blog excerpt",
    slug: "blog-slug",
    source: exampleBlogPost,
    tags: [],
  },
};
