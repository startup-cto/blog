import { DraftPost } from "./DraftPost";
import yaml from "js-yaml";

export class DraftPostMock implements DraftPost {
  draft: true = true;
  content?: string = "";
  excerpt?: string;
  previewImage?: string;
  publishedAt?: string;
  slug?: string;
  tags?: string[];
  title?: string;
  updatedAt?: string;

  constructor(override: Partial<DraftPost> = {}) {
    Object.assign(this, override);
  }
  toString() {
    const { content, excerpt, previewImage, ...metaData } = this;
    return `---
${yaml.dump(metaData)}---${
      excerpt
        ? `
${excerpt}}---
`
        : ""
    }${content}
`;
  }
}
