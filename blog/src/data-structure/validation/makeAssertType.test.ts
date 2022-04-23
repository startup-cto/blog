import { makeAssertType } from "./makeAssertType";

describe("makeAssertType", () => {
  const fooSchema = {
    const: "foo",
  };

  it("creates a function that returns true for data fitting the schema", () => {
    const assertFoo = makeAssertType(fooSchema);

    expect(() => assertFoo("foo")).not.toThrow();
  });

  it("creates a function that returns false for data not fitting the schema", () => {
    const assertFoo = makeAssertType(fooSchema);

    expect(() => assertFoo("bar")).toThrow();
  });
});
