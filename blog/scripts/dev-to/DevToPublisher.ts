import { PublishedPost } from "../../src/data-structure/PublishedPost/PublishedPost";
import fetch from "node-fetch";
import { PostContent } from "../../src/data-structure/PostContent";

const forbiddenTags = ["Meta"];
const onlyAlphaNumericCharacters = /^[\w\d]+$/;

export class DevToPublisher {
  constructor(private origin: string, private apiKey: string) {}
  async publishPost(post: PublishedPost & PostContent) {
    const response = await fetch(`${this.origin}/api/articles`, {
      method: "POST",
      headers: {
        Accept: "application/vnd.forem.api-v1+json",
        "Content-Type": "application/json",
        "api-key": this.apiKey,
      },
      body: JSON.stringify({
        article: {
          title: post.title,
          published: true,
          body_markdown: post.content,
          tags: post.tags
            ?.filter((tag) => tag.match(onlyAlphaNumericCharacters))
            .filter((tag) => !forbiddenTags.includes(tag)),
        },
      }),
    });

    if (response.status !== 201) {
      throw new Error("Could not publish to DevTo", {
        cause: await response.json(),
      });
    }
  }
}
