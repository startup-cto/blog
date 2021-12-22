import { MockPost } from "./MockPost";

describe("MockPost", () => {
  it("returns default file contents as a string", () => {
    expect(new MockPost().toString()).toBe(`---
slug: slug
tags: []
title: title
---
excerpt
---

# Hello World
`);
  });
});
