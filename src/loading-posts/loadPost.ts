import fs from "fs";
import matter from "gray-matter";
import yaml from "js-yaml";
import { serialize } from "next-mdx-remote/serialize";
import { readdir } from "fs/promises";
import { PublishedPost } from "../data-structure/PublishedPost/PublishedPost";
import { DraftPost } from "../data-structure/DraftPost/DraftPost";
import { assertPost } from "../data-structure/Post";
import { PostSource } from "../data-structure/PostSource";

export async function loadPost(
  fileName: string
): Promise<(DraftPost | PublishedPost) & PostSource> {
  const file = await fs.promises.readFile(`./content/${fileName}.md`, "utf8");
  const { data, content, excerpt } = matter(file, {
    engines: {
      yaml: (input) => yaml.load(input, { schema: yaml.JSON_SCHEMA }) as object,
    },
    excerpt: true,
  });
  const previewImage = await loadPreviewImage(data.slug);
  const post = { ...data, content, excerpt, previewImage };
  assertPost(post);
  return { ...post, source: await serialize(content) };
}

async function loadPreviewImage(slug: string): Promise<string | undefined> {
  const paths = await readdir("./public/images/teaser");
  const filename = paths.find((path) => path.includes(slug));
  return filename ? `/images/teaser/${filename}` : undefined;
}
