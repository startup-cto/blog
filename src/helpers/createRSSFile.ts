import { mkdir, writeFile } from "fs/promises";

export async function createRSSFile() {
  await createDirUnlessExists("public");
  await writeFile("public/rss.xml", "");
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
