import { MDXRemote } from "next-mdx-remote";
import { Head } from "../src/components/Head";
import { loadPost, Post as PostType } from "../src/helpers/loadPost";
import { loadPostFileNames } from "../src/helpers/loadPostFileNames";
import { GetStaticProps } from "next";
import Image from "next/image";
import avatar from "../components/avatar.png";
import Link from "next/link";

export default function Post({
  excerpt,
  publishedAt,
  slug,
  source,
  tags,
  title,
  updatedAt,
}: PostType) {
  return (
    <>
      <Head
        description={excerpt}
        imagePath={""}
        publishedAt={publishedAt ? new Date(publishedAt) : undefined}
        slug={slug}
        tags={tags}
        title={title}
        type="article"
        updatedAt={updatedAt ? new Date(updatedAt) : undefined}
      />
      <header>
        <Image src={avatar} alt="The Startup CTO" />
        <Link href="/">Home</Link>
        <Link href="https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton">
          Follow on Twitter
        </Link>
      </header>
      <MDXRemote {...source} />
    </>
  );
}

export async function getStaticPaths() {
  const paths = await loadPostFileNames();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<
  PostType,
  { slug: string }
> = async ({ params }) => {
  const slug = params?.slug ?? "";
  const { source, ...data } = await loadPost(slug);
  return {
    props: {
      source,
      title: data.title,
      excerpt: data.excerpt ?? undefined,
      slug,
      publishedAt: data.publishedAt ?? undefined,
      updatedAt: data.updatedAt ?? undefined,
      tags: data.tags ?? [],
    },
  };
};
