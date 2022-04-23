import { makeAssert } from "./makeAssert";

describe("makeAssert", () => {
  const fooSchema = {
    const: "foo",
  };

  it("creates a function that returns true for data fitting the schema", () => {
    const assertFoo = makeAssert(fooSchema);

    expect(() => assertFoo("foo")).not.toThrow();
  });

  it("creates a function that returns false for data not fitting the schema", () => {
    const assertFoo = makeAssert(fooSchema);

    expect(() => assertFoo("bar")).toThrow();
  });
});
