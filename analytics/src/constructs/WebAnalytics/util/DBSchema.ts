interface SchemaType<Type> {
  type: Type;
  keyType?: "HASH" | "RANGE";
}

export type DBSchema<Type extends Record<string, unknown>> = {
  [Key in keyof Type]: Type[Key] extends string | undefined
    ? SchemaType<"String">
    : Type[Key] extends boolean | undefined
    ? SchemaType<"Boolean">
    : Type[Key] extends number | undefined
    ? SchemaType<"Number">
    : Type[Key] extends Date | undefined
    ? SchemaType<"Date">
    : Type[Key] extends `${string}`
    ? SchemaType<"String">
    : never;
};
