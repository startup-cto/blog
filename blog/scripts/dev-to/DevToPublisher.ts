import { PublishedPost } from "../../src/data-structure/PublishedPost/PublishedPost";
import fetch from "node-fetch";
import { PostContent } from "../../src/data-structure/PostContent";

export class DevToPublisher {
  constructor(private origin: string, private apiKey: string) {}

  async publishPost(post: PublishedPost & PostContent) {
    await fetch(`${this.origin}/api/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": this.apiKey,
      },
      body: JSON.stringify({
        article: {
          title: post.title,
          published: true,
          body_markdown: post.content,
          tags: post.tags,
        },
      }),
    });
  }
}
