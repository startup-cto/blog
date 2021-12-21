import React from "react";

import { HorizontalList } from "./HorizontalList";

export default {
  title: "Elements/HorizontalList",
  component: HorizontalList,
};

export const Default = () => (
  <HorizontalList>
    <span>Child 1</span>
    <span>Child 2</span>
  </HorizontalList>
);
