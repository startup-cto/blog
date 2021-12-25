import React from "react";

import { BlogPost } from "./BlogPost";
import { ComponentStory } from "@storybook/react";
import { exampleBlogPost } from "../../../fixtures/exampleBlogPost";
import { PublishedPostMock } from "../../../model/PublishedPostMock";

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
    ...new PublishedPostMock(),
    source: exampleBlogPost,
  },
};
