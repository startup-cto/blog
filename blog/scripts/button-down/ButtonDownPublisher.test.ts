import { PublishedPostMock } from "../../src/data-structure/PublishedPost/PublishedPostMock";
import nock from "nock";
import { ButtonDownPublisher } from "./ButtonDownPublisher";

describe("ButtonDownPublisher", () => {
  const apiKey = "test-api-key";
  const origin = "https://api.buttondown.email";

  describe("#publishPost", () => {
    it("sends the post request to the /v1/emails path of the host", async () => {
      const post = new PublishedPostMock();

      const postMock = nock(origin)
        .post("/v1/emails", {
          subject: `The Startup CTO - ${post.title}`,
          body: post.content,
          included_tags: post.tags,
          email_type: "public",
        })
        .matchHeader("Authorization", `Token ${apiKey}`)
        .reply(201);

      const buttonDownPublisher = new ButtonDownPublisher(origin, apiKey);
      await buttonDownPublisher.publishPost(post);

      expect(postMock.isDone()).toBe(true);
    });
  });
});
