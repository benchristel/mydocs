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
- Design for Change (even though YAGNI)
  - Avoid Spaghetti Code
  - Flexible Parameters
  - Return Objects
  - Use and maintain clean abstractions
  - SRP 
- Avoid Spaghetti Teams
  - Maintain a clean interface between dev and product
  - If PMs are describing feature requirements in terms of your database schema, you are on the way to destruction.



## What is code quality?

This document is about _code quality_. Here's my attempt at a definition of that term:

**Code quality is the inverse of the cost of code change. That is, code is high-quality when the cost of changing it is low. Ideally, the cost of change should be roughly proportional to the length of a thorough human-language specification of the change, and the proportionality constant should be as small as possible.**

The cost of change can be affected by many factors:
- The presence of tests that exercise the behaviors of the existing code and demonstrate some degree of correctness
- The risk (of introducing bugs, losing data, or breaching security) associated with the change
- The amount of time that must be spent for the developers to understand what needs to change
- The amount of time that must be spent to actually make the change
- The amount of time required to add new tests or update existing ones to match the new specification
- The programming language and development tools used for the project

Note that _performance_ is not one of the metrics. Performance is orthogonal to code quality. Good code can be fast, slow, efficient, or memory-leaky, and so can bad code. The difference is that if your code is high-quality, it's easier to identify and fix performance bottlenecks. It's true that performance tuning can lower the quality of code by impeding readability, but if you start from a well-factorized codebase, optimization changes should be small and isolated.

## Why is code quality important?

The definition above suggests one obvious reason why code quality is important. We expect code to change frequently as new features are added, so minimizing the cost of code change will, other things equal, lower the total cost of a software project.

However, there are some less obvious benefits. For one, good code can be used to exemplify best practices to junior developers. In other words, code quality reduces the cost of maintaining code quality.

In addition to lowering the cost of change, we often want to lower the unpredictability in the cost of change. This can be important for long-term planning (e.g. scheduling release dates, knowing when a particular feature will be delivered). Debugging is the piece of software development least amenable to timeboxing. If you find a bug in software that has no tests, it's next to impossible to know upfront whether it will take you an hour or a week to track down and fix. And if the code has no tests, fixing one bug can introduce others. Investing time in code quality can make the cost of change more predictable by reducing the amount of time you spend debugging.

## How do we create and maintain code quality?

Okay, enough theory. How do we actually *write* high-quality code? Let's rephrase the code-quality metrics as goals:

- Demonstrate that the code is correct
- Reduce the risk of bugs, data loss, or security breaches caused by change
- Make it easy for someone else to understand your code
- Make it easy for someone else to change your code once they understand what it does
- Make it easy to keep documentation in sync with code
- Choose languages and tools that facilitate your work

Many of the techniques for maintaining code quality target more than one of these goals, so the rest of this section will be structured as a list of techniques. I'll describe each one, and point out which goals it helps us reach.

Specific examples in this section will be geared towards web development with Ruby on Rails, since that's what I'm most familiar with.

### Use Test-Driven Development

Test-Driven Development (TDD) has a pretty specific methodology for how software should be developed, but the core of it is that automated tests should be written before the code they're supposed to test.

At first glance, this seems absurd. How can you test something that doesn't exist yet? But it's actually a very powerful strategy that emerges from a somewhat counterintuitive philosophy about why tests are valuable.

You could view automated tests as a way of demonstrating that "finished" software is indeed behaving correctly and ready to ship. However, their value for that purpose is limited. Passing tests will continue to pass as long as the code they exercise does not change. If you write tests just before shipping, most of them will pass. Your tests might uncover one or two bugs, but mostly they're just there to prove to your code reviewer or manager what you've already proven to yourself through manual tests and debugging.

If you instead write the tests before the implementation, you spend the same amount of time and effort on them, but the benefit is much greater. You no longer have to do so much manual testing and debugging before sending your code off for review.

There are other benefits to writing tests first. Believe it or not, tests have as many bugs as the code they're testing, and if you only test when the code is complete, it's possible to write a test that passes but doesn't assert the behavior you want. TDD protects you from that via the _red-green-refactor_ cycle. The idea is that if you write a test for a feature you don't have yet, it should fail (red). If it *doesn't* fail, your test is borked. Then, when you implement the feature, the test should pass. If it doesn't, either your implementation or your test is wrong. When you get your tests to pass (green), you can then refactor both your tests and your implementation, running your tests at each refactoring step. This gives you assurance that the refactoring is correct.

The cost of refactoring is superlinear in the amount of code being refactored<sup>[citation needed]</sup>. Refactoring only after all the code is written is therefore suboptimal; it's much better to refactor as you're writing the code. The only sane way to do that is to keep your code covered by tests as you write it.

Having any tests at all helps you toward the following goals:

- Demonstrate that the code is correct
- Reduce the risk of bugs, data loss, or security breaches caused by change

Using TDD helps you toward these goals:

- Make it easy to understand your code
- Make it easy to keep documentation in sync with code

I use RSpec to 

### TDD Tech Tree

Here's a tech-tree-like diagram showing how TDD is a prerequisite for all that's good in the world:

```
        +--> Assurance of correctness                      +-> Better emergency tooling
       /                                                  /
      +----------------------+--> Loosely-Coupled Design +---> Ease of making changes
     /                      /
TDD +---> Safe Refactoring +--> Lower Risk
     \
      +-> Self-Documentation +---> Ease of communication
                              \
                               +-> Ease of doc maintainance
```

TDD encourages loosely coupled design by forcing you to create components that can be unit tested. You still have to think about your design, of course, but unit tests will point out when a class sends too many different messages because you'll have to stub all of those outgoing calls.

Loosely-coupled design, in turn, gives you better tools when you need to respond to an emergency. There's less need to write ad-hoc database queries or cleanup scripts -- you can just copy-paste from your production code. Loosely-coupled code can often be reused for monitoring, as well.

Loosely-coupled components are easier to change.

TDD enables safe refactoring by covering your behavior in tests. Assuming you don't do silly things like test (or stub) private methods, refactoring within a class should not require any change in tests, and refactoring an entire system will only require changes to unit tests. If your refactor breaks existing behavior, the tests will tell you.

TDD gives you executable documentation for your code. Even if your code is totally opaque (and if you use TDD, it probably won't be), good tests will tell maintainers what it does and why.

Self-documenting code makes it easier for developers to communicate.

Self-documenting code means less time spent maintaining separate documentation.

### Monitor your services

Logging to a flat file and then grepping that file when you have a problem is minimally useful. You should have some sort of tooling to make it easy to search logfiles, and perhaps visualize the data. Splunk provides great tools for this.



Using TDD 

###

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