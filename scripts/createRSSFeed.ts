import { createRSSFile } from "../src/helpers/createRSSFile";

createRSSFile().catch((err) => {
  console.error(err);
  process.exit(1);
});
