import { Post as PostType } from "../../../helpers/loadPost";
import { MDXRemote } from "next-mdx-remote";
import styles from "./BlogPost.module.css";
import "prismjs/themes/prism-tomorrow.css";
import Script from "next/script";
import Image from "next/image";
import { ComponentProps, PropsWithChildren } from "react";
import { Link } from "../../elements/Link/Link";
import { Heading } from "../../elements/Heading/Heading";

export function BlogPost({
  post: { publishedAt, source, tags, title },
}: {
  post: Pick<PostType, "publishedAt" | "source" | "tags" | "title">;
}) {
  const components = {
    a: Link,
    h1: ({ children }: PropsWithChildren<{}>) => (
      <Heading variant="h1">{children}</Heading>
    ),
    h2: ({ children }: PropsWithChildren<{}>) => (
      <Heading variant="h2">{children}</Heading>
    ),
    h3: ({ children }: PropsWithChildren<{}>) => (
      <Heading variant="h3">{children}</Heading>
    ),
    h4: ({ children }: PropsWithChildren<{}>) => (
      <Heading variant="h4">{children}</Heading>
    ),
    h5: ({ children }: PropsWithChildren<{}>) => (
      <Heading variant="h5">{children}</Heading>
    ),
    img: (props: ComponentProps<typeof Image>) => (
      <Image {...props} width={800} height={640} unoptimized />
    ),
  };
  return (
    <main className={styles.container}>
      {publishedAt && (
        <time dateTime={publishedAt} className={styles.publishDate}>
          {new Date(publishedAt).toLocaleDateString()}
        </time>
      )}
      {tags && <span className={styles.tags}>{tags.join(", ")}</span>}
      <Heading variant="h1">{title}</Heading>
      <div className={styles.content}>
        <MDXRemote {...source} components={components} />
      </div>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/prism.min.js"
        async
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/plugins/autoloader/prism-autoloader.min.js"
        async
      />
      <Script
        async
        id="start-prism"
      >{`setTimeout(function(){Prism.highlightAll();},100)`}</Script>
    </main>
  );
}
