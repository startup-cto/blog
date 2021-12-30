import { createRSSFile } from "./rss";

createRSSFile().catch((err) => {
  console.error(err);
  process.exit(1);
});
