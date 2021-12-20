import fs from "fs";
import matter from "gray-matter";
import yaml from "js-yaml";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { assertPostMetaData, PostMetaData } from "./PostMetaData";
import { readdir } from "fs/promises";

export interface Post extends PostMetaData {
  previewImage?: string;
  source: MDXRemoteSerializeResult;
}

export async function loadPost(fileName: string): Promise<Post> {
  const file = await fs.promises.readFile(`./content/${fileName}.md`, "utf8");
  const { data, content } = matter(file, {
    engines: {
      yaml: (input) => yaml.load(input, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });
  assertPostMetaData(data);
  const previewImage = await loadPreviewImage(data.slug);
  return { ...data, previewImage, source: await serialize(content) };
}

async function loadPreviewImage(slug: string): Promise<string | undefined> {
  const paths = await readdir("./public/images/teaser");
  const filename = paths.find((path) => path.includes(slug));
  return filename ? `/images/teaser/${filename}` : undefined;
}
