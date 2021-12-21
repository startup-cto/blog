import styles from "./PostContent.module.css";
import { MDXRemote } from "next-mdx-remote";
import Script from "next/script";
import { Link } from "../../elements/Link/Link";
import { ComponentProps, PropsWithChildren } from "react";
import { Heading } from "../../elements/Heading/Heading";
import Image from "next/image";
import { Post as PostType } from "../../../helpers/loadPost";

interface Props {
  source: PostType["source"];
}

export function PostContent({ source }: Props) {
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
    <>
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
    </>
  );
}
