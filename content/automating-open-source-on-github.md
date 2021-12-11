---
title: Automating Open-Source on GitHub
slug: automating-open-source-on-github
publishedAt: 2021-01-08T20:54:19.000Z
updatedAt: 2021-01-08T20:54:19.000Z
tags:
- Open source
- GitHub
excerpt: Maintaining open source is a noble, but can be time-consuming endeavor. It doesn't have to be, though. During Hacktoberfest 2020 I used one of my repositories to experiment with automation around contribution and maintenance of jsx-readme. This is what I learned.
---

Maintaining open source is a noble, but can be time-consuming endeavor. It doesn't have to be, though. During Hacktoberfest 2020 I used one of my repositories to experiment with automation around contribution and maintenance of [jsx-readme](https://github.com/dbartholomae/jsx-readme). This is what I learned.

## Make it easy to contribute

The benefit of open-source project is that whenever someone has a feature request or finds a bug, they can fix it themselves by raising a PR. At least in theory. In practice, it is really hard to contribute to many of the open-source projects out there. To be able to contribute, you need to

- understand the codebase,
- make it run locally, and
- know which standards to adhere to.

All of this becomes significantly simpler with a good `CONTRIBUTING.md`. I've looked through multiple, both from big as well as small projects, and created [a simple one](https://github.com/dbartholomae/jsx-readme/blob/main/CONTRIBUTING.md).

But this is not all. The code should also be structured so that it is easy to understand, and well tested so that contributors can be sure they didn't break anything.

Furthermore, having as many rules as possible codified in an automated fashion, e. g. via linting, makes it easy for a contributor to just open a PR and get feedback. This is why in my projects I always have a pre-commit hook that runs `eslint --cache --fix` with a config that includes `prettier`. Which brings us to...

## Review PRs automatically

Being able to review a PR without having to check out and run the code locally, makes the whole process significantly better. With my setup, I think I have so far only had one PR which I had to check out locally to do some adjustments on my own, and for the rest I felt confident in accepting them after just reading the code changes. Why?

- I enforce that there has to be an issue before a PR. This way I can first discuss **what** to do and use the PR only to check the **how**.
- There is 100% test coverage, and it is enforced automatically. Usually, 100% test coverage might not be that helpful, but for open source it means that contributors will have to test-cover the code they add. The CI will tell me both if they covered 100%, as well as whether their tests pass. So when reviewing, I usually focus on the tests first: Do they test everything discussed in the issue? Then I review the rest of the code for maintainability. As a last step, I go back to the tests, because sometimes reading the code brings to mind some edge cases that I might not be sure about. With 100% test coverage, propablity is high that they are covered.
- I do not review code for style, this is taken care already by linting and prettification.

How does the automation work in practice? I've used TravisCI and CircleCI in the past, but have switched to GitHub Workflows last year. I run `tsc`, `eslint`, `jest`, and `pkg-ok` against every PR. `tsc` builds and compiles everything and surfaces type errors. `eslint` checks not only for linting, but also for style, via the `prettier` plugin. `jest` runs both unit tests, which test the source code, as well as integration tests, which run on the compiled code to make sure that everything is compiled into the right spot. And `pkg-ok` makes sure that the entry points defined in `package.json` exist.

## Synchronize documentation and code

When writing an open source library, usually the hope is for others to use it. This requires a good external documentation. A good starting point is a README file with an example. But for most libraries you will need more.

Unfortunately, documentation has the tendency of getting out-of-sync with the code it is describing quite quickly. And when maintaining an open-source repo, ideally you can make changes quickly without having to worry about documentation too much.

