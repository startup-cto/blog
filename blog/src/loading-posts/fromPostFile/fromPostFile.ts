import matter from "gray-matter";
import yaml from "js-yaml";

export function fromPostFile(
  fileContent: string
): Record<string, unknown> & { content: string } {
  const { data, content } = matter(fileContent, {
    engines: {
      yaml: (input) => yaml.load(input, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });
  return { ...data, content };
}
