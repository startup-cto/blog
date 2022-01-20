import { PublishedPost } from "./PublishedPost";
import yaml from "js-yaml";
import { v4 as uuid } from "uuid";

export class PublishedPostMock implements PublishedPost {
  content: string =
    'Nowadays, only a few professional developers are left that seriously doubt the value of test-driven-development and test-driven-design (tdd). But the reality of many codebases I have seen is that tdd is often limited to the backend, where the "business logic" lives...';
  excerpt: string =
    "Only few professional developers seriously doubt the value of tdd. But in reality, tdd is often limited to the backend. Part of it is due to missing skills on how to tdd in the frontend.";
  previewImage: string = "images/teaser/tdd-in-a-react-frontend.png";
  slug: string = "tdd-in-a-react-frontend";
  tags: string[] = ["React", "tdd"];
  title: string = "TDD in a React frontend";
  publishedAt: string = "2021-01-19T22:32:26.000Z";
  updatedAt: string = "2021-01-19T22:40:10.000Z";
  fileName = `/draftFile-${uuid()}.md`;

  constructor(override: Partial<PublishedPost> = {}, content?: string) {
    Object.assign(this, override);
    this.content = content ?? this.content;
  }

  toString() {
    const { content, fileName, previewImage, ...metaData } = this;
    return `---
${yaml.dump(metaData)}---
${content}`;
  }
}
