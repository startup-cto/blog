import { MDXRemote } from "next-mdx-remote";
import { Head } from "../src/components/Head";
import { loadPost } from "../src/helpers/loadPost";
import { loadPostFileNames } from "../src/helpers/loadPostFileNames";

export default function Post({ source, title }) {
  return (
    <>
      <Head title={title} />
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
  const { data, source } = await loadPost(slug);
  return { props: { source, title: data.title } };
}
