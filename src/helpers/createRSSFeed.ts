import { Post } from "./loadPost";
import RSS from "rss";

export function createRSSFeed(posts: Post[]) {
  const feed = new RSS({
    title: "The Startup CTO",
    description: "Building companies with web technology",
    feed_url: "https://startup-cto.net/rss/",
    site_url: "https://startup-cto.net/",
    image_url: "https://startup-cto.net/favicon.png",
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
      custom_elements: [
        {
          "media:content": {
            _attr: { url: "preview_img_url", medium: "image" },
          },
        },
      ],
    })
  );
  return feed.xml();
}
