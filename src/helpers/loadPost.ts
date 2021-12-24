import fs from "fs";
import matter from "gray-matter";
import yaml from "js-yaml";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { PostMetaData } from "./PostMetaData";
import { readdir } from "fs/promises";
import { PublishedPost } from "../model/PublishedPost";
import { DraftPost } from "../model/DraftPost";
import { assertPost } from "../model/Post";

export interface Post extends PostMetaData {
  previewImage?: string;
  source: MDXRemoteSerializeResult;
}

export async function loadPost(
  fileName: string
): Promise<(DraftPost | PublishedPost) & { source: MDXRemoteSerializeResult }> {
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
