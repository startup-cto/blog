---
title: What writing my own JSX renderer taught me about React
slug: writing-markdown-with-jsx
date_published: 2021-01-05T22:11:04.000Z
date_updated: 2021-01-05T22:11:04.000Z
tags: React, TypeScript, Open source
excerpt: One of the reasons that React got so popular is definitively the syntax it introduced: Writing HTML-like code to declaratively describe components just feels good. But this brought me to the question: Why is this syntax only used for React, basically for describing HTML? Well, it isn't.
---

One of the reasons that React got so popular is definitively the syntax it introduced: Writing HTML-like code to declaratively describe components just feels good. But this brought me to the question: Why is this syntax only used for React, basically for describing HTML?

My first realization hit after a few minutes of research: It isn't. And at least one of them you have most likely already seen in action: [Ink](https://github.com/vadimdemedes/ink). It is used to declaratively build CLIs, e. g. for Gatsby, Yarn or Terraform.

This gave me the courage to try something like this on my own, a journey that lead to [jsx-readme](https://github.com/dbartholomae/jsx-readme) and the underlying [jsx-md](https://github.com/dbartholomae/jsx-md). In this post, I will lead you along my journey and the learnings this sparked about JSX, and about React.

If you are interested in more on tech, entrepreneurship, and how to bring these two together, feel free to [follow me on Twitter](https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton).

## Our goal

We want to be able to write code like

    function Readme() {
      return (
        <Fragment>
          <Heading level={1}>{pkg.name}</Heading>
          <LineBreak />
          <Text>{pkg.description}</Text>
        </Fragment>
      );
    }

    writeFile("examples/README.md", <Readme />);

to create markdown like

    # jsx-md
    Generate markdown files with a React\-like syntax.

Later on, this will allow us to write more complicated components from these building blocks. But now: Let's start with some fundamentals. You can skip everything you know and follow the headlines.

## Markdown

Markdown is a markup language. It allows to add formatting like _italics_ or **bold** with help of text characters. E. g. this blog post is written in Markdown:

    ## Markdown

    Markdown is a markup language. It allows to add formatting like *italics* or __bold__ with help of text characters. E. g. this blog post is written in Markdown:

It is also used for documentation of code, e. g. README files.

## JSX

JSX is syntactic sugar for JavaScript. It is compiled down to pure JavaScript, and therefore can only be used if a compile step is available, for example via webpack or TypeScript. For compiling down, it needs to know which pragma to use. By default, most compilers use React, e. g.

    <article>
      <h1 id='primary'>Writing Markdown with JSX</h1>
      <p>One of the reasons that React got so popular...</p>
    </article>

becomes

    React.createElement(
      'article',
      {},
      React.createElement('h1', { id: 'primary' }, 'Writing Markdown with JSX'),
      React.createElement('p', {}, 'One of the reasons that React got so popular...')
    )

but you can tell the compiler to use a different function `someOtherFunction` instead of `React.createElement` by adding the pragma `/** @jsx someOtherFunction */` to the beginning of the file.

In the end, JSX is just syntactic sugar for function calls

## First try: Returning plain strings

So if JSX is syntactiv sugar for functions, and markdown is just a special kind of string, then why not just write a function that returns a string? This was the first approach I tried and lead to code like this:

    /* @jsx createElement */

    function createElement (typeOrComponent, attributes, ...children): string {
      if (typeof typeOrComponent === 'function') {
        return typeOrComponent({ ...(attributes ?? {}), children })
      }
      return children.join('')
    }

    function Heading ({ children, level }: Props) {
      return <md-text>{'#'.repeat(level)} {children}</md-text>
    }

    assert.strictEqual(<Heading level={1}>Test</Heading>, '# Test')

And I got this to a [working version](https://github.com/dbartholomae/jsx-md/tree/b7552c6ac56ce97f0cd2c430c0670ccd4f3f12d8/src). But why, then, is there no release with this?

Before releasing, I wanted to add documentation. And for documentation, I wanted to use [TypeDoc](https://typedoc.org/), so I can put the documentation right in the code and create pretty HTML files automatically.

The problem? TypeDoc uses React and imports the React types into global space. So with `<Heading>Test</Heading>` returning a string, I was met with a TypeScript error.

This left me with two options:

1. Get rid of TypeDoc and hope that no one ever tries using my new library in the same repository as React
2. Adjust my structure to the way that React does it

## Interlude: How does React do it?

To figure out how React actually does this, I looked into two sources:

- [The React type definitions](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts)
- [The code for rendering React DOM to strings](https://github.com/facebook/react/blob/master/packages/react-dom/src/server/ReactPartialRenderer.js)

To summarize: `<div className='test'>Test</div>` (which is syntactic sugar for `React.createElement('div', { className: 'test' }, 'Test')`) returns a so called element:

    {
      type: 'div',
      props: {
        children: 'Test',
        className: 'test'
      },
    }

For nested props (e. g. children), the element simply becomes a nested JSON structure.

The render function then takes this structure and converts it into HTML, or, in case of the string renderer, into a string containing this HTML.

## Second try: Returning elements

Instead of directly returning the markdown string from createElement, we now return an element and then render the element in a separate render function:

    /* @jsx createElement */

    function createElement (type, attributes, ...children) {
      return {
        type,
        props: {
          ...(attributes ?? {}),
          children: children.length <= 1 ? children[0] : children,
        },
        key: null,
      };
    }

    function render(element): string {
      if (element === null || element === undefined || element === false) {
        return "";
      }
      if (typeof element === "string") {
        return element;
      }
      if (typeof element === "number") {
        return element.toString();
      }
      if (Array.isArray(element)) {
        return element.map((el) => renderNode(el)).join("");
      }
      if (typeof element.type === "function") {
        return render(element.type(element.props));
      }
      throw new Error("Invalid element");
    }

    function Heading ({ children, level }: Props) {
      return <md-text>{'#'.repeat(level)} {children}</md-text>
    }

    assert.strictEqual(render(<Heading level={1}>Test</Heading>), '# Test')

Yoyu can find the full, unabbreviated code as [version 1.1.0](https://github.com/dbartholomae/jsx-md/blob/v1.1.0/src/).

## Real-life application of jsx-md

When starting with jsx-md, I already had an application in mind. One of the first open source projects I wrote, was a script in CoffeeScript that created README files for open source projects. With jsx-md, I can now describe the components of a README file declaratively:

    import package from './package.json'

    const DescriptionFromPkg: Component<Props> = ({
      pkg: { description },
    }: Props) => {
      if (description === undefined) {
        return null;
      }
      return (
        <Fragment>
          <Text>{description}</Text>
          <LineBreak />
          <LineBreak />
        </Fragment>
      );
    };

    writeFileSync('README.md', render(<DescriptionFromPkg pkg={package} />))

Overall this lead me to write [jsx-readme](https://github.com/dbartholomae/jsx-readme), a library for describing README files in JSX.

## But what about hooks?

Nowadays, it is quite uncommon to write about React and never mention hooks even once. So what about hooks?

Hooks are a solution by React to solve two problems: First, that the declarative description of a component is executed on every render, but some side effects shouldn't. And second, that there should be a way to tell an individual component to rerender with new data, without having to pass this information through the full component tree.

Both are not that relevant to rendering a static markdown file - it doesn't really have side effects, and changing it happens on timeframes far too great to have the render function running continuously. But when working on jsx-readme, I did run into something that would be solved with hooks in React and that I couldn't yet solve with jsx-md:

What if the data that I need to first render a component needs to be fetched asynchronously?

This, fortunately, did no require a full implementation of hooks, or even of context. Instead, all I had to do, was make the rendering asynchronous and allow promises as children of elements:

    /* @jsx createElement */

    function createElement (type, attributes, ...children) {
      return {
        type,
        props: {
          ...(attributes ?? {}),
          children: children.length <= 1 ? children[0] : children,
        },
        key: null,
      };
    }

    function renderAsync(element): Promise<string> {
      if (element === null || element === undefined || element === false) {
        return Promise.resolv("");
      }
      if (typeof element === "string") {
        return Promise.resolv(element);
      }
      if (typeof element === "number") {
        return Promise.resolv(element.toString());
      }
      if (Array.isArray(element)) {
        return Promise.resolv(element.map((el) => renderNode(el)).join(""));
      }
      if (typeof element.type === "function") {
        return render(element.type(element.props));
      }
      if (element.type === 'mdAwait') {
        return element.props.children;
      }
      throw new Error("Invalid element");
    }

    function Heading ({ children, level }: Props) {
      return <md-text>{'#'.repeat(level)} {children}</md-text>
    }

    renderAsync(<Heading level={1}>Test</Heading>).then((result) =>
      assert.strictEqual(result, '# Test')
    );

## What now?

First of all, if you found the article interesting and would like to hear more about tech, entrepreneurship, and how to bring the two together, then please feel free to [follow me on Twitter](https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton).

Both [jsx-md](https://github.com/dbartholomae/jsx-md) as well as [jsx-readme](https://github.com/dbartholomae/jsx-readme) are open source and hopefully in a state where the code is easy to understand, so feel free to roam around a bit.

And if you are interested – maybe you want to contribute to these repositories to allow even more markdown shenangians, and learn about the core of React on the way?
