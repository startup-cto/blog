import { MDXRemote } from "next-mdx-remote";
import { Head } from "../src/components/Head";
import { loadPost } from "../src/helpers/loadPost";
import { loadPostFileNames } from "../src/helpers/loadPostFileNames";

export default function Post({
  excerpt,
  publishedAt,
  slug,
  source,
  tags,
  title,
  updatedAt,
}) {
  return (
    <>
      <Head
        description={excerpt}
        imagePath={""}
        publishedAt={new Date(publishedAt)}
        slug={slug}
        tags={tags}
        title={title}
        type="article"
        updatedAt={new Date(updatedAt)}
      />
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

export async function getStaticProps({ params: { slug } }) {
  const { source, ...data } = await loadPost(slug);
  return {
    props: {
      source,
      title: data.title,
      excerpt: data.excerpt ?? null,
      slug,
      publishedAt: data.publishedAt ?? null,
      updatedAt: data.updatedAt ?? null,
      tags: data.tags ?? [],
    },
  };
}
