import { DraftPost } from "./DraftPost";

export class DraftPostMock implements DraftPost {
  draft: true = true;
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
}
