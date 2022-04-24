import { makeEnsureType } from "./makeEnsureType";

describe("makeEnsureType", () => {
  const fooSchema = {
    const: "foo",
  };

  it("creates a function that returns the data for data fitting the schema", () => {
    const ensureFoo = makeEnsureType(fooSchema);

    expect(ensureFoo("foo")).toBe("foo");
  });

  it("creates a function that throws for data not fitting the schema", () => {
    const ensureFoo = makeEnsureType(fooSchema);

    expect(() => ensureFoo("bar")).toThrow();
  });

  describe("with ajvOption coerceType", () => {
    it("creates a function that converts the data for data fitting after coercion", () => {
      const coerceSchema = {
        type: "object",
        properties: { num: { type: "number" } },
      } as const;
      const ensureCoerce = makeEnsureType(coerceSchema, { coerceTypes: true });

      expect(ensureCoerce({ num: "5" })).toEqual({ num: 5 });
    });

    it("creates a function that does not change original data after coercion", () => {
      const coerceSchema = {
        type: "object",
        properties: { num: { type: "number" } },
      } as const;
      const ensureCoerce = makeEnsureType(coerceSchema, { coerceTypes: true });
      const data = { num: "5" };
      ensureCoerce(data);

      expect(data).toEqual({ num: "5" });
    });
  });
});
