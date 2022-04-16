import { PublishedPostMock } from "../../src/data-structure/PublishedPost/PublishedPostMock";
import { DevToPublisher } from "./DevToPublisher";
import nock from "nock";

describe("DevToPublisher", () => {
  const apiKey = "test-api-key";
  const origin = "https://dev-to-test-host";

  describe("#publishPost", () => {
    it("sends the post request to the /articles path of the host", async () => {
      const post = new PublishedPostMock();

      const expectedArticle = {
        title: post.title,
        published: true,
        body_markdown: post.content,
        tags: post.tags,
      };
      const postMock = nock(origin)
        .post("/articles", { article: expectedArticle })
        .matchHeader("api-key", apiKey)
        .reply(201);

      const devToPublisher = new DevToPublisher(origin, apiKey);
      await devToPublisher.publishPost(post);
      expect(postMock.isDone()).toBe(true);
    });
  });
});
