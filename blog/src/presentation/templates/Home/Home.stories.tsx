import React from "react";

import { ComponentStory } from "@storybook/react";
import { Home } from "./Home";
import { PublishedPostMock } from "../../../data-structure/PublishedPost/PublishedPostMock";

export default {
  title: "templates/Home",
  component: Home,
};

const Template: ComponentStory<typeof Home> = (args) => <Home {...args} />;

export const Default = Template.bind({});
Default.args = {
  posts: Array.from({ length: 10 }).map(() => new PublishedPostMock()),
  currentPage: 1,
  pageCount: 10,
};
