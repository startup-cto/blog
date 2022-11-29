import { toPostFile } from "./toPostFile";

describe("toPostFile", () => {
  it("converts an object into a file string", () => {
    expect(
      toPostFile(
        {
          title:
            "Which no-code tools should you be using at your early-stage startup",
          slug: "which-no-code-tools-should-you-be-using-at-your-early-stage-startup",
          tags: ["Tag 1", "Tag 2"],
          publishedAt: "2020-09-24T15:52:38.000Z",
          excerpt:
            "Which no-code tools should you be using at your early-stage startup?",
        },
        "Content"
      )
    ).toBe(`---
title: Which no-code tools should you be using at your early-stage startup
slug: which-no-code-tools-should-you-be-using-at-your-early-stage-startup
publishedAt: 2020-09-24T15:52:38.000Z
tags:
- Tag 1
- Tag 2
excerpt: >
  Which no-code tools should you be using at your early-stage startup?
---
Content`);
  });
});
