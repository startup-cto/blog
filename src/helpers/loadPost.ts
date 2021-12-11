import fs from "fs";
import matter from "gray-matter";
import yaml from "js-yaml";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { assertPostMetaData, PostMetaData } from "./PostMetaData";

export interface Post extends PostMetaData {
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
  return { ...data, source: await serialize(content) };
}
