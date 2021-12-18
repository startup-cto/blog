import { PostMetaData } from "./PostMetaData";
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
    return `---
${yaml.dump(this.metaData)}---

${this.content}
`;
  }
}
