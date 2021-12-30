import { createRSSFile } from "../src/rss";

createRSSFile().catch((err) => {
  console.error(err);
  process.exit(1);
});
