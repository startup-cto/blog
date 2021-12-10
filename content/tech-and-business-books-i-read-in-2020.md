---
title: Summarized – Tech and business books I read in 2020
slug: tech-and-business-books-i-read-in-2020
date_published: 2021-01-04T19:54:00.000Z
date_updated: 2021-01-04T20:29:20.000Z
tags:
- Books
excerpt: In 2020 I thought I would find less time to read, due to the missing commute, my main reading time for 2019. This lead me to explicitly take time to read, and actually finish more books than in the year before. And most of them were great books, too! Here's a summary of what I learned from each.
---

In 2020 I thought I would find less time to read, due to the missing commute, my main reading time for 2019. This lead me to explicitly take time to read, and actually finish more books than in the year before. And most of them were great books, too! Here's a summary of what I learned from each.

Overall there's three themes in the books I read:

- **Ideation and Customer Development, **which I read up on due to my time testing out different startup ideas for half a year,
- **Agile Software Architecture,** based on my general interest in how to get away without any planning and still not end up in a hot mess, and
- **Product/Engineering Organization**, which I used mostly end of year when working with startups to scale their development teams.

I've added affiliate links for everyone who wants to support me, but please do not feel pressured to use them. Feel free to also [follow me on Twitter](https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton) for more startup and tech related content.

## Ideation and Customer Development

### [Lean Customer Development (by Cindy Alvarez)](https://amzn.to/2JHrGuo)

The first book I read about how to get to a working idea was also the best one from my perspective. The main idea is to talk to potential customers to find and validate ideas. It goes into detail how to find customers to talk to, which questions to ask and how to best ask them, how to find an MVP, and how to validate it with minimal effort. From a content perspective it is similar to The Mom Test (see below), but I found it to be a bit more practical.

If you are building product in an early-stage startup (or any other agile organization), this is a **must-read**.

### [Loonshots (by Safi Bahcall)](https://amzn.to/2JGEwci)

While the other books in this category are aimed (at least partially) at startups, Loonshots by Safi Bahcall is taking more of a bird's-eye view on the topic of innovation. The main idea from the book is that an organization can only grow to a certain size and remain innovative, because managing a big organization requires a different mindset. It proposes to split your organization in two, one part that is innovative and one that is operational, and tie them together close enough so ideas can permeate.

It's an interesting read due to the examples for innovation, but not really necessary if you are building a startup.

### [Play Bigger (by Al Ramadan)](https://amzn.to/2LoCfDm)

Play Bigger introduces the idea of category design. Instead of just building a product, you build a new market demand, while at the same time building a product that fulfills the market demand and an organization that builds the product. The idea of doing everything at the same time didn't resonate that well with me, but finding a customer problem and then promoting the problem instead of your own solution is a very powerful tool.

This book can bring you in the right mindset for selling a big vision as a CEO.

### [The Mom Test (by Rob Fitzpatrick)](https://amzn.to/35ajudD)

The Mom Test is on the recommended reading list by EF, the program I joined in March 2020. It's basically the same content as Lean Customer Development: Ask your customers what to build, but ask them in a way that does not incentivize them to lie. This is achieved by asking about how they currently do things and extrapolating from there, instead of asking how they would do things in the future.

It's a good alternative to Lean Customer Development. It's a bit more famous, but personal I liked it slightly less. Feel free to choose either one.

## Agile Software Architecture

### [Domain-Driven Design (by Eric Evans)](https://amzn.to/2XgqH7v)

A modern classic in software development, Domain-Driven Design introduces ideas on how to structure code based on the business domain. There is a lot of very good insights, but for me the strongest idea is the domain language: Things in the code should not be called by technical terms, but by business terms instead. Ideally, the code written on the business logic should be understandable by someone who knows the business, but does not know how to code.

It's a good fundamental read, but there are some signs of stiff Java structures in their that might not be that relevant with modern programming languages.

### The Clean Coder (by Robert C. Martin)

