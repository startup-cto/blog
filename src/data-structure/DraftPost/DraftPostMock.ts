import { DraftPost } from "./DraftPost";
import yaml from "js-yaml";
import { v4 as uuid } from "uuid";

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
  fileName = `/draftFile-${uuid()}.md`;

  constructor(override: Partial<DraftPost> = {}) {
    Object.assign(this, override);
  }
  toString() {
    const { content, previewImage, ...metaData } = this;
    return `---
${yaml.dump(metaData)}---
${content}
`;
  }
}
