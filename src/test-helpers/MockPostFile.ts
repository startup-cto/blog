import { PostMetaData } from "../helpers/PostMetaData";
import yaml from "js-yaml";

export class MockPostFile {
  metaData: PostMetaData;
  content: string;
  name: string;

  constructor({
    metaData = {},
    content = "# Hello World",
    name = "file-name",
  }: {
    metaData?: Partial<PostMetaData>;
    content?: string;
    name?: string;
  } = {}) {
    const defaultMetaData: PostMetaData = {
      draft: false,
      excerpt: "excerpt",
      slug: "slug",
      tags: [],
      title: "title",
    };
    this.metaData = { ...defaultMetaData, ...metaData };
    this.content = content;
    this.name = name;
  }

  toString() {
    const { draft, ...metaData } = this.metaData;
    return `---
${yaml.dump(draft ? { ...metaData, draft } : metaData)}---

${this.content}
`;
  }
}
