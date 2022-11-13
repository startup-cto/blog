import { loadPostFileNames } from "./loadPostFileNames";
import { pageSize } from "./pageSize";

export async function loadPageCount() {
  const names = await loadPostFileNames();
  return Math.ceil(names.length / pageSize);
}
