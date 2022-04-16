export async function toArray<Item>(
  iterator: AsyncIterableIterator<Item>
): Promise<Item[]> {
  const arr = [];
  for await (const item of iterator) arr.push(item);
  return arr;
}
