---
draft: true
title: "Sheaves from Scratch"
---

# Sheaves from Scratch

In this post I build sheaves from "scratch", at least from the point of view of set theory, starting from primitive notions such as the succession operator and climbing up a ladder of objects until sheaves come into view. I have tried to keep it relatively comprehensible to anyone with at least an understanding of basic set theory, spending time focusing especially on the "what" and "why", while keeping the detailed "how" separate and mostly non-essential.

This information was put together in response to a question in a Discord private conversation. I haven't seen a "from scratch" definition of sheaves anywhere, so I thought this might be useful. I often call these sorts of maximalist definitions "groundworks." I’d already laid most of it out across notes and messages, so assembling it all wasn’t too much work, despite the length.

I may break this post up later. As you will see, we build many other things from scratch as we work our way up to sheaves. Future posts may address schemes, manifolds, and other objects, since, once you understand sheaves, you're already much of the way to understanding how a large number of other complex objects are constructed. Future posts may also touch on various collections of implications one can derive from these definitions that are interesting.

{{< table_of_contents >}}

## TLDR


## Why Sheaves are Important


## Primitive Set Theory

{{< mediabox type="note" title="Box 1 – What to memorize" align="right" id="box1">}}
**Three set theoretic notions to memorize:**

* The symbol \$\in\$ reads “is an element of.”
* The relation \$\subseteq\$ reads “is a subset of”; every point of \$A\$ lies in \$B\$.
* **Extensionality:** two sets are equal exactly when they have the same elements.
{{< /mediabox >}}

Before we build anything sophisticated we need a place to stand. That place is a surprisingly small fragment of set theory - small enough to write on an index card, but rich enough to support everything that follows.

Start with one *universe* of discourse, which we’ll simply call **Set**. (If you're confused by the phrase "universe of discourse", it just means the set of all objects that are under consideration in a specific context or discussion; you don't need to understand this term fully). Think of it as the object containing every set we will ever talk about. Inside that object we highlight two relations between subobjects:

1. **Membership** \$\boldsymbol{\in}\$
 Saying \$a \in A\$ means *“the set \$a\$ sits inside the set \$A\$ as a single member.”*
 A classic point of confusion: \$a\subseteq A\$ is generally **false** if \$a\$ itself is an element - you can’t be both an element and a subset at the same time.

2. **Subset** \$\boldsymbol{\subseteq}\$
 We write \$A \subseteq B\$ when *every* element of \$A\$ is also an element of \$B\$.
 It’s worth pausing here: newbies often blur \$\in\$ and \$\subseteq\$ because both talk about “being inside” something. Remember - one compares a *set to a set*, the other compares a *set to its members*.

Everything else we need flows from a single guiding principle called the **axiom of extensionality**, written:

$$
A = B \quad\Longleftrightarrow\quad \forall x\,(x\in A\;\Leftrightarrow\;x\in B).
$$

TODO plain english reading of the expression...

In practice the axiom does two jobs. First, it keeps us rigorous - if you want to prove two sets are equal, you must check every element. Second, it lets us *rename* a set once we know its elements, sparing us from carrying around duplicate symbols.

That’s the entire skeleton. No power sets, no choice, not even unions yet - those arrive in the next section. For now, resist the urge to import heavier machinery; this lean framework (pun not intended) is enough to scaffold topology, presheaves, and ultimately sheaves.

A common stumble at this stage: treating \$\subseteq\$ as though it were symmetric. It isn’t. Saying \$A\subseteq B\$ puts a directional arrow from \$A\$ into \$B\$; going the other way requires its own proof. Forgetting that directionality later - when we restrict data or glue it - tends to snowball into bigger mistakes.

Take a moment to let these three notions settle. Once they feel second-nature you’ll be able to parse every definition that follows without stopping to untangle basic set theory ideas.

## Constructors Used by Topology

{{< mediabox type="note" title="Box 2 – What to memorize" align="right" id="box2">}}
**Four notions to memorize**

* \$\displaystyle\bigcup S\$ is the union of *every* set sitting inside the collection \$S\$.
* \$X\cap Y\$ is the ordinary intersection of two sets.
* Membership shortcuts:
 $$
 x\in\bigcup S \Longleftrightarrow \exists,T\in S;(x\in T)
 $$
 $$
 x\in X\cap Y \Longleftrightarrow x\in X\text{ and }x\in Y
 $$
* Intersections only shrink: \$X\cap Y\subseteq X\$ and \$X\cap Y\subseteq Y\$.
 {{< /mediabox >}}

The bare-bones set theory from the last section gives us a basic language to talk about sets, but it doesn’t let us *build* new ones. To do that we add two constructors that topology leans on constantly: arbitrary union and binary intersection.

#### Union

Take any collection of sets, call it \$S\$. We write

$$
\bigcup S
$$

for the set of all points that show up in at least one member of \$S\$. The rule is as simple as it looks:

$$
x\in\bigcup S \;\Longleftrightarrow\; \exists\,T\in S\;(x\in T).
$$

The plain english reading of this expression is basically: TODO

A point many people miss on first reading: \$\bigcup S\$ is a *one-step* operation. The whole family of sets is swallowed at once; there’s no hidden iteration. (why is this relevant?)

If \$S={(0,1),, (1,2)}\$ inside \$\mathbb R\$, then \$\bigcup S=(0,2)\$. Exactly the points that appear somewhere in the two intervals - no more, no less.

#### Intersection

For intersection we only need the binary case for sheaves. Given two sets \$X\$ and \$Y\$ we define

$$
X\cap Y=\{x\mid x\in X\text{ and }x\in Y\}.
$$

TODO plain english reading of the expression...