So for `jsx-readme`, I used [TypeDoc](https://typedoc.org/), a TypeScript documentation library based on the [JSDoc standard](https://jsdoc.app/) (which also lead me to discover something about [how React and JSX work together](/writing-markdown-with-jsx/)). This way, my documentation is next to the code:

    /**
     * Defines a regex to search with and a string that should be used
     * to replace the results found.
     */
    interface Replacement {
      find: RegExp;
      replace: string;
    }

    /** @internal */
    interface Props {
      fileName: string;
      children: string;
      replacements?: Replacement[];
    }

    /** Displays a code file with a heading and a codeblock. */
    export const CodeFile: Component<Props> = ({
      /** The file's content. */
      children,
      fileName,
      /**
       * A list of replacements to be made in the file's content,
       * e. g. for replacing relative import paths.
       * */
      replacements = [],
    }) => {
      function executeReplacements(str: string): string {
        return replacements.reduce(
          (replacedStr, replacement) =>
            replacedStr.replace(replacement.find, replacement.replace),
          str
        );
      }

      return (
        <Fragment>
          <Heading level={3}>{fileName}</Heading>
          <CodeBlock language={path.parse(fileName).ext.slice(1)}>
            {executeReplacements(children.trimEnd())}
          </CodeBlock>
          <LineBreak />
        </Fragment>
      );
    };

Thanks to TypeScript and good naming, not everything needs a long description. A `fileName` that is a `string` should be understandable without additional documentation. For the rest, we can add comments right next to the code, and [the documentation will be created accordingly](https://dbartholomae.github.io/jsx-readme/modules/_components_codefile_.html). This way, when I (or a contributor that comes in for the first time), e. g. adds a new prop, it will show up in the documentation, and the existing documenting comment right next to it will inspire me to add all needed documentation there as well.

But even more important than the documentation deeper down in the code, is the README on top of it. This is where `jsx-readme` itself comets in:

    const Readme: Component = () => (
      <Fragment>
        {/* Create a header with title, badges and description inferred from package.json */}
        <TitleFromPkg pkg={pkg} />
        <BadgesFromPkg pkg={pkg} />
        {/* Add additional badges. */}
        <LineBreak />
        <DescriptionFromPkg pkg={pkg} />
        {/* Create an example section based on all files from the example directory set up in package.json */}
        <ExamplesFromPkg pkg={pkg} />
        {/* Create a section linking to the homepage from package.json */}
        <HomepageFromPkg pkg={pkg} />
        {/* Create a section linking to the contributing guidelines file */}
        <ContributingSection />
        {/* Create a section linking to the license file. */}
        <LicenseFromPkg pkg={pkg} />
      </Fragment>
    );

    void renderToFile("./README.md", <Readme />);

This will be autocreated from `package.json` and the examples file, so if either one changes, the README changes with them. In addition, I used the example files as [part of the integration tests](https://github.com/dbartholomae/jsx-readme/blob/main/test/README.md.test.tsx), so I always know that the examples actually work.

Last but not least, building the documentation should happen on each merge automatically. This is done with help of a script

    typedoc && touch docs/.nojekyll && ts-node examples/README.md.tsx

which is run via a GitHub Workflow that we will look at later in this article.

One thing that I haven't yet set up, is an automatic check of documentation coverage. I had used that in previous open-source projects, but it lead to meaningless documentation just to fulfill the coverage.

## Automatically create changelogs

Another part of documentation is the changelog. To simplify processes here, I am using [semantic versioning](https://semver.org/) which means that I describe all changes in a machine-readable format in my commit messages. The big advantage is, that I do not need to maintain additional documentation: I create the changelog automatically based of the commits.

This also has a disadvantage, though: Git isn't the most user-friendly tool, and writing meaningful commit messages is a rare skill even for an experienced developer. I have a check in the CI to ensure that all commit messages of a PR are in the right format, but updating commits has so far been the most time-consuming part of PR discussions.

## Release on push

Now that I know that the PR is mergable, all I have to do is approve the review. Everything else is automated:

[mergify](https://mergify.io/) waits for the CI to be green and the PR to be approved, and then automatically merges it.

[Semantic Release](https://github.com/semantic-release/semantic-release) reads through the commit messages and figures out whether a new release is warranted (if at least one commit contains a new feature, a fix, or a breaking change) and which kind of version bump should happen. It also creates the changelog, commits all changed files into a release commit and tags the commit with the release version. Last but not least it releases to npm. All of this aided by a plethora of plugins.

## Keep dependencies up-to-date

Last but not least, maintaining an open-source repository also means keeping dependencies up-to-date. The best way around this obviously is to not have dependencies in the first place, and especially in the JavaScript world this approach is still underused: For each dependency think about whether it is really needed, as it will not only show up in your project, but then in every project that uses your library. So for each dependency that your users will have to install, think twice whether you really need it.

For the remaining dependencies, the setup we have so far make it really easy to keep up-to-date: I set up [dependabot](https://github.com/dbartholomae/jsx-readme/blob/main/.github/dependabot.yml) to automatically create PRs with new package versions. Thanks to 100% test-coverage I know that if all tests still pass, I can just merge the PR. Which means, that I can actually [configure mergify](https://github.com/dbartholomae/jsx-readme/blob/main/.github/mergify.yml) to do this for me automatically. And then the GitHub workflow will automatically create the appropriate release.

## What's next?

Overall, the experiment during Hacktoberfest was quite interesting, and I am overall really happy with my setup. My next step on this will be to create a project template out of it to make it easier for me to create new open-source projects. If you don't yet, feel free to [follow me on Twitter](https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton) for the latest news on that and for more on web technology and entrepreneurship.

If you do, please tweet to me what your experiences are on maintaining open-source projects, and how to make it as painless as possible?
