# Code Quality

TOC:

- what is code quality?
- why is it important?
- how do we create it?

- Detailed Advice
- Use TDD
  - Red-Green-Refactor
  - Unit tests vs. Integration Tests
    - Mocks and Stubs
  - RSpec Style
- Mitigate Risk
  - Validations/Assertions
  - Monitoring
  - Designing for Tooling
- Code for Communication
  - Message-oriented programming
  - Naming (domain language)
  - Composition vs. Inheritance
  - Self-documenting assertions
  - Tests as documentation
- Avoid Spaghetti Code
  - Use and maintain clean abstractions
  - SRP
- Avoid Spaghetti Teams
  - Maintain a clean interface between dev and product
  - If PMs are describing feature requirements in terms of your database schema, you are on the way to destruction.
- Design for Change (even though YAGNI)
  - Flexible Parameters
  - Return Objects


## What is code quality?

This document is about _code quality_. Here's my attempt at a definition of that term:

**Code quality is the inverse of the cost of code change. That is, code is high-quality when the cost of changing it is low. Ideally, the cost of change should be roughly proportional to the length of a thorough human-language specification of the change, and the proportionality constant should be as small as possible.**

The cost of change can be affected by many factors:
- The presence of tests that exercise the behaviors of the existing code and demonstrate some degree of correctness
- The risk (of introducing bugs, losing data, or breaching security) associated with the change
- The amount of time that must be spent for the developers to understand what needs to change
- The amount of time required to add new tests or update existing ones to match the new specification
- The programming language and development tools used for the project

> Whoa! Bet you weren't expecting that last one. But if you define "high-quality" as "easy and safe to change", it's clear that the choice of programming language has a big effect on code quality. In general, languages that offer higher levels of abstraction lend themselves to higher code quality, because the computer does more of the heavy lifing for you using thoroughly-tested (and in some cases, provably-correct) subsystems, such as interpreters, compilers, and query planners. Abstraction also leads to code that more closely mirrors the language we use to talk about it. It is often easier to understand the purpose of code written at a high level of abstraction.

Note that _performance_ is not one of the metrics. Performance is orthogonal to code quality. Good code can be fast, slow, efficient, or memory-leaky, and so can bad code. The difference is that if your code is high-quality, it's easier to identify and fix performance bottlenecks. It's true that performance tuning can lower the quality of code by impeding readability, but if you start from a well-factorized codebase, optimization changes should be small and isolated.

### It's not just about code

> From the metrics listed above, we can see that "code quality" can actually be affected by things other than the code itself. For example:
>
> - Tests affect "code quality"
> - Documentation affect "code quality"
> - Communication habits of the dev team affect "code quality"

## Why is code quality important?

The definition above suggests one obvious reason why code quality is important. We expect code to change frequently as new features are added, so minimizing the cost of code change will, other things equal, lower the total cost of a software project.

However, there are some less obvious benefits. For one, good code can be used to exemplify best practices to junior developers. In other words, code quality reduces the cost of maintaining code quality.

In addition to lowering the cost of change, we often want to lower the unpredictability in the cost of change. This can be important for long-term planning (e.g. scheduling release dates, knowing when a particular feature will be delivered). Debugging is the piece of software development least amenable to timeboxing. If you find a bug in software that has no tests, it's next to impossible to know upfront whether it will take you an hour or a week to track down and fix. And if the code has no tests, fixing one bug can introduce others. Investing time in code quality can make the cost of change more predictable by reducing the amount of time you spend debugging.

## How do we create and maintain code quality?

Okay, enough theory. How do we actually *write* high-quality code?



- **Use Test-Driven Development.** TDD, and its cousin, Behavior-Driven Development, can be used to ensure that code is easy to test, understand, and change.
- **Write Self-Documenting Code.** Code is easiest to change when it clearly expresses both what it does and why. Such code may require little or no additional documentation, which lowers maintenance costs as there is less documentation to be kept in sync with the code.
- **Rely on Abstractions, Not Concretions.** Build abstractions so that your code mirrors the business logic that governs it. Concrete implementation details (your choice of RDBMS, cloud storage solution, database schema, etc.) can change for reasons unrelated to your business logic. By relying on interfaces that hide those implementation details, you can minimize the disruption to your code when requirements change.
- **Create Watertight Abstractions.** The caveat to the above is that your abstractions must be reliable. If they don't do what you expect, you will end up with code that looks correct but is subtly broken. Integration tests can help you verify that the system as a whole is behaving correctly, while unit tests can be used to thoroughly exercise the abstractions you build yourself.

### It all comes back to tests

I've mentioned tests in a lot of the bullet points above. That's no accident; tests are the key ingredient for reducing the cost of change.

- Tests are living documentation
- Tests help you verify correctness
- Tests help minimize the risk associated with change, by telling you when a change broke something
- Tests teach you how to architect your code. If a unit test is hard to write, then you may want to rethink your design.



## This all sounds really boring, and also hard

Someday, I'll figure out how to write about code quality in a way that makes readers feel the way I do about it. Until then, you'll just have to take my word for it: working with bad code will make you feel confused, frustrated, and stupid. Writing great code will make you feel like a genius, and reading others' great code can be a delight and an inspiration. 

Keeping your code consistently high-quality is a challenge. But I think it's a challenge well worth meeting if your project has more than a few lines of code. The first 