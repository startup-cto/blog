---
title: Easily identify technical debt in any repository
slug: easily-identify-technical-debt-in-any-repository
publishedAt: 2023-03-07T14:15:24.222Z
tags:
- GitHub
- Architecture
- Technical Debt
excerpt: >
  Technical debt is a term used a lot whenever a codebase is not to our liking, and there's never enough time to fix all of it. What actually is technical debt, how do you quickly prioritize what to work on - and what are these GitHub Blocks that people are talking about?
---

Technical debt is a term used a lot whenever a codebase is not to our liking, and there's never enough time to fix all of it. What actually is technical debt, how do you quickly prioritize what to work on - and what are these GitHub Blocks that people are talking about?

If you are interested in more articles and news about web product development and entrepreneurship, please feel free
to subscribe to new articles [via email](https://newsletter.startup-cto.net), [via RSS](https://startup-cto.net/rss.xml), or to [follow me on Twitter](https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton).

## What is technical debt?

"Technical debt" is often used as a term for basically any kind of code we don't like, be it difficult to understand or just written by someone who since left the company.
And often, it is considered as something to avoid at all cost.

But that's not what the term was meant to be originally, and neither how it is most useful. So let's start with a [definition from Wikipedia](https://en.wikipedia.org/wiki/Technical_debt):

> Technical debt is the implied cost of future reworking required when choosing an easy but limited solution instead of a better approach that could take more time.

So unless there was an _explicit choice_ to take an _easier route_, it's not technical debt, it is _accidental complexity_.
Technical debt, on the other side, is a tool that can be used to move work into the future: Instead of taking the time-consuming path now, we take an easy route, knowing full well that it might lead to more work in the future.

A typical example is around scalability: Especially at a startup, we often build features to attract users, and while we hope for many of them, we only have maybe a handful in the beginning.

This also means that, most of the time, technical debt is a good thing: We don't know whether or how a feature will be used, before it actually is used, so if we can push work into the future, we might not even need to do it at all.
And we can still fix the feature to be more scalable once this is actually needed (or, ideally, once we know we will need it to be scalable, but right before it actually is needed).

Technical debt can run us into trouble in two ways, though:
1. If we are in an organization that is willing to take the trade-off, but then can't manage the cost of cleaning up when needed.
2. If the cost of fixing the problem later massively out-scales the cost of fixing it from the get-go.

The first one can be reduced by having explicit timelines, e.g. building a feature and then, 3 months later, either removing it again if it isn't used, or cleaning it up otherwise.

The second one can be avoided by writing down the expected costs explicitly and think them through to make an explicit trade-off. It's less common, though, and I've seen way more situations where it was used as an argument against technical debt even though technical debt would have been the better choice.

## So what about accidental complexity?

In reality, the term "technical debt" is often used for accidental complexity. So let's define that as well (this time my one as there is no Wikipedia article):

> accidental complexity is any complexity in the code that is not needed to model actual complexity in the business domain.

In practice, accidental complexity mainly comes from the following:

- Not understanding the domain well enough, e.g. adding features and special cases that are never or almost never used by our users
- Not understanding the technology we use well enough, e.g. writing complex custom solutions for a problem that could be solved more easily with features already in the framework we use
- Trying to appear smart by writing complex code, e.g. to make oneself less replaceable

All of that have an implicit continuation of "and not fixing the code once we learn more (about the domain/the technology/...)".

## So how to fix technical debt?

Once it is in place, technical debt is indistinguishable from accidental complexity, as the terms differentiate between how both get created, not what they actually are.
This means that the following is true both for fixing technical debt and reducing accidental complexity.

Fixing the complexity usually is obvious: The reason why we identify something as technical debt usually is that we have an idea of a "better" way to do it.
Instead, the hard part is to know where to start, as reducing complexity will take a lot of time, and we usually don't have enough time to reduce all of it at once.

So what should we focus on first? We need to find out

1. which files have the most accidental complexity, and
2. which ones are most likely to need to be changed in the near future.

For complexity, there are many metrics, e.g. cyclomatic complexity, Halstead, or simply counting lines of code.
Fortunately, [they are all strongly correlated](https://arxiv.org/pdf/1408.4523.pdf), so for practical purposes, looking at
lines of code is often enough. In practice, these are also closely correlated with file size (which is roughly proportional to number of lines times average line length).

Figuring out which files are most likely to be changed is more of a communication exercise: We can talk to management, product managers, and
other team members to figure out which services are most likely needed for upcoming projects. Or we can just look at the service that we need to work on next.

How to identify the most critical files inside a service? Thanks to git, we have a lot of data at our fingertips.
The easiest way to predict which files will need to be changed, is to look at the files that were changed most recently.
We can do this by counting how many commits touched a file.

Also, not all files are equal. E.g. a lock-file might be big and changing often, but since it is autogenerated,
there is not much complexity.

Fortunately, we don't need to do all of this ourselves. There's a GitHub block for this.

## Interlude: What are GitHub blocks?

[GitHub Blocks](https://blocks.githubnext.com/) is an update to the way we can interact with repositories.
It allows to write custom "blocks" which get data about either a file or a folder and can display this information,
enriched with other information e.g. from the GitHub API, any way we want.
As of Q1 2023, it is in technical preview.

This is potentially a game changer for GitHub, as it allows them to basically outsource the creation of a great UI.
For developers, it opens up a full new world of interacting with their code. I'll write a short blog post about this soon,
so if you want to know more, feel free to subscribe [via email](https://newsletter.startup-cto.net), [via RSS](https://startup-cto.net/rss.xml),
or to [follow me on Twitter](https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton).

## The technical debt block

The first thing I thought about when I read about GitHub blocks was a way to identify technical debt in a folder:
The [Technical Debt Block](https://github.com/startup-cto/technical-debt-block) was born.

If you have access to GitHub Blocks, you can use it to view a folder and get a list of files in that folder,
sorted by technical debt as described above. Only thing that remains to do is to actually clean the top files.

## Conclusion

We talked about technical debt, which is born out of a conscious trade-off decision and usually is a good thing,
as well as accidental complexity, which usually isn't. We looked at how to best prioritize which to clean with help of
information readily available in Git, and a GitHub Block that helps to visualize this.

Hit me up on [Twitter](https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton):
How do you prioritize technical debt? And which files did you find with this method that surprised you the most?
