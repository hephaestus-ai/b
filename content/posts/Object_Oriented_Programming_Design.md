---
---

## Object-Oriented Programming Design Hints

SOLID, GRASP, Outerhout, etc.

adapted from old notes. less relevant now, but still relevant...
Add these to a prompt. The age of generative AI


## Volatility Management

### How to Reduce Cost of Changeability

#### Open/Closed Principle

#### Liskov's Substitution Principle

#### Design Patterns

#### Composition over inheritance

Design and document with inheritance in mind, otherwise prohibit it.

### How to Increase Cost of Changeability

#### Eliminate Ambiguity Ruthlessly

### Testability

Tests both reduce and increase costs of change in different locations.

#### Dependency Inversion Principle

## Intelligibility

least astonishment

### Conform to Convention

### Familiarity and the Principle of Correspondence

### Conform to A Mathematical Object

### Conform to a 'Model'

### Self-Documentation

Use self-explanatory, simple, and as specific as possible names. Documentation helps keep abstraction from leaking inside the programmer’s mind. Document inside the code, ideally; allow access to documentation programatically with help function. Document states and lifecycles. 

### Simplicity and Smart Objects

'Deep' functions

Small as possible but no smaller. When in doubt leave it out. Power-to-weight ratio test.

Reduce burder of correctness on the user

Don’t assume the API user is an expert. Leave hard things to experts.

When intelligence is trying to live in multiple places, you often end up with an adversarial relationship

Exception to the rule: sometimes the 'intelligence' in your system must be external (e.g. an API that allows you to move a character around with wasd keys)

#### 'Principle of least visibility'

#### Interface Segregation Principle

### Modularize

Make your architecture out of small, composable units that could function as libraries

### SRP and DOTADIW

### How Many Ways to Use It?

#### Layer Highly Opinionated Upon Unopinionated

### Nouns Over Verbs (Usually)

### To Nest or not To Nest?

### High Cohesion and Low Coupling

### The Law of Demeter

### Worse is Better

But why?

## Reliability and How to Handle Errors

### Utilize the Type System

'parse, don't validate'. But also recognize the limits of your type system; it cannot check everything.

Avoid return values that require special processing or a special check.

### Respect Hyrum’s Law in Proportion

### Specify your 'Failure Regime'

### Plug All Leaks

### Prefer Statelessness

### Use Exceptions (and Errors) in a Principled Way

Eliminate as many extra exceptions as possible. Favor unchecked exceptions.
Give useful information when there’s an error or exception. (C++ compiling errors is not an example of useful information)

### Exception Handling Chains of Responsibility

### Advanced Exception Handling Strategies

## Security

## How to Construct your Object

#### Flowchart

## How to Destruct your Object

## Anti-patterns

## Wrapping Up