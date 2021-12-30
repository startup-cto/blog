import { PublishedPost } from "../../src/data-structure/PublishedPost/PublishedPost";
import fetch from "node-fetch";

export class DevToPublisher {
  constructor(private origin: string, private apiKey: string) {}

  async publishPost(post: PublishedPost) {
    await fetch(`${this.origin}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": this.apiKey,
      },
      body: JSON.stringify({
        title: post.title,
        body_markdown: "",
        tags: post.tags,
      }),
    });
  }
}
