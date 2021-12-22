import { MockPostFile } from "./MockPostFile";

describe("MockPostFile", () => {
  it("returns default file contents as a string", () => {
    expect(new MockPostFile().toString()).toBe(`---
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
