---
title: How to read any startup's source code
slug: how-to-read-any-startups-source-code
publishedAt: 2021-02-13T10:33:00.000Z
tags:
- Marketing
- Competitive Analysis
excerpt: So you are in interviews as an engineer with an SaaS-startup and want to impress them with your deep knowledge of their tech stack? Here are some tricks I have used in the past to know more about their technology than the interviewer themself.
---

So you are in interviews as an engineer with an SaaS-startup and want to impress them with your deep knowledge of their tech stack? Or you have been working on learning projects but want to see some real-world code? Here are some tricks I have used in the past to know more about a startup's technology than their recruiter.

You could also use these tricks for market research and spying on your competition, just keep in mind that in early stage it is way more important to understand your customer than your competitors. And that some things might be plainly illegal.

I also want to point out that I personally wouldn't consider these loopholes a security problem by itself, but they can be if you are not careful, so you might want to avoid some of them in your own company. And yes, there are ways to avoid them, so, contrary to the click-baity title, you might run into situations, where they don't work.

If you are interested in more articles and news about web product development and entrepreneurship, please feel free to [follow me on Twitter](https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton).

To understand a startup's tech stack, I

1. find all (sub-)domains for all the applications they use,
2. analyze them for tell-tale signs of their tech stack, and
3. skim their source code.

## Finding their apps

Usually, there will be at least some of the following:

- A landing-page builder for landing pages
- A content management system for a blog
- An authentication system
- A web app for the actual product
- A backend for the actual product
- One or multiple native apps

A good starting point is the homepage itself. This often is created in a landing-page builder or a similar tool like WordPress, or with a static page builder.

Sometimes, blog or landing pages are hosted separately. The blog is usually linked from the homepage. A typical subdomain is `blog`.

Finding the landing-page builder can be slightly more tricky. Try to find ads, e. g. by using a traffic analysis tool like [SimilarWeb](https://www.similarweb.com/), or a specific ads tool like the [Google Ads keyword plnaner](https://ads.google.com/aw/keywordplanner/home) if you suspect them to use these kinds of ads. Then search for the keywords from these tools. If you see an ad, this will lead to a landing page on their landing page builder. Keep in mind that not all startups rely on these kinds of apps and not all use landing page builders.

Next is getting to the authentication system and to the web app. Just search for a login button on the homepage. Most startups I've seen do not use a separate authentication system, but simply integrate it into their web app, so when you see the login screen, you are already on the right subdomain. If they use an external solution like AWS Cognito, then you might have to create an account to find the actual subdomain. A typical subdomain name for the authentication system is `auth`, and for the web app is `app`.

This is also a good point to check for a staging environment that might be hosted e. g. at `test`, `dev`, or `staging`, and sometimes on a sub-level of the app, so e. g. `dev.app` or `app.dev`. The staging environment will most likely be very similar code but might have more debugger friendly settings.

When you open the web app, this also allows you to find the backend by opening the dev tools and monitoring XHR requests going out. A typical subdomain name for the backend is `api`.

Finding the native apps usually is quite easy: They are either mentioned on the homepage, or you find them by entering the startup's name in the app store search.

## Analyzing their infrastructure

Most tools leave distinctive telltale signals when they are in use. Fortunately, there are companies out there which specialize in analyzing these. I personally use [Wappalyzer](https://www.wappalyzer.com/) to analyze each subdomain found above. There is also a free plugin for Chrome and Firefox, just keep in mind that if something is free, then you are the product: It most likely tracks the pages you visit to add more information to the Wappalyzer database.

This step gives you insights into which frameworks are used in the frontend, which kind of backend is running, and even more. But there is one more step.

## Reading their source code

It should not be possible for you to access any backend source code from a different company. If it is, immediately let them know. This is a massive security problem.

Frontend code, on the other hand, is executed in the browser. Therefore it is accessible to anyone who can open the web app. Just open your DevTools, go to the sources tab, and there it is. On your way, you can even check for warnings or errors that the app emits.

But there is one more trick to it: The source code you see is most likely bundled and minified, which puts everything into one file and replaces all variable names with single letters. This makes it really hard to understand the code.

This also makes it really hard to understand error messages. That's why many companies have source maps enabled, which link each character in the scrambled file to the corresponding character in the original source. This way, an error that points to line 1 character 542 in the scrambled file can instead be traced to line 30 character 12 in the `Login.tsx` file.

These source maps are either used together with the original code in another tool or, and in my experience, this is more common, the source code is saved as inline source maps next to the minified code.

What does this mean for us? It means that the original source code is shipped with the application. You can find it when opening the web app in your browser's dev tools and open the "Sources" tab. You might have to search around a bit, but somewhere in there, you can find the source maps with all the juicy code.

Here's an example from [my little todo app](https://startup-cto.github.io/todos/):

![Source maps in Chrome dev tools](/images/source-maps.png)

Unfortunately, sometimes this doesn't work. But don't give up your hope yet! It might be that source maps are disabled on production. But did you try the staging environment you found in the first step? It might have source maps enabled.

And maybe the code is lazy loaded in, so you don't have access to all source maps right away, but if you create an account and navigate through the app, you should get more and more insights.

What kind of things can you learn from here? Since the advent of [Single Page Applications](https://en.wikipedia.org/wiki/Single-page_application), a lot of business logic is living in web applications. You will be able to understand code structure, tools used, important features, features in development that are only rolled out to some of the users, backend structure, external tools used, ...

What did you learn with help of these methods? Feel free to [follow me on Twitter](https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton) and reach out with your learnings.
