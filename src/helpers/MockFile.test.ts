import { MockFile } from "./MockFile";

describe("MockFile", () => {
  it("returns default file contents as a string", () => {
    expect(new MockFile().toString()).toBe(`---
excerpt: excerpt
slug: slug
tags: []
title: title
---

# Hello World
`);
  });
});
