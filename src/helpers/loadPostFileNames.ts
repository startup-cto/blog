import fs from "fs";

export async function loadPostFileNames() {
  const files = await fs.promises.readdir("./content");
  return files
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((path) => `/${path}`);
}
