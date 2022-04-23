import { makeIsType } from "./makeIsType";

describe("makeIsType", () => {
  const fooSchema = {
    const: "foo",
  };

  it("creates a function that returns true for data fitting the schema", () => {
    const isFoo = makeIsType(fooSchema);

    expect(isFoo("foo")).toBe(true);
  });

  it("creates a function that returns false for data not fitting the schema", () => {
    const isFoo = makeIsType(fooSchema);

    expect(isFoo("bar")).toBe(false);
  });
});
