import fs from "fs";
import matter from "gray-matter";

export async function loadPost(fileName: string) {
  const file = await fs.promises.readFile(`./content/${fileName}.md`, "utf8");
  const { data, content } = matter(file);
  return { data, content };
}
