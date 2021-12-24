import { createRSSFile } from "../src/rss/createRSSFile";

createRSSFile().catch((err) => {
  console.error(err);
  process.exit(1);
});
