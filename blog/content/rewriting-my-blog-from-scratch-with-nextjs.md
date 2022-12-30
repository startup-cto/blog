---
title: Rewriting my blog from scratch with NextJS
slug: rewriting-my-blog-from-scratch-with-nextjs
publishedAt: 2022-12-30T14:39:59.845Z
tags:
- TypeScript
- NextJS
- AWS
- Meta
excerpt: >
  Should I have written articles instead of rewriting the blog itself? Probably. Did I learn a lot about NextJS, Rush monorepos, AWS CDK, validation libraries and more in the process? You bet! So, what did I learn?

---

"Writing a blog" is usually taken as "writing articles for a blog".
I did this for a while, using [Ghost](https://ghost.org/) to host the blog.
And it mostly worked, but there were multiple reasons for me to change it:
- Have an actually running open-source application, both for experimenting, and for my CV
- Try out [NextJS](https://nextjs.org/), [rush](https://rushjs.io/), and other technologies
- Be able to automate whatever I want around the blog 

What I thought would be a project of maybe a month, turned out to take me almost a full year.
Here's what I did and what I learned on the way.

If you are interested in more articles and news about web product development and entrepreneurship, please feel free
to subscribe to new articles [via email](https://newsletter.startup-cto.net), [via RSS](https://startup-cto.net/rss.xml), or to [follow me on Twitter](https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton).

## Overview

When building the blog to the current state, I ran through the following phases:

1. Setting up the blog in NextJS
2. Adding an RSS feed
3. Hosting on Amplify
4. Starting with analytics
5. Moving to a monorepo
6. Using OIDC to work with AWS
7. Publishing to dev.to
8. The current structure
9. What's next

If you want to follow along in code, this blog is open-source now, so you can roam through
its [commit history](https://github.com/startup-cto/blog/commits/main?after=5046de405d32df6bc9c2036ce5aa26c3e7acc43e+454&branch=main&qualified_name=refs%2Fheads%2Fmain)
and follow along. I will mention relevant commits in each chapter.

## Setting up the blog in NextJS
[Commits start here](https://github.com/startup-cto/blog/commits/main?after=5046de405d32df6bc9c2036ce5aa26c3e7acc43e+454&branch=main&qualified_name=refs%2Fheads%2Fmain).

When I decided to rewrite my blog, one of the reasons was that I wanted to learn more about [NextJS](https://nextjs.org/).
It had already gotten some traction then, and seemed like a good fit for a blog. It was a bit overkill compared
to other solutions like [Gatsby](https://www.gatsbyjs.com/), but I liked the idea of learning something
that would allow me to quickly create even more complicated prototypes thanks to [API routes](https://nextjs.org/docs/api-routes/introduction).

I decided quite quickly to store blog posts in markdown-format with yaml front matter for meta-data.
On the one hand, this made migrating from Ghost easy, as my blog posts where already stored there as markdown files.
On the other hand, this also allowed me to store all relevant information in one file.

What didn't become obvious immediately was that storing the slug inside the file instead of using the filename was beneficial.
This creates an additional burden, as I need to make sure by hand that I don't use the same slug twice, but it allows me to potentially change the file name I use without losing SEO juice for the existing slug.

The folder structure inside NestJS also evolved over time, mainly due to more extensive use of [Storybook](https://storybook.js) for [visual tdd](https://startup-cto.net/tdd-in-a-react-frontend/).
* `content` contains the markdown content for the blog articles
* `public` contains additional assets like images
* `src/pages` has the NextJS pages, but tries to be as lean as possible
* It uses functions from `src/loading-posts` for server-side rendering, and
* `src/presentation/templates` for the actual pages
* `src/presentation` in general contains the [full component library](https://main--63ae2da33e662a5a8af367b9.chromatic.com/)

## Adding an RSS feed
[Commits start with `chore: add empty script file to create RSS feed`](https://github.com/startup-cto/blog/commits/main?before=5046de405d32df6bc9c2036ce5aa26c3e7acc43e+385&branch=main&qualified_name=refs%2Fheads%2Fmain)

I'm a big fan of RSS feeds and use them to stay up-to-date on many blogs and sites, so offering an RSS feed myself was a hard requirement for the migration.
Fortunately, Ghost has an open-source, MIT-licensed [implementation of creating an RSS xml file](https://github.com/TryGhost/Ghost/blob/85db1838d9234778edaae78ef29384cb2f7b67b8/ghost/core/core/frontend/services/rss/generate-feed.js) that I could look at to ensure that my implementation does not break anything for people who might already be following via RSS.
The actual code turned out to be [quite simple](https://github.com/startup-cto/blog/blob/main/blog/scripts/rss/createRSSFeed.ts), but it took me some time to understand, which elements where needed and why.
This way, I also learned about the `<link rel="alternate" type="application/rss+xml" title="The Startup CTO" href="https://startup-cto.net/rss.xml">` tag.

## Hosting on Amplify
[Commits start with `chore: add amplify config to repo`](https://github.com/startup-cto/blog/commits/main?before=5046de405d32df6bc9c2036ce5aa26c3e7acc43e+315&branch=main&qualified_name=refs%2Fheads%2Fmain)

When I first started, I tried hosting the blog on [GitHub Pages](https://pages.github.com/).
Unfortunately, I didn't find a way to make this work with a custom domain that was not hosted on a subdomain, as GitHub Pages requires the use of a CNAME record, and these can't be set on a root domain like `startup-cto.net`.
I could have decided for a subdomain like `www.startup-cto.net`, but this would have required an additional redirect or rewrite solution, or put me in danger of losing all my existing SEO juice for `startup-cto.net`.
I had anyway thought about trying out [AWS Amplify](https://aws.amazon.com/amplify/) at that point, so that's what I did.

The hosting itself went surprisingly smoothly.
I needed to tweak the [`amplify.yml` config file](https://github.com/startup-cto/blog/blob/main/amplify.yml) a bit, especially once I moved my repository to be a monorepo, but apart from needing to build twice, it just worked.
I decided against running tests in Amplify, and instead to run the tests in GitHub, to separate CI and CD a bit and keep my development workflow in one place - hoping that I won't need to debug why a run fails on Amplify even though it succeeded on GitHub any time soon.

## Starting with analytics
[Commits start with `chore: add first experimental CDK web analytics setup`](https://github.com/startup-cto/blog/commits/main?before=5046de405d32df6bc9c2036ce5aa26c3e7acc43e+245&branch=main&qualified_name=refs%2Fheads%2Fmain)

This was definitively one of the most interesting parts of my journey.
I'm a big fan of building for the user, and for blog posts, the best way to understand the user - which is you, the reader - is to use analytics.
I did not want to collect any unnecessary data, though.
Most importantly, I did not want to help others on collecting unnecessary data.

At this point, I looked into some existing analytics solutions like [Google Analytics](https://analytics.google.com/) and [Plausible](https://plausible.io/), but they either collected unnecessary information, or were costing money.
I could have self-hosted some of them, but given the little traffic I had so far, all of these options would have been significantly more expensive than what I went with now:
Writing my own little serverless analytics tool.
The main reason for this was to learn more about DynamoDB, though.

The architecture behind my little analytics tool is quite simple:
- An API gateway offers access to two endpoints:
  - One to collect an analytics event, consisting of a path and potentially utm parameters
  - Another one to retrieve the events from the last month or so
- A DynamoDB to save the events
- Some frontend code to [collect analytics events](https://github.com/startup-cto/blog/blob/main/blog/src/analytics/useTrackPageView.ts)
- A [very simple page](https://startup-cto.net/analytics/) that shows me ugly graphs with the data

All the infrastructure is defined via [AWS CDK](https://aws.amazon.com/cdk/), a library on top of [CloudFormation](https://aws.amazon.com/cloudformation/).
The code is now in [its own project](https://github.com/startup-cto/blog/tree/main/analytics).

Most of the code for the backend lives in [its own CDK construct](https://github.com/startup-cto/blog/blob/main/analytics/src/constructs/WebAnalytics/WebAnalytics.ts).
The first interesting realization was that I can easily link handlers to infrastructure code [via environmental variables](https://github.com/startup-cto/blog/blob/main/analytics/src/constructs/WebAnalytics/WebAnalytics.ts#L50), e.g. the table name, but also key names for DynamoDB.

I then realized that this is even truer for validation logic.
This way, [a single file](https://github.com/startup-cto/blog/blob/main/analytics/src/constructs/WebAnalytics/model/AnalyticsEventInput.ts) can define validation logic that is used [in the ApiGateway validator](https://github.com/startup-cto/blog/blob/main/analytics/src/constructs/WebAnalytics/WebAnalytics.ts#L92) as well as [in the handler itself](https://github.com/startup-cto/blog/blob/main/analytics/src/constructs/WebAnalytics/WebAnalytics.CollectEventHandler.ts#L17).
It's a bit unnecessary to duplicate it in this case, but the performance hit is small enough for me to keep it in just to show the principle.

Speaking of performance:
I also [validate the data I load from the database](https://github.com/startup-cto/blog/blob/main/analytics/src/constructs/WebAnalytics/handler/loadEventsByMonth.ts#L30).
I'm not sure whether I will keep this, as it does create a performance hit.
The performance hit was significantly greater, though, when I accidentally [recompiled the validation schema on each validation](https://github.com/startup-cto/blog/commit/924c69a6a232161293e3cc90c5756fdc3fee4dcf).

One last interesting aspect here is the DynamoDB setup with hash and sort keys.
A NoSQL database, to be honest, isn't the best choice for a database structure for an analytics solution like this one.
Yes, analytics databases get more write than read requests, and NoSQL databases can be better suited to writing a lot of document-like data than SQL databases.
But, honestly, my blog getting enough hits for this to matter is far from likely.
On the other hand, querying the data based on different combinations of paths and utm parameters is not a strength of NoSQL databases.

Other systems either use [SQL databases](https://github.com/plausible/hosting/blob/master/docker-compose.yml#L7) for this purpose, or multi-step pipelines that use different tools for storing and [querying](https://aws.amazon.com/athena/) the data.
I didn't want to use either solution, on the one hand, because I didn't find free solutions for low traffic, and on the other the hand because I anyway wanted to experiment a bit with DynamoDB.

Specifically, DynamoDB can only be queried by fixed hash keys and parts of sort keys.
They need to be designed with the intended queries in mind.
In our case, we intend to query by date and maybe by path or utm parameters.
The number of different paths will be growing slowly (very slowly, at the rate I currently write blog posts) while dates will be seasonal but roughly equally distributed, and utm parameters will have a few very frequent and a lot very infrequent entries.
Therefore, the paths could be a good candidate for hash keys.

On the other hand, there are [limits for write-throughput](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html) in the same hash key.
To solve this, I added a scatter value as the hash key and randomly distribute all analytics events across the hash key.
This way, I can scale up when needed, but don't need to worry about the complexity yet.

I used UTC date strings as the sort key, mainly to be able to easily query all events for a certain month by just checking for keys that start with e.g. `2022-12`.
A more common way would be to save the date time as an epoch and check for numbers between the epochs of the beginning and the end of the month, but I hadn't thought about that when I wrote the code, and it hasn't yet been important enough to refactor.

## Moving to a monorepo
[Commits start with `Move package into sub-directory`](https://github.com/startup-cto/blog/commits/main?before=5046de405d32df6bc9c2036ce5aa26c3e7acc43e+210&branch=main&qualified_name=refs%2Fheads%2Fmain)

With the analytics project in place, code became a bit more complicated and intertwined.
To solve this — and to learn more about monorepos in practice — I decided to split the projects into multiple directories and manage them with [Rush](https://rushjs.io/).

The most interesting challenge was how to manage the CI pipeline.
I decided to have one common pipeline for all packages, and call individual scripts per package.
This way, each package can still manage the details of its pipeline, but the central pipeline manages dependencies and when to run which task of which project.

## Using OIDC to work with AWS
[Commits start with `Add package to manage access`](https://github.com/startup-cto/blog/commits/main?before=5046de405d32df6bc9c2036ce5aa26c3e7acc43e+175&branch=main&qualified_name=refs%2Fheads%2Fmain)

Another small change was to use [OIDC to authorize GitHub towards AWS](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services).
Thanks to the monorepo setup, the code is in its own [access](https://github.com/startup-cto/blog/tree/main/access) package.
While OIDC was quite straightforward, I did learn a few more things about AWS CDK.
Most importantly, that infrastructure should always live in a [Stage](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.Stage.html), so that the construct ids do not change when the infrastructure is deployed via a [pipeline](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.pipelines-readme.html).   

## Publishing to dev.to
[Commits start with `refactor: add DraftPost`](https://github.com/startup-cto/blog/commits/main?before=5046de405d32df6bc9c2036ce5aa26c3e7acc43e+280&branch=main&qualified_name=refs%2Fheads%2Fmain)

The last addition to the blog (for now) is the concept of publishing posts.
Up to this point, the deployment pipeline worked like a side-effect-free pure function:
Take the current state of the repo from GitHub, find all articles that are in a published state, and convert them to HTML files.

But a blog also has side effects that should happen only once when a post is published.
So that's what I implemented next.

The structure ended up quite simple.
I cleaned up the different types of posts and introduced a `ToPublishPost`, which is a post that has all the metadata needed to be published, but no `publishedAt` yet.
Then a script that finds all these `toPublishPosts`, adds the current date as a `publishedAt`, commits it to repo, and runs the side effects.
For now, there are only two side effects:
- Publishing the post to [Dev.to](https://dev.to/the_startup_cto)
- Send a newsletter email via [Buttondown](https://newsletter.startup-cto.net/)

## The current structure

Since the blog is open-source now you can look at its current structure [on GitHub](https://github.com/startup-cto/blog/tree/803a96831826ca3556c3bbd6ff48126a5f4d9538).
It still follows the structure I introduced when moving to a monorepo:
- [.github](https://github.com/startup-cto/blog/tree/803a96831826ca3556c3bbd6ff48126a5f4d9538/.github) for CI config,
- [access](https://github.com/startup-cto/blog/tree/803a96831826ca3556c3bbd6ff48126a5f4d9538/access) to manage access credentials to AWS,
- [analytics](https://github.com/startup-cto/blog/tree/803a96831826ca3556c3bbd6ff48126a5f4d9538/analytics) with all the code for my custom analytics solution,
- [blog](https://github.com/startup-cto/blog/tree/803a96831826ca3556c3bbd6ff48126a5f4d9538/blog) with the actual blog, and
- [util](https://github.com/startup-cto/blog/tree/803a96831826ca3556c3bbd6ff48126a5f4d9538/util) with helper packages used in multiple projects.

There are more and smaller changes that I didn't mention in the rest of the article, but if you read up to this point,
you should have a good grasp of the overall situation.

## What's next

There are obviously [a lot more ideas](https://github.com/startup-cto/blog/blob/main/TODOS.md) that I want to do with the
blog. The blog isn't only a way for me to manage and share my own knowledge, but now it is also a sandbox
for trying out different web technologies in a production app that won't cause me much pain if it is down due to my mistakes.

For now, I will most likely focus on writing articles again, but there are some changes I might work on
from time to time, like automatically publishing new articles on Twitter. I'm sure what I learn there
will lead to new articles on its own.

If you want to see what else will happen, you can subscribe to new articles
[via email](https://newsletter.startup-cto.net), [via RSS](https://startup-cto.net/rss.xml), or to [follow me on Twitter](https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton).
