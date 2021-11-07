# ODiff 

## A utility inspired by [deep-object-diff](https://github.com/mattphillips/deep-object-diff) (dod) that leverages the Functional Programming (FP) library [Ramda](https://github.com/ramda/ramda)

### Objectives for writing ODiff

- Learn more about functional programming using JavaScript/TypeScript
- Test - in an unscientific manner - some assumptions I've come across regarding FP
- Convey some impressions of attempting to use FP

### TL;DR

I concluded that following good FP principles guides has a greater potential to result in code that can be used again. This in turn can ease maintainability and has the potential to result in better tests. However, writing declarative code, it is often more difficult to produce code that performs as well as imperative code could. I believe most projects would benefit more significantly (in terms of costs) from code reuse than from better performing code. FP is probably better suited for projects where new operations are being added to existing things.

## Sidebar

Computer science professor [Norman Ramsey](https://www.cs.tufts.edu/~nr/)'s [perspective on FP and OOP](https://stackoverflow.com/questions/2078978/functional-programming-vs-object-oriented-programming/2079678#2079678).

In his words:

- Object-oriented languages are good when you have a fixed set of *operations* on *things*, and as your code evolves, you primarily add new things.  This can be  accomplished by adding new classes which implement existing methods, and the existing classes are left alone.
- Functional languages are good when you have a fixed set of  *things*, and as your code evolves, you primarily add new *operations* on existing things. This can be accomplished by adding new functions  which compute with existing data types, and the existing functions are  left alone.

## Conclusions pertaining to this project only

### Code Re-use and maintainability

My code consists of a single `diffWith` function that employs 4 predicates: `added`, `deleted`, `updated`, and `all` to create `addedDiff`, `deletedDiff`, `updatedDiff` and `diff`. The dod code ends up with 4 largely similar but separate functions for `addedDiff`, `deletedDiff`, `updatedDiff` and `diff`. Hence in the dod codebase, when a bugfix was initiated for objects of type `Date`, it had to be implemented in a roughly similar way in all 4 functions. 

Which begs the question: what's so special about `Date`? Why didn't the dod codebase handle it correctly to begin with? I believe it was because the authors were more interested in writing code to do the deep object diff problem correctly than they were in writing re-usable code. In utilizing Ramda, I tended to break up the problem in chunks that mapped to the methods I already had available in Ramda. I ended up never having to (or wanting to) consider the `Date` class separately from other objects because the authors of Ramda were interested in writing good, re-usable functions like R.equals and R.keys. `Date` had to be accounted for in a special manner in the dod codebase because a `Date` is an object that has no keys. And if you use that codebase to do a diff on objects that differ only in their private properties, you will end up with a questionable result. Now almost no users of `diff` would be interested in comparing two objects which have relevant private properties that are not `Date`s. But you never know for sure. And if another class like `Date` comes along, it will have to be dealt with in a special manner too.  

Functional, declarative programming does seem to promote greater code re-use and maintainability when there a fixed set of *things* on which new *operations* are being added as is the situation when writing a deep object diff. It's not that the dod codebase was written in an OOP style, but that it was more imperative in style and had to get to the business of writing the diff as opposed to writing re-usable utility functions. The advantage that dod has is that it is much smaller and performs better. 

### Assumption: FP dramatically reduces the testing burden

I did not find that I could reduce the number of tests in [deep-object-diff](https://github.com/mattphillips/deep-object-diff) (dod) in any meaningful way. Nor did I find the need to change the tests. I ended up with a greater appreciation for the value of test-driven development. I found the tests in dod to be written thoughtfully enough that, unchanged, they guided and shaped the code I wrote. I began utilizing the tests only after I had partially working code. If I had not done it that way, I think I would have risked losing sight of the larger idea behind the `diff` function and spent too much time focusing on passing the next test.

One aspect of testing that did not come up was mocking things like databases, and other dependencies. Here, I think FP should win out because it clearly favors pure functions. So what's to be done when the function has to manipulate a database? I think part of the answer is explicitly injecting database connections and the like as dependencies (parameters) as opposed to creating those connections within the function body. Another part of the answer is using currying to create functions on the fly that clearly store and use state passed to them as parameters. 

### Assumption: FP code is more intuitive to read

This is subjective, but yes. Despite my somewhat ambiguous choice in variable names - `keys` for example -, `R.union(R.keys(s), R.keys(p))` provides a pretty good clue in terms of what's being stored in the `keys` variable. 

### Assumption: FP code is less intuitive to write

Again, subjective, but yes. When writing code, I'm more inclined to think of imperative instructions. When I'm not writing code, I think declaratively most of the time! Declarative programming is not the same as FP though. There is a deeper mathematical structure to FP where writers benefit strongly from understanding concepts like algebraic structures, etc.

## General Impressions and Reflections

I had much more fun writing code than when I hemmed and hawed about UML diagrams and how best to choose to define a class or what Gang of Four design patterns could best be utilized for the problem at hand. When writing code at this level, (deep object diffs as opposed to a user interface), it's hard to justify an OOP approach. And when I write imperative code or impure functions, I'm not as confident about how re-usable the code is. FP got me thinking along the lines of code re-use, explicitly passing parameters in because I wanted to write pure functions. Ramda also provides the `R.curry`, `R.pipe` and `R.compose` functions to ultimately make it easier to follow good FP practice and write re-usable code. 

## Further areas for study

- Test Driven Development
- Algebraic structures, type classes, & more mathematical underpinnings
- Dependency injection in FP