The Clean Coder by Uncle Bob is one of the wider known standards in computer literature. Still, it is the only book in this list that I will not add a link to. The reason for this lie in the person of Robert C. Martin who I do not want to support financially in any way due to sexism and racism (see for example "The Politics" in [this article](https://blog.wesleyac.com/posts/robert-martin)). Unfortunately I only became aware of this after I had already bought this book.

After having read Clean Code (there's a good [JavaScript based summary](https://github.com/ryanmcdermott/clean-code-javascript) if you haven't read that one and don't want to buy it), this was on my reading list for some time. The main ideas are true, and easily summarized: Be professional and don't let non-coders take code decisions for you. Say no if a manager pushes you to churn out code quickly that you know will break. And rely on good practices like tdd and practice.

Even though I like the ideas mentioned in the book, I currently cannot recommend it for the reasons given above. My goal for this year is to find a book on this topic from a different author that I can recommend.

### [Refactoring Databases (by Scott W. Ambler)](https://amzn.to/2MxPFNP)

One of the biggest obstacles I had over the last years when working in an agile way on projects, was adapting state-full applications like databases. Other than a state-less application, these cannot simply be replaced, instead they have to be migrated. This lead me to read Refactoring Databases. I did not fully read it, as it went into detail that I did not yet need, but the general ideas of how to refactor databases still stick with me, especially using views and database procedures to support multiple different interfaces (e. g. table structures) at the same time.

If you mainly work with databases, it is a **must-read**. Otherwise, just read it if you struggle in this specific area.

### [Building Evolutionary Architectures (by Neal Ford)](https://amzn.to/3ohTMeI)

The other obstacle I still face a lot when working agile is the question of how much architecture needs to be defined top-down and how much can develop organically. Building Evolutionary Architectures by Neal Ford applies the idea of test-driven design to architecture, but instead of testing functionality, it introduces the idea of fitness functions to test for the boundary conditions that should come from the architecture, like performance, cost, or coupling. This way, assumptions and reasoning are made transparent, and the CI pipeline can enforce future adherence to these rules, while leaving open the opportunity for developers to evolve the architecture within these bounds.

It's a very good read for anyone working as software architect, with the risk of changing how you view your job.

### [Patterns of Enterprise Application Architecture (by Martin Fowler)](https://amzn.to/35asCPr)

Another classic in this list, Patterns of Enterprise Application Architecture unfortunately was quite a dull read for me. Similar to Domain-Driven Design, the stale stench of Java emitted from the book took some getting used to, and that it is more a list of patterns than an interwoven story made it even harder to read. I still think that I learned a lot from it, so I would recommend to at least have a look at the book before dismissing it completely, just be prepared for a tough read.

### [Living Documentation (by Cyrille Martraire)](https://amzn.to/3rNc4XD)

The last book I read from this category was way more specialized than the others, but also the best of the bunch. In Cyrille Martraire's Living Documentation he poses the question how to transfer knowledge in an organization and which role documentation can play. The main idea is to not separate documentation from code, but instead to bring them as close together as possible, so that it becomes as hard as possible to change one without the other. Some ideas that especially stuck with me:

- Automatically create diagrams from code
- Add onboarding examples to the codebase to show how things are done around here
- Do not duplicate documentation, but instead link to it, e. g. instead of describing the build process in the readme, link to the commented build config file

This is a **must-read** for anyone who needs to introduce others to a codebase more than once per year.

## Product/Engineering Organizations

### [Shape Up (by Ryan Singer)](https://basecamp.com/shapeup)

Basecamp is known for some unconventional management techniques. With Shape Up, they published a free book on their product management philosophy. It revolves around 6 week blocks of time, so called bets, where teams work on their own on topics and find the best solution possible within this limited time. The main idea is to fully commit to an idea for 6 weeks and give full freedom to the team to implement during this time, but to reevaluate priorities without thinking about sunk cost after.

The book is a short read, and if you are building a product organization will give you helpful ideas.

### [Team Topologies (by Matthew Skelton)](https://amzn.to/3oinwsa)

While Shape Up is already almost old, Team Topologies is still the rage in tech organization literature. There are already quite a few blog posts summarizing the book (e. g. [this one](https://medium.com/swlh/how-to-structure-teams-for-building-better-software-products-91e4dea021d)), but in a sentence, it is about the following ideas: Build teams that can create full customer solutions start to finish on their own and teams that create tools for enabling the first group.

If you are building a product development organization of more than 10 people, **read this book** before it becomes too late.

### [Radical Candor (by Kim Scott)](https://amzn.to/3hE3824)

Those who know me (or have read my [GitHub profile](http://github.com/dbartholomae)) know how highly I value transparency and honesty. This book is right up my alley: As a leader, be honest and direct about your feedback to your employees. Be polite, and, more importantly, empathic, but bring out any problems you might encounter as soon as possible, so people actually get a chance to change.

This is a **must-read** for anyone in a leadership position.

### [Dynamic Reteaming (by Heidi Helfand)](https://amzn.to/2X7jdUz)

The last book I read this year I stumbled upon via [this infographic](https://miro.com/app/board/o9J_lbBZIAM=/) which mentioned a lot of good books I had already read – and this one. Even though it talks about tech, it is actually a quite general book on organization and how to form and disband teams. It's a collection of methods to use when splitting, merging, building, or disbanding teams to make the process more effective and reduce the time needed for teams to grow together. Apart from some specific workshop formats, this also emphasized the idea for me that teams do not only need a ritual when forming but also when disbanding.

If you are in the process of reorganizing your org, or if you have a lot of team churn, you should have a look.

## Others

### [Form Design Patterns (by Adam Silver)](https://www.smashingmagazine.com/printed-books/form-design-patterns/)

The first outlier this year is a book about writing forms in HTML, CSS, and JavaScript. I stumbled upon it in [Smashing Magazine](https://www.smashingmagazine.com/) (who also published it) and fell in love with the idea of an in-depth book about a small part of software engineering. There are a lot of great learnings in the book: How to make form elements that work in HTML, but work better if JavaScript is enabled. Or how to deal with accessibility. But it is not all sunshine. The HTML examples are hard to follow (I was reading it on my phone as all other books), so I skipped them. And some opinions are strongly colored by the author working mainly in frontend design, e. g. when he argues that usability trumps security.

If you are interested in frontend development, this is a good read.

### [Never Split the Difference (by Chris Voss)](https://amzn.to/355OJX9)

The last book in this list is one of the, if not the best book I read in 2020. Never Split the Difference by Chris Voss is a book about negotiation, written by an FBI hostage negotiator. The main idea: Just say no. As long as you know you will get an offer that is at least as good, decline offer after offer until you get an offer that is too good to say no to. There's obviously more to it, but for the details, you will have to read the book.

It's a **must-read** for everyone, especially if you are negotiating your salary for a new job.

## Outlook

For next year, I have a couple of books on my digital shelf. Currently, I'm reading the [AWS Certified Solutions Architect Study Guide](https://amzn.to/3pT1UTz), and there are reading samples for a lot more books waiting for me. If you want to follow along, feel free to [follow me on Twitter](https://twitter.com/intent/follow?original_referer=https%253A%252F%252Fstartup-cto.net%252F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=The_Startup_CTO&tw_p=followbutton) for more startup and tech related content. And if you do, please tweet to me: What books did you read in 2020? And what did you learn from them?
