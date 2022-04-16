import { mkdir, writeFile } from "fs/promises";
import { loadPostSummaries } from "../../src/loading-posts/loadPostSummaries";
import { createRSSFeed } from "./createRSSFeed";

export async function createRSSFile() {
  const postSummaries = await loadPostSummaries();
  const rss = createRSSFeed(postSummaries);
  await createDirUnlessExists("public");
  await writeFile("public/rss.xml", rss);
}

async function createDirUnlessExists(dir: string) {
  try {
    await mkdir(dir);
  } catch (err) {
    if (err && (err as any).code !== "EEXIST") {
      throw err;
    }
  }
}
