import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { assertPostMetaData, PostMetaData } from "./PostMetaData";

interface Post extends PostMetaData {
  source: MDXRemoteSerializeResult;
}

export async function loadPost(fileName: string): Promise<Post> {
  const file = await fs.promises.readFile(`./content/${fileName}.md`, "utf8");
  const { data, content } = matter(file);
  assertPostMetaData(data);
  return { ...data, source: await serialize(content) };
}
