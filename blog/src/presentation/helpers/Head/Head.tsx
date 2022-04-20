import NextHead from "next/head";

interface Props {
  imagePath?: string;
  publishedAt?: Date;
  description: string;
  slug: string;
  tags?: string[];
  title: string;
  type: "website" | "article";
}

const author = "Daniel Bartholomae";
const siteName = "The Startup CTO";
const baseUrl = `https://startup-cto.net/`;
const twitterHandle = "@the_startup_cto";
const imageWidth = 2553;
const imageHeight = 1126;
const logoUrl =
  "http://startup-cto.net/content/images/2021/03/Avatar-240x240.jpg";
const logoWidth = 60;
const logoHeight = 60;
const profilePictureUrl =
  "http://startup-cto.net/content/images/2020/08/2015-08-20-15.06.07-quadratisch-1.jpg";
const profilePictureWidth = 993;
const profilePictureHeight = 993;
const authorUrl = "http://twitter.com/the_startup_cto";
const assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Head({
  imagePath,
  publishedAt,
  description,
  slug,
  tags,
  title,
  type,
}: Props) {
  const postUrl = `${baseUrl}${slug}${slug === "" ? "" : "/"}`;
  const imageUrl = imagePath && `${baseUrl}${imagePath}`;
  const updatedAt = publishedAt;

  return (
    <NextHead>
      <meta httpEquiv="Content-Type" content="text/html" charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />

      <title>{title}</title>

      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link rel="icon" href={`${assetPrefix}/favicon.ico`} />
      <link rel="canonical" href={postUrl} />
      <link
        rel="alternate"
        type="application/rss+xml"
        title={siteName}
        href={`${baseUrl}rss.xml`}
      />
      <meta name="referrer" content="no-referrer-when-downgrade" />

      <meta name="description" content={description} />

      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={postUrl} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {publishedAt && (
        <meta
          property="article:published_time"
          content={publishedAt.toISOString()}
        />
      )}
      {updatedAt && (
        <meta
          property="article:modified_time"
          content={updatedAt.toISOString()}
        />
      )}
      {tags && (
        <>
          {tags.map((tag) => (
            <meta property="article:tag" content={tag} key={tag} />
          ))}
        </>
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={postUrl} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content={author} />
      {tags && (
        <>
          <meta name="twitter:label2" content="Filed under" />
          <meta name="twitter:data2" content={tags.join(", ")} />
        </>
      )}
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      {imageUrl && (
        <>
          <meta property="og:image:width" content={imageWidth.toString()} />
          <meta property="og:image:height" content={imageHeight.toString()} />
        </>
      )}

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === "article" ? "Article" : "WebSite",
          publisher: {
            "@type": "Organization",
            name: siteName,
            url: baseUrl,
            logo: {
              "@type": "ImageObject",
              url: logoUrl,
              width: logoWidth,
              height: logoHeight,
            },
          },
          author: {
            "@type": "Person",
            name: author,
            image: {
              "@type": "ImageObject",
              url: profilePictureUrl,
              width: profilePictureWidth,
              height: profilePictureHeight,
            },
            url: authorUrl,
          },
          headline: title,
          url: postUrl,
          ...(publishedAt && { datePublished: publishedAt.toISOString() }),
          ...(updatedAt && { dateModified: updatedAt.toISOString() }),
          ...(imageUrl && {
            image: {
              "@type": "ImageObject",
              url: imageUrl,
              width: imageWidth,
              height: imageHeight,
            },
          }),
          ...(tags && { keywords: tags.join(", ") }),
          description,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": baseUrl,
          },
        })}
      </script>
    </NextHead>
  );
}
