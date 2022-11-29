import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { readdir } from "fs/promises";
import { assertPost, Post } from "../data-structure/Post";
import { PostSource } from "../data-structure/PostSource";
import { PostContent } from "../data-structure/PostContent";
import { fromPostFile } from "./fromPostFile/fromPostFile";

export async function loadPost(
  fileName: string
): Promise<Post & PostSource & PostContent> {
  const file = await fs.promises.readFile(`./content/${fileName}.md`, "utf8");
  const { content, ...postWithoutImage } = fromPostFile(file);
  const previewImage = await loadPreviewImage(postWithoutImage.slug as string);
  const post = { ...postWithoutImage, previewImage };
  assertPost(post);
  return { ...post, content, source: await serialize(content) };
}

async function loadPreviewImage(slug: string): Promise<string | undefined> {
  const paths = await readdir("./public/images/teaser");
  const filename = paths.find((path) => path.includes(slug));
  return filename ? `/images/teaser/${filename}` : undefined;
}
