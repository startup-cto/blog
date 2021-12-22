import { isDraftPost } from "./DraftPost";
import { DraftPostMock } from "./DraftPostMock";

describe("DraftPostMock", () => {
  it("is a DraftPost", () => {
    expect(isDraftPost(new DraftPostMock())).toBe(true);
  });
});
