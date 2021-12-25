import React from "react";

import { ComponentStory } from "@storybook/react";
import { exampleBlogPost } from "../../../fixtures/exampleBlogPost";
import { Post } from "./Post";
import { PublishedPostMock } from "../../../model/PublishedPostMock";

export default {
  title: "templates/Post",
  component: Post,
};

const Template: ComponentStory<typeof Post> = (args) => <Post {...args} />;

export const Default = Template.bind({});
Default.args = {
  post: {
    ...new PublishedPostMock(),
    source: exampleBlogPost,
  },
};
