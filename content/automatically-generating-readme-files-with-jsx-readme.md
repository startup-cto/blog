---
title: Automatically generating README files with jsx-readme
slug: automatically-generating-readme-files-with-jsx-readme
publishedAt: 2020-09-24T15:52:38.000Z
updatedAt: 2020-09-24T15:52:38.000Z
---
It's the first thing that greets you when you look at an npm package, be it on npm itself or in the source on GitHub: The README.md file. What if, instead of having to update the README file manually whenever your code changes, the README could just stay up-to-date auto-magically?
---

It's the first thing that greets you when you look at an npm package, be it on npm itself or in the source on GitHub: The README.md file. But if you are like me, then writing documentation never was your strong suite - let alone maintaining and updating it.

What if, instead of having to update the README file manually whenever your code changes, the README could just stay up-to-date auto-magically? What if instead of having to remember which badges you need to add, this would all be done for you?

## Introducing jsx-readme

Here's an example of using `jsx-readme`:

```tsx
    // We need to tell the JSX transpiler that in this file,
    // instead of React we use the custom createElement and Fragment
    // functions from jsx-readme
    /* @jsx MD */
    /* @jsxFrag Fragment */
    import type { Component } from "jsx-readme";
    import MD, {
      BadgesFromPkg,
      CodecovBadge,
      DescriptionFromPkg,
      ExamplesFromPkg,
      Fragment,
      GithubWorkflowBadge,
      HomepageFromPkg,
      renderToFile,
      TitleFromPkg,
    } from "jsx-readme";
    import { Heading, InlineCode, LineBreak } from "jsx-md";
    import pkg from "./package.json";

    const Readme: Component = () => (
      <Fragment>
        {/* Create a header with title, badges and description inferred from package.json */}
        <TitleFromPkg pkg={pkg} />
        <BadgesFromPkg pkg={pkg} />
        {/* Add additional badges. */}
        <CodecovBadge pkg={pkg} />
        <GithubWorkflowBadge pkg={pkg} workflowName="Build and deploy" />
        <LineBreak />
        <DescriptionFromPkg pkg={pkg} />
        {/* You can use the components from jsx-md to build custom markdown. */}
        <Heading level={2}>Installation</Heading>
        Add <InlineCode>jsx-readme</InlineCode> to your{" "}
        <InlineCode>devDependencies</InlineCode> and install it. I recommend using
        it with <InlineCode>ts-node</InlineCode>. Then all you need to do is add a
        file like in the example below and run it via{" "}
        <InlineCode>ts-node</InlineCode> whenever you want to create a new version
        of the <InlineCode>README</InlineCode>.
        <LineBreak />
        <LineBreak />
        {/* Create an example section based on all files from the example directory set up in package.json */}
        <ExamplesFromPkg pkg={pkg} />
        {/* Create a section linking to the homepage from package.json */}
        <HomepageFromPkg pkg={pkg} />
      </Fragment>
    );

    void renderToFile("./README.md", <Readme />);
```

As you can see, `jsx-readme` uses a React-like JSX syntax to define Markdown. It is built on top of `jsx-md` which you can also use independently, or together with `jsx-readme`, depending on your needs.

Since JSX is basically JavaScript, we can do in this file whatever we want. In this simple case we just import the local `package.json` file to read from it, but why not e. g. query the GitHub API to figure out who contributed and then adding them to your Readme?

And since it is just a TypeScript file, you can simply run it via e. g. `ts-node` instead of having to learn yet another CLI tool.

## So what does it look like?

The best way to understand the result of the script above is to just look at [the package itself](https://github.com/dbartholomae/jsx-readme/) - `jsx-readme` uses it to create its own README.
