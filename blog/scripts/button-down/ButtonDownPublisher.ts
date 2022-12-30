import type { PublishedPost } from "../../src/data-structure/PublishedPost/PublishedPost";
import type { PostContent } from "../../src/data-structure/PostContent";
import fetch from "node-fetch";

export class ButtonDownPublisher {
  constructor(private origin: string, private apiKey: string) {}

  async publishPost(post: PublishedPost & PostContent) {
    await fetch(`${this.origin}/v1/emails`, {
      body: JSON.stringify({
        subject: `The Startup CTO - ${post.title}`,
        body: post.content,
        email_type: "public",
      }),
      method: "post",
      headers: {
        Authorization: `Token ${this.apiKey}`,
      },
    });
  }
}
