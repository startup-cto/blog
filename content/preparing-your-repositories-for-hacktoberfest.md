---
title: Preparing your repositories for Hacktoberfest
slug: preparing-your-repositories-for-hacktoberfest
date_published: 2020-09-26T13:46:50.000Z
date_updated: 2020-10-03T10:19:02.000Z
excerpt: >
  Hacktoberfest is upon us. Starting 1st of October, we will all be celebrating Open Source contributions with tons of swag. But while contributors still have to wait for the 1st of October to get their contributions counted, now is still Preptember: The time to prepare your repositories.  
---

Hacktoberfest is upon us. Starting 1st of October, we will all be celebrating Open Source contributions with [tons of swag](https://hacktoberfest.digitalocean.com/). But while contributors still have to wait for the 1st of October to get their contributions counted, now is still Preptember: The time to prepare your repositories.

## Why you should participate

Open source lives from contribution, but contributing to repositories can be daunting. Hacktoberfest is a great opportunity to clean up your repository and make it as easy as possible for others to contribute.

It is a great chance to get people who just entered our field into open source and use this to maybe also teach about some best practices like well-written commit messages or test coverage.

Also, it might help you to get some more hands on features or bugs you just didn't get around to fix yet.

## How to prepare your repo

### What is officially needed

**Update:** These rules have [recently changed](https://hacktoberfest.digitalocean.com/hacktoberfest-update).

You have to set a `hacktoberfest` topic on your repository and make sure to either merge, approve or label as `hacktoberfest-accepted` any PR that should be eligible before November 1st.

For PRs created before the 3rd of October, you can invalidate any opened PR that is spammy by adding an `invalid` label.

Please also make sure that the main purpose of your repository is not just to help other people get Hacktoberfest t-shirts. Otherwise it might be marked so that no PR to it is eligible for Hacktoberfest.

### Labels

It is recommended to mark issues with the right labels, though, so participants can discover them more easily. So far I have seen mainly four labels in use:

- `hacktoberfest` is the label recommended by the Hacktoberfest team to mark any issue that is meant to be worked on during Hacktoberfest. Personally I've set the label color to #FF8AE2 which seems to be the main brand color used this year.
- `help wanted` indicates that this issue is open to outsiders and not only to existing maintainers of your repo
- `good first issue` shows that this issue is specifically meant for new contributors. Not all issues avaiable to outsiders fall in this category and you should put extra care into writing them to make it easy to get into your repo

### Make your repository ready for contribution

When you have been working on your repository for a while, you have everything set up and are already familiar with all quirks. Neither is true for a fresh contributor.

The established way to communicate this information is via a `CONTRIBUTING.md` file in the repositories root directory. If you don't have one yet, now is a good opportunity to create one. Here's [one of mine for inspiration](https://github.com/dbartholomae/jsx-readme/blob/main/CONTRIBUTING.md).

But even if you already have contributing guidelines - are you sure they are up to date? Best to fully erase the repository from your disk, uninstall all special tools, and then follow your contributing guidelines yourself, until you have it running (including all steps required in your build pipeline like linting, building and testing). This will show you steps missing.

### Create good first issues

Creating a "good first issue" is easy, but creating a good "good first issue" is hard. You have to put yourself in the shoes of someone who just discovered your repository and knows literally nothing about it. Your issue description needs to

1. Give them enough background to understand what your project tries to achieve,
2. explain in detail what the goal of this specific issue is,
3. show them a starting point where they can start their work, and
4. sell them to the idea of taking on this issue in particular.

Here's a couple of examples I wrote specifically for Hacktoberfest:

[https://github.com/dbartholomae/jsx-readme/issues/7](https://github.com/dbartholomae/jsx-readme/issues/7)
[https://github.com/dbartholomae/jsx-readme/issues/14](https://github.com/dbartholomae/jsx-readme/issues/14)
[https://github.com/dbartholomae/jsx-md/issues/1](https://github.com/dbartholomae/jsx-md/issues/1)

**Additional idea**: If you can take the time, then setting up a link where contributors can schedule a quick call with you for questions, or even 30 minutes of pair programming, might make it even easier for others to join in.

### The legal stuff

Depending on your organization's policies you might have to also set up Contributor License Agreements. I'm currently using [CLA assistant](https://cla-assistant.io/) for this, but there are also [other bots](https://colineberhardt.github.io/cla-bot/).

## Promoting your repo

There already is [a good guide on promoting open source](https://github.com/zenika-open-source/promote-open-source-project#readme), so in this article I will focus on Hacktoberfest specifically.

1. Add a hacktoberfest label to the issues you want to be found.
2. Post your project in the official Discord in the #issue-sharing channel.
3. Tweet about it including #Hacktoberfest

## Have fun!

In the end, even though it is noble to make open source contribution easier to others, remember that by maintaining an open source repo you already volunteered your time to the cause of open source. It is admirable if you can do even more by making it easy for others to contribute, but don't beat yourself up over it if you don't find the time to do everything mentioned in the article.

The most important part is that you have fun with your work and do your best :)
