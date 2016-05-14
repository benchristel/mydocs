# Sane Defaults for Software Developers

Sane Defaults

1. use git
1. test first
1. write a failing test for every change - at the very least, every change where you are unsure of the implementation. Test at the boundary of the system you're uncertain about.
1. Pair, at least for relatively simple things. If you find that you need to research, spike, or do a major refactor, timebox the work and split up. Then review your findings with your pair. Doing this prevents developers from shooting down their pair's ideas while they're only half-baked, and removes the bias toward code that only makes sense when you were involved in writing it.
1. Do not use comments as developer documentation, since they often get out of sync with the code. Instead, rely on tests to document how a subsystem should be used, and on commit messages to explain why a change was made. Write tests and commits with these goals in mind. As a corollary, reconsider your design if your tests don't read like usage examples.
1. Keep test doubles in your vocabulary, but don't make a habit of using them. It's often possible to restructure code so the "hard part" (i.e. the part you want to test) has no dependencies that need to be stubbed. If you need test doubles, you'll know.
1. Prefer monoliths until you know that your monolith can be split into multiple independent subsystems. Coupling between systems that cannot be rejoined will destroy the quality of your product.
1. Every architectural decision makes some features less costly at the expense of making others more costly. If you can, identify each space of features and discuss the consequences of the architectural change with your product owner. In other words, don't use microservices just because they're trendy. Understand the costs and benefits of doing so.
1. It may be easier to prefactor (make the change easy, then make the easy change) rather than hack something in and refactor afterwards. Recognize that prefactoring is risky (you can get it wrong) while hacking and refactoring is costly.
1. use a procedural style unless OO or functional styles have clear benefits. It's easier to refactor procedural code. As a corollary, use a language that supports multiple paradigms.
1. When faced with duplication, extract a reusable unit only when the requirements of its callers cannot diverge -- that is, only when the duplicated instances express the selfsame concept.
1. write the simplest code that expresses your understanding of the domain, but recognize the value of consistency.
1. "simplest" does not imply any of the following: fewest lines, fewest tokens, fewest methods, fewest bytes sent over the wire, fewest classes, smallest functions, smallest classes, least duplication, fewest explicit concepts. These are all okay heuristics for simplicity, but are not identical with it, and many of them are in tension.
1. To determine if code is simple, ask yourself -- "knowing what I know now, if the codebase was lost tomorrow and we had to rewrite it from scratch, would I write this part the same way again? Would I even remember how? If the answer is "no", the code can be improved.
1. Refactor incrementally, but don't refactor without a plan. If you see smelly code but don't know how to make it better, leave it until you have more information.
1. do not anticipate future needs, unless some part of the system is really hard to change (e.g. a database schema). Do anticipate edge cases of present needs -- e.g. handle errors gracefully.
1. express assumptions in code. If you assume that a parameter can't be null, assert that it's not null. If you dislike runtime assertions, leverage the type system to make the check static instead.
1. Do not mutate data unless the mutation corresponds to a change in the real world. Use immutable name bindings and data structures by default.
