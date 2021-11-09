# ODiff 

## A utility inspired by [deep-object-diff](https://github.com/mattphillips/deep-object-diff) (dod) that leverages the Functional Programming (FP) library [Ramda](https://github.com/ramda/ramda)

### Objectives for writing ODiff

- Learn more about functional programming using JavaScript/TypeScript
- Test - in an empirical manner - some assumptions I've come across regarding FP
- Convey some impressions of attempting to use FP

### TL;DR

Notionally, following good FP guidelines increases the likelihood of code reuse. In turn, code reuse can ease maintainability and has the potential to result in better, more focused tests. However, when writing declarative code, it is often more difficult to produce code that performs as well as imperative code could. FP is probably better suited for projects where new operations/functions are being added to existing things/types.

## Sidebar

Computer science professor [Norman Ramsey](https://www.cs.tufts.edu/~nr/)'s [perspective on FP and OOP](https://stackoverflow.com/questions/2078978/functional-programming-vs-object-oriented-programming/2079678#2079678).

In his words:

- Object-oriented languages are good when you have a fixed set of *operations* on *things*, and as your code evolves, you primarily add new things.  This can be  accomplished by adding new classes which implement existing methods, and the existing classes are left alone.
- Functional languages are good when you have a fixed set of  *things*, and as your code evolves, you primarily add new *operations* on existing things. This can be accomplished by adding new functions  which compute with existing data types, and the existing functions are left alone.

## Conclusions pertaining to this project

### Code Reuse and maintainability

My code consists of a single `diffWith` function that employs 4 predicates: `added`, `deleted`, `updated`, and `all` to create `addedDiff`, `deletedDiff`, `updatedDiff`, and `diff`. The [deep-object-diff](https://github.com/mattphillips/deep-object-diff) (dod) code ends up with 4 largely similar but separate functions for `addedDiff`, `deletedDiff`, `updatedDiff`, and `diff`. Hence, in the dod codebase when a bugfix was initiated for objects of type `Date`, it had to be implemented in a slightly different way in all 4 functions. 

Which begs the question: what's so special about `Date`? Why didn't the dod codebase handle it correctly to begin with? I believe it was because the authors were more interested in writing code to do the deep object diff problem correctly than they were in writing reusable code. In utilizing Ramda, I tended to break up the problem in chunks that mapped to the methods I already had available in Ramda. I ended up never having to (or wanting to) consider the `Date` class separately from other objects because the authors of Ramda were interested in writing good, reusable functions like R.equals and R.keys. `Date` had to be accounted for in a special manner in the dod codebase because a `Date` is an object that has no keys. And if you use that codebase to do a diff on objects that differ only in their private properties, you will end up with a questionable result. Now almost no users of `diff` would be interested in comparing two objects which have relevant private properties that are not `Date`s. But you never know for sure. And if another class like `Date` comes along, it will have to be dealt with in a special manner, in all 4 functions.  

Functional, declarative programming does seem to promote greater code reuse and maintainability when there is a fixed set of *things* on which new *operations* are being added, as is the situation when writing a deep object diff. It's not that the dod codebase was written in an OOP style, but that it was more imperative in style and had to get to the business of writing the diff as opposed to writing reusable utility functions. The undeniable advantage that dod has is that it is much smaller and performs slightly better. 

### Assumption: FP dramatically reduces the testing burden

I did not find that I could reduce the number of tests in [deep-object-diff](https://github.com/mattphillips/deep-object-diff) (dod) in any meaningful way. Nor did I find the need to change the tests. Quite unexpectedly, I ended up with a greater appreciation for the value of test-driven development. I found the tests in dod to be written thoughtfully enough that, unchanged, they shaped the code I wrote. I began utilizing the tests only after I had partially working code. If I had looked to the tests before writing any code, I fret that I might have lost sight of the larger idea behind the `diff` function myopically focused on passing the next test.

One aspect of testing that did not come up was mocking dependencies like databases. Here, I think FP would shine because guidelines clearly favor pure functions. So what's to be done when a function has dependencies? I think part of the answer is explicitly injecting dependencies (parameters) as opposed to creating them inside the function. Another part of the answer is using currying to create functions on the fly that clearly store and use state passed to them as parameters. 

### Assumption: FP code is more intuitive to read

This is subjective, but yes. Despite my somewhat ambiguous choice in variable names - `keys` for example -, `R.union(R.keys(p), R.keys(s))` provides a pretty good clue in terms of what's being stored in the `keys` variable. 

### Assumption: FP code is less intuitive to write

Again, subjective, but yes. When writing code, I'm more inclined to think in terms of imperative instructions. When I'm not writing code, I think declaratively! Declarative programming is not equivalent to FP of course. There is a deeper mathematical underpinning to FP where writers benefit strongly from understanding abstractions like algebraic structures, etc. And that is where I imagine some difficulties can arise.

## General Impressions and Reflections

I enjoyed a great deal of personal satisfaction in writing FP code; I hold the promise of reusable code in very high regard and I am very fond of declarative syntax. FP got me thinking along the lines of code reuse early on. I explicitly passed parameters in because I wanted to write pure functions. Ramda also provides the `curry`, `pipe` and `compose` functions to simplify following good FP practice and writing reusable code.

I believe most projects would benefit more significantly (in terms of costs) from code reuse than from better performing code. However, it is much easier to create and understand code performance statistics than code reuse statistics. Perhaps there's an opportunity here to provide a tool that generates code reuse statistics.  

## Further areas for study

- Test Driven Development
- Algebraic structures, type classes, mathematical underpinnings
- Dependency injection and other patterns in FP
- Code reuse statistics