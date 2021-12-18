import { PostMetaData } from "./PostMetaData";
import yaml from "js-yaml";

export class MockFile {
  metaData: PostMetaData;
  content: string;

  constructor({
    metaData = {},
    content = "# Hello World",
  }: {
    metaData?: Partial<PostMetaData>;
    content?: string;
  } = {}) {
    const defaultMetaData: PostMetaData = {
      excerpt: "excerpt",
      slug: "slug",
      tags: [],
      title: "title",
    };
    this.metaData = { ...defaultMetaData, ...metaData };
    this.content = content;
  }

  toString() {
    return `---
${yaml.dump(this.metaData)}---

${this.content}
`;
  }
}
