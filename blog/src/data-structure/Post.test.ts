import { assertPost } from "./Post";

describe("Post", () => {
  describe("assertPost", () => {
    it("rejects an empty object", () => {
      expect(() => assertPost({})).toThrow();
    });

    it("accepts a draft post", () => {
      expect(() => assertPost({ draft: true })).not.toThrow();
    });
  });
});
