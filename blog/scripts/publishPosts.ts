import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { loadToPublishPosts } from "../src/loading-posts/loadToPublishPosts";
import { ToPublishPost } from "../src/data-structure/ToPublishPost/ToPublishPost";
import { toPostFile } from "../src/loading-posts/toPostFile/toPostFile";
import { simpleGit } from "simple-git";
import { DevToPublisher } from "./dev-to/DevToPublisher";

async function publishPosts() {
  if (!process.env.DEV_TO_API_KEY) {
    throw new TypeError("DEV_TO_API_KEY not set");
  }

  const postsToPublish = await loadToPublishPosts();
  const postCount = postsToPublish.length;
  if (postCount === 0) {
    console.log("No posts to publish");
    return;
  }
  const now = new Date().toISOString();
  console.log(
    `Publishing ${postCount} post${postCount > 1 ? "s" : ""} at ${now}`
  );

  const updatedPosts = await updatePosts(postsToPublish, now);
  const git = simpleGit();
  console.log("Preparing commit...");
  await git.add(
    postsToPublish.map((post) => join("content", `${post.slug}.md`))
  );
  await git.commit("Add publish date to published posts [skip-ci]");
  console.log("Changes committed");
  console.log("Preparing push...");
  await git.push();
  console.log("Changes pushed");

  console.log("Publishing post to dev.to...");
  const devToPublisher = new DevToPublisher(
    "https://dev.to",
    process.env.DEV_TO_API_KEY
  );
  await Promise.all(
    updatedPosts.map((post) => devToPublisher.publishPost(post))
  );
}

async function updatePosts(
  postsToPublish: ToPublishPost[],
  publishDate: string
) {
  const updatedPosts = postsToPublish.map((post) => ({
    ...post,
    publishedAt: publishDate,
  }));
  await Promise.all(
    updatedPosts.map(async (post) => {
      await writeFile(
        join("content", `${post.slug}.md`),
        toPostFile(post, post.content)
      );
    })
  );
  return updatedPosts;
}

publishPosts()
  .then(() => console.log("done"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
