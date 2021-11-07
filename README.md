# ODiff 

## A utility inspired by [deep-object-diff](https://github.com/mattphillips/deep-object-diff) (dod) that leverages the Functional Programming (FP) library [Ramda](https://github.com/ramda/ramda)

### Objectives for writing ODiff

- Learn more about functional programming using JavaScript/TypeScript
- Test - in an unscientific manner - some assumptions I've come across regarding FP
- Convey some impressions of attempting to use FP

### TL;DR

## Sidebar

Computer science professor [Norman Ramsey](https://www.cs.tufts.edu/~nr/)'s [perspective on FP and OOP](https://stackoverflow.com/questions/2078978/functional-programming-vs-object-oriented-programming/2079678#2079678).

In his words:

- Object-oriented languages are good when you have a fixed set of *operations* on *things*, and as your code evolves, you primarily add new things.  This can be  accomplished by adding new classes which implement existing methods, and the existing classes are left alone.
- Functional languages are good when you have a fixed set of  *things*, and as your code evolves, you primarily add new *operations* on existing things. This can be accomplished by adding new functions  which compute with existing data types, and the existing functions are  left alone.

## Conclusions pertaining to this project only

### Code Re-use and maintainability

My code consists of a single `diffWith` function that employs 4 predicates: `added`, `deleted`, `updated`, and `all` to create `addedDiff`, `deletedDiff`, `updatedDiff` and `diff`. The dod code ends up with 4 largely similar but separate functions for `addedDiff`, `deletedDiff`, `updatedDiff` and `diff`. Hence in the dod codebase, when a bugfix was initiated for objects of type `Date`, it had to be implemented in a roughly similar way in all 4 functions. 

Which begs the question: what's so special about `Date`? Why didn't the dod codebase handle it correctly to begin with? I believe it was because the authors were more interested in writing code to do the deep object diff problem correctly than they were in writing re-usable code. In utilizing Ramda, I tended to break up the problem in chunks that mapped to the methods I already had available in Ramda. I ended up never having to (or wanting to) consider the `Date` class separately from other objects because the authors of Ramda were interested in writing good, re-usable functions like R.equals and R.keys. `Date` had to be accounted for in a special manner in the dod codebase because a `Date` is an object that has no keys. And if you use that codebase to do a diff on objects that differ only in their private properties, you will end up with a questionable result. Now almost no users of `diff` would be interested in comparing two objects which have relevant private properties that are not `Date`s. But you never know for sure. And if another class like `Date` comes along, it will have to be dealt with in a special manner too.  

### Assumption: FP dramatically reduces the testing burden

I did not find that I could reduce the number of tests in [deep-object-diff](https://github.com/mattphillips/deep-object-diff) (dod) in any meaningful way. Nor did I find the need to change the tests. I ended up with a greater appreciation for the value of test-driven development. I found the tests in dod to be written thoughtfully enough that, unchanged, they guided and shaped the code I wrote. I began utilizing the tests only after I had partially working code. If I had not done it that way, I think I would have risked losing sight of the larger idea behind the `diff` function and spent too much time focusing on passing the next test.



### Assumption: FP code is more terse (less boilerplate)

### Assumption: FP code is more intuitive to read

### Assumption: FP code is more intuitive to write

## General Impressions and Reflections

## Inferences that could be made to other projects

## Further areas for study

- Test Driven Development