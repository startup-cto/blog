import RSS from "rss";
import { PostSummaryType } from "../model/PostSummaryType";

export function createRSSFeed(posts: PostSummaryType[]) {
  const feed = new RSS({
    title: "The Startup CTO",
    description: "Building companies with web technology",
    feed_url: "https://startup-cto.net/rss/",
    site_url: "https://startup-cto.net/",
    image_url: "https://startup-cto.net/rss-icon.png",
    ttl: 60,
    custom_namespaces: {
      content: "https://purl.org/rss/1.0/modules/content/",
      media: "https://search.yahoo.com/mrss/",
    },
  });
  posts.forEach((post) =>
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `https://startup-cto.net/${post.slug}/`,
      categories: post.tags,
      date: post.publishedAt!,
      author: "Daniel Bartholomae",
      ...(post.previewImage && {
        custom_elements: [
          {
            "media:content": {
              _attr: {
                url: `https://startup-cto.net${post.previewImage}`,
                medium: "image",
              },
            },
          },
        ],
      }),
    })
  );
  return feed.xml();
}
