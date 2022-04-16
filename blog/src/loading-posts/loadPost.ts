import fs from "fs";
import matter from "gray-matter";
import yaml from "js-yaml";
import { serialize } from "next-mdx-remote/serialize";
import { readdir } from "fs/promises";
import { assertPost, Post } from "../data-structure/Post";
import { PostSource } from "../data-structure/PostSource";
import { PostContent } from "../data-structure/PostContent";

export async function loadPost(
  fileName: string
): Promise<Post & PostSource & PostContent> {
  const file = await fs.promises.readFile(`./content/${fileName}.md`, "utf8");
  const { data, content } = matter(file, {
    engines: {
      yaml: (input) => yaml.load(input, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });
  const previewImage = await loadPreviewImage(data.slug);
  const post = { ...data, content, previewImage };
  assertPost(post);
  return { ...post, content, source: await serialize(content) };
}

async function loadPreviewImage(slug: string): Promise<string | undefined> {
  const paths = await readdir("./public/images/teaser");
  const filename = paths.find((path) => path.includes(slug));
  return filename ? `/images/teaser/${filename}` : undefined;
}
