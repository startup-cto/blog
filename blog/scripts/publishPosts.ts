import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { loadToPublishPosts } from "../src/loading-posts/loadToPublishPosts";
import { ToPublishPost } from "../src/data-structure/ToPublishPost/ToPublishPost";
import { toPostFile } from "../src/loading-posts/toPostFile/toPostFile";
import { simpleGit } from "simple-git";

async function publishPosts() {
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

  await updatePosts(postsToPublish, now);
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
}

async function updatePosts(
  postsToPublish: ToPublishPost[],
  publishDate: string
) {
  await Promise.all(
    postsToPublish.map(async (post) => {
      await writeFile(
        join("content", `${post.slug}.md`),
        toPostFile({ ...post, publishedAt: publishDate }, post.content)
      );
    })
  );
}

publishPosts()
  .then(() => console.log("done"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
