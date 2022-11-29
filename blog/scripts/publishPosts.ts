import { loadToPublishPosts } from "../src/loading-posts/loadToPublishPosts";

async function publishPosts() {
  const postsToPublish = await loadToPublishPosts();
  if (postsToPublish.length === 0) {
    console.log("No posts to publish");
    return;
  }
}

publishPosts()
  .then(() => console.log("done"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
