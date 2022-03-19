import { toArray } from "./toArray";

describe("toArray", () => {
  it("converts an AsyncIterableIterator to its values", async () => {
    const iterator: AsyncIterableIterator<number> = (async function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
    })();

    expect(await toArray(iterator)).toEqual([1, 2, 3, 4]);
  });
});
