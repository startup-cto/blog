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

  describe("with ajvOption coerceType", () => {
    it("creates a function that returns true for data fitting after coercion", () => {
      const coerceSchema = { type: "number" } as const;
      const isCoerce = makeIsType(coerceSchema, { coerceTypes: true });

      expect(isCoerce("5")).toBe(true);
    });
  });
});
