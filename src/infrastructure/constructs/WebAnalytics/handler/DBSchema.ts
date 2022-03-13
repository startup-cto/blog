interface Required<Type> {
  type: Type;
  rangeKey?: true;
  required: true;
}

export type DBSchema<Type extends {}> = {
  [Key in keyof Type]: Type[Key] extends string
    ? Required<StringConstructor>
    : Type[Key] extends boolean
    ? Required<BooleanConstructor>
    : Type[Key] extends number
    ? Required<NumberConstructor>
    : Type[Key] extends Buffer
    ? Required<BufferConstructor>
    : Type[Key] extends Date
    ? Required<DateConstructor>
    : Type[Key] extends Array<unknown>
    ? Required<ArrayConstructor>
    : Type[Key] extends string | undefined
    ? StringConstructor
    : Type[Key] extends boolean | undefined
    ? BooleanConstructor
    : Type[Key] extends number | undefined
    ? NumberConstructor
    : Type[Key] extends Buffer | undefined
    ? BufferConstructor
    : Type[Key] extends Date | undefined
    ? DateConstructor
    : Type[Key] extends Array<unknown> | undefined
    ? ArrayConstructor
    : never;
};
