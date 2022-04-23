import { makeIs } from "./makeIs";

describe("makeIs", () => {
  const fooSchema = {
    const: "foo",
  };

  it("creates a function that returns true for data fitting the schema", () => {
    const isFoo = makeIs(fooSchema);

    expect(isFoo("foo")).toBe(true);
  });

  it("creates a function that returns false for data not fitting the schema", () => {
    const isFoo = makeIs(fooSchema);

    expect(isFoo("bar")).toBe(false);
  });
});
