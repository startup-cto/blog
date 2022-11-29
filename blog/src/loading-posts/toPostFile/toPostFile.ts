import { PublishedPost } from "../../data-structure/PublishedPost/PublishedPost";

export function toPostFile(post: PublishedPost, content: string) {
  return `---
title: ${post.title}
slug: ${post.slug}
publishedAt: ${post.publishedAt}
tags:${
    post.tags === undefined || post.tags.length === 0
      ? " []"
      : `
${post.tags.map((tag) => `- ${tag}`).join("\n")}`
  }
excerpt: >
  ${post.excerpt}
---
${content}`;
}
