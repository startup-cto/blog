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

  describe("with ajvOption coerceType", () => {
    it("creates a function that does not throw for data fitting after coercion", () => {
      const coerceSchema = { type: "number" } as const;
      const assertCoerce = makeAssertType(coerceSchema, { coerceTypes: true });

      expect(() => assertCoerce("5")).not.toThrow();
    });
  });
});