Nothing subtle here, but two elementary lemmas save headaches later:

$$
X\cap Y\subseteq X,\quad X\cap Y\subseteq Y.
$$

They look obvious; still, they are worth a spot in your memory. When we start restricting data on open sets, these inclusions justify every "of course this lands where it should" step.

With \$X=(0,2)\$ and \$Y=(1,3)\$ in \$\mathbb R\$ we get \$X\cap Y=(1,2)\$, strictly smaller than either parent. No surprises, and that’s the point - the constructor behaves exactly the way everyday intuition says it should.

Now, with union and intersection in place we finally have enough raw material to describe a topology: a family of subsets closed under union (the first operation) and stable under intersection (the second operation).

## Topological Space

{{< mediabox type="note" title="Box 3 – What to memorize" align="right" id="box3">}}
**Three topology notions to memorize:**

* A **topological space** is a set \$X\$ equipped with a collection \$\mathcal O\$ of subsets of \$X\$ called *open sets*.
* Axioms: (i) the whole space \$X\$ is open; (ii) any union \$\bigcup S\$ of open sets is open; (iii) the intersection \$U\cap V\$ of **two** open sets is open.
* Infinite intersections are *not* guaranteed to stay open—the “two” in axiom (iii) is doing real work.
{{< /mediabox >}}

Union and intersection let us manufacture new sets; now we decide which of those sets count as *open* and thereby fix the “geometry” of our universe.  Formally, a topology on a set \$X\$ is a choice of collection \$\mathcal O\$ satisfying the three axioms in the box.  Think of \$\mathcal O\$ as a menu: each item on the menu is declared open, everything else is not.

Why these axioms and no others?  The short answer is that they capture the way neighborhoods behave in ordinary spaces like \$\mathbb R\$.

* **Whole space first.**  If *nothing* in \$X\$ were open, analysis would starve; making \$X\$ itself open guarantees at least one playground.
* **Unions are cheap.**  If every point already sits in one open set or another, pooling them shouldn’t break openness.  This encodes the intuition that you can enlarge a neighborhood as much as you like.
* **Finite intersections are safe.**  Two overlapping neighborhoods share a smaller neighborhood.  But the axiom stops at two: intersect an infinite tower of shrinking intervals \$(0,1/n)\$ and you drop to \${0}\$, which is *not* open in the usual topology on \$\mathbb R\$.

A classic trip-up is forgetting that *open* is always **relative to the chosen \$\mathcal O\$**.  The subset \$,(0,1)\subseteq(0,2)\subseteq\mathbb R,\$ is open for the usual topology, yet if you switch to the trivial topology \${\varnothing,X}\$ it suddenly isn’t.  Keep the phrase “open in \$X\$” in your mental subtitles every time you see the word.

One other snag: some readers assume “finite intersections” means “any finite collection.”  In practice you only ever need the two-set version; the three-set case follows by applying it twice, and so on.

With the concept of open sets pinned down we can finally talk about *local data*: information attached to each open subset.  That is the gateway to presheaves, which in turn set the stage for sheaves.  But first we package the opens themselves into a tidy type, so they can be manipulated without dragging the entire topology everywhere we go—next section.

### Topology from Power Sets

## Opens as a Subtype and Basic Operations

{{< mediabox type="note" title="Box 4 – What to memorize" align="right" id="box4">}}
**Three notions to keep in your head:**

* **Opens (X)** is the universe of open subsets of $X$.
* $V \subseteq_o U$ means: $V$ is contained in $U$ *and both are open*.
* The intersection of two opens is again open, and it never makes either set larger.

These three bullets are the real cargo we need later when we define how to *restrict* data from one open set to another and, ultimately, how to glue local data into something global.
{{< /mediabox >}}

Up to now we’ve been talking about open sets inside a topological space, but they’ve lived implicitly within the definition of the space itself. At this stage, we pull them out into their own setting - without introducing any computational baggage.

Concretely, if $X$ is our space, we bundle all of its open subsets into a new type, called $\mathrm{Opens}(X)$. Think of an element of $\mathrm{Opens}(X)$ as "just an open set," and nothing more. Under the hood, each "open" carries *two* pieces of data: the set itself, and a guarantee that it really is open in $X$. From there, we can treat it like an ordinary set when needed.

If you’ve ever fumbled the notation $V \subseteq_o U$, here’s the catch: it doesn’t mean just any subset relation. It means "$V$ and $U$ are both open, and every point of $V$ lies in $U$" but the little circle reminds you that you're only comparing open sets. Don’t lose sight of that.

We also want to intersect two open sets and remain inside the world of opens. Definitionally, it’s no surprise that:

$$
\mathrm{openInter}(U, V) = U \cap V,
$$

and the topology axioms guarantee that $U \cap V$ is still open. These two facts give us two easy but crucial properties: when you intersect, you don’t accidentally "grow" your set. In plain terms:

* intersecting with $V$ can only shrink $U$, and
* intersecting with $U$ can only shrink $V$.

Here’s a quick sanity check: imagine $X = \mathbb{R}$ with the usual topology, let $U = (0, 2)$ and $V = (1, 3)$. Then $\mathrm{openInter}(U, V)$ is just the interval $(1, 2)$. Everything behaves exactly as you’d expect from high school intuition.

Behind the scenes, this construction simply takes the intersection of the underlying sets and verifies that the result is still open. The key point is that we've created a standalone type for open sets, complete with its own subset relation and intersection operation. These are the building blocks for restriction maps on presheaves and, eventually, the gluing conditions in a sheaf. Lose these details, and you’ll quickly get lost when we start talking about "compatible families" on overlaps.


## Presheaf and Sheaf of Sets

## Constructable Sheaves

## Wrapping Up
