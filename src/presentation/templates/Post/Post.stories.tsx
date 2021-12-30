import React from "react";

import { ComponentStory } from "@storybook/react";
import { exampleBlogPost } from "../../../test-helpers";
import { Post } from "./Post";
import { PublishedPostMock } from "../../../data-structure/PublishedPost/PublishedPostMock";

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
