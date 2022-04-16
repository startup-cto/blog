import yaml from "js-yaml";
import { ToPublishPost } from "./ToPublishPost";

export class ToPublishPostMock implements ToPublishPost {
  content: string =
    'Nowadays, only a few professional developers are left that seriously doubt the value of test-driven-development and test-driven-design (tdd). But the reality of many codebases I have seen is that tdd is often limited to the backend, where the "business logic" lives...';
  excerpt: string =
    "Only few professional developers seriously doubt the value of tdd. But in reality, tdd is often limited to the backend. Part of it is due to missing skills on how to tdd in the frontend.";
  previewImage: string = "/images/teaser/tdd-in-a-react-frontend.png";
  slug: string = "tdd-in-a-react-frontend";
  tags: string[] = ["React", "tdd"];
  title: string = "TDD in a React frontend";

  constructor(override: Partial<ToPublishPost> = {}, content?: string) {
    Object.assign(this, override);
    this.content = content ?? this.content;
  }

  toString() {
    const { content, previewImage, ...metaData } = this;
    return `---
${yaml.dump(metaData)}---
${content}`;
  }
}
