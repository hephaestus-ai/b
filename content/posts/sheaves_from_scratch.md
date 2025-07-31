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

In short, a sheaf is a machine for turning local, overlapping pieces of information into a consistent global picture, and for telling you precisely when that fails. While reading through this section is *optional*, before we start laying out details it might help to know what we are building toward. "Sheaf" can sound forbiddingly abstract, yet the idea is less exotic than the name, and once you start thinking in sheaves you'll see them everywhere. The understanding of sheaves, like many fundamental mathematical concepts, confers a superpower that will help you organize and understand problems and their features more quickly. Perhaps a quick way to see it is by looking at some examples.

#### The Engineer’s View

If you want to describe a global sensor grid monitoring temperature over a large facility you might eventually discover that you're just dealing with a sheaf. Each sensor reports only for the room it occupies; adjacent rooms overlap in their coverage because data packets sometimes drop. You want a single, up-to-date heat map of the whole building, but you will only trust a reading if every overlapping sensor agrees on the shared region. A sheaf formalises exactly that: it assigns a *set of possible data states* to every room (open set) and tells you whether those states are compatible on their overlaps. If they are, the sheaf produces one coherent building-wide state; if not, it points to the conflict. From a systems perspective, this is a recipe for resilient data fusion and graceful degradation.

A rules engine where each rule fires under a specific set of conditions is also secretly a sheaf. Overlapping rule sets can clash, so you attach to every condition-set the exceptions still in play, then insist that on overlaps the exception lists match. When they do, a single, conflict-free policy emerges; when they don’t, the sheaf pinpoints the minimal contradictory slice. In other words, debugging a snarled permission matrix is just cohomology in work clothes.

In a distributed system with half-trusting agents, each node keeps its own list of "normal" rules and "exceptions that override those rules." Lists themselves glue the same way ordinary data do, but the overrides form a second layer: you have to know whose exception beats whose when two agents disagree. That two-tier structure is exactly what a 2-sheaf (a stack) captures. A section over one agent is a pair (rule set, exception set); compatibility on an overlap checks that exceptions line up in priority. Gluing succeeds only when every clash can be resolved into a single, well-scoped override - no silent contradictions.

Type-theoretic semantics often need to interpret a program fragment "in a context," then extend that interpretation when more variables become visible. Contexts overlap when subroutines share free variables. A presheaf on the lattice of contexts captures how meanings restrict; making it a *sheaf* imposes a principled uniqueness condition that echoes referential transparency. Categorical models of dependent type theory exploit exactly this sheaf condition to guarantee that substitution behaves predictably.

In robotics, coverage problems for cooperating drones translate into sheaves over time-indexed configuration spaces.

In another post I plan on writing, I show how domain driven design (DDD) can be viewed as a 2-sheaf. (Indeed, whenever you have two things that "think" about the same underlying things with different ontologies, you're typically dealing with a 2-sheaf).

And so on.

#### The Scientist’s View

Experimental physicists treat many quantities such as temperature, pressure, electromagnetic potential, etc. as *fields*: functions defined on space-time that you usually measure only in patches. You integrate those patches into a global field by enforcing that neighbouring patches agree where they meet. Classical analysis handles smoothness or continuity; a sheaf pushes that idea further, handling not just numbers but any algebraic or logical structure you care to measure. Cohomology, born in algebraic topology, then quantifies the "obstruction" to globalising your field. In practice that obstruction detects things like magnetic monopoles or defects in a crystal lattice. The sheaf is the bookkeeping device, cohomology the diagnostic read-out.

TODO maybe tie to (co)bordism, idk

In topological data analysis, persistent cohomology detects shape in point clouds. The raw algorithm feeds a simplicial-complex sheaf into a cohomology engine; the resulting barcodes visualize when local clusters knit together. Newer techniques replace simplices with cosheaves to encode directed influence, useful in network flow and contagion models. Either way the sheaf language is what lets purely combinatorial data inherit geometric intuition.

TODO example from computational neuroscience?

#### The Mathematician’s View

Modern geometry, from Riemann surfaces to schemes in algebraic geometry, lives on the mantra "build globally by gluing locally." Charts of a manifold, affine pieces of a variety, even basic coordinate systems are local patches that must be stitched together on overlaps. Sheaves abstract that glueing process so cleanly that entire subjects - étale cohomology, Hodge theory, perverse sheaves - follow just by feeding different kinds of algebraic gadgets into the same framework. The slogan *"cohomology is the derived functor of global sections"* packages decades of theory into one line; without sheaves the slogan is meaningless.

TODO very useful for all sorts of local-to-global gluing challenges (global to local is obviously easy)

TODO there's a lot more to say here.

#### Less Conventional Examples - cryptography, poetry, etc

LLMs as sheaves: take any finite set of token bigrams—pairs $(w_i, w_{i+1})$. Call that set your "open context." A section over it is a probability distribution for the *next* token conditioned on those bigrams. Overlaps are smaller contexts that the big set and the next one down share; compatibility means the two distributions agree after marginalising to the overlap. Gluing all compatible local distributions is what a large language model learns during training: a single global rule that extends every fragment. Failures to glue would show up as places where the model assigns inconsistent probabilities to the same substring seen through two different neighbourhoods.

Unsurprisingly, linguistics has flirted with sheaf-like models where sentence fragments glue into discourse, though they have thus far (to my knowledge) lacked the mathematical discipline to describe language phenomena with full sheaves.

Distributed ledgers can be phrased in sheaf language: each block covers a slice of global state; overlaps check for double spends; the sheaf condition enforces ledger consistency without central control.

TODO gluing together chains in defeasible logic

TODO Narrative, surprise, etc. as (pre)sheaves over events

#### So...

The discipline is almost irrelevant. The recurring pattern is "information lives on overlapping pieces; agreement on overlaps decides whether it unifies." A sheaf captures that agreement and exposes its limits. Despite its generality, it usually retains some pertinent information that secretly answers a bunch of questions you care about. This makes it, in my opinion, one of those "surprisingly effective" ideas.

## Primitive Set Theory

{{< mediabox type="note" title="Box 1 – What to memorize" align="right" id="box1">}}
**Three set theoretic notions to memorize:**

* The symbol \$\in\$ reads "is an element of."
* The relation \$\subseteq\$ reads "is a subset of"; every point of \$A\$ lies in \$B\$.
* **Extensionality:** two sets are equal exactly when they have the same elements.
{{< /mediabox >}}

Before we build anything sophisticated we need a place to stand. That place is a surprisingly small fragment of set theory - small enough to write on an index card, but rich enough to support everything that follows.

Start with one *universe* of discourse, which we’ll simply call **Set**. (If you're confused by the phrase "universe of discourse", it just means the set of all objects that are under consideration in a specific context or discussion; you don't need to understand this term fully). Think of it as the object containing every set we will ever talk about. Inside that object we highlight two relations between subobjects:

1. **Membership** \$\boldsymbol{\in}\$
 Saying \$a \in A\$ means *"the set \$a\$ sits inside the set \$A\$ as a single member."*
 A classic point of confusion: \$a\subseteq A\$ is generally **false** if \$a\$ itself is an element - you can’t be both an element and a subset at the same time.

2. **Subset** \$\boldsymbol{\subseteq}\$
 We write \$A \subseteq B\$ when *every* element of \$A\$ is also an element of \$B\$.
 It’s worth pausing here: newbies often blur \$\in\$ and \$\subseteq\$ because both talk about "being inside" something. Remember - one compares a *set to a set*, the other compares a *set to its members*.

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
* Infinite intersections are *not* guaranteed to stay open - the "two" in axiom (iii) is doing real work.
{{< /mediabox >}}

TODO: intuitive intro to topologies

Union and intersection let us manufacture new sets; now we decide which of those sets count as *open* and thereby fix the "geometry" of our universe. Formally, a topology on a set \$X\$ is a choice of collection \$\mathcal O\$ satisfying the three axioms in the box. Think of \$\mathcal O\$ as a menu: each item on the menu is declared open, everything else is not.

Why these axioms and no others? The short answer is that they capture the way neighborhoods behave in ordinary spaces like \$\mathbb R\$.

* **Whole space first.** If *nothing* in \$X\$ were open, analysis would starve; making \$X\$ itself open guarantees at least one playground.
* **Unions are cheap.** If every point already sits in one open set or another, pooling them shouldn’t break openness. This encodes the intuition that you can enlarge a neighborhood as much as you like.
* **Finite intersections are safe.** Two overlapping neighborhoods share a smaller neighborhood. But the axiom stops at two: intersect an infinite tower of shrinking intervals \$(0,1/n)\$ and you drop to \${0}\$, which is *not* open in the usual topology on \$\mathbb R\$.

A classic trip-up is forgetting that *open* is always **relative to the chosen \$\mathcal O\$**. The subset \$,(0,1)\subseteq(0,2)\subseteq\mathbb R,\$ is open for the usual topology, yet if you switch to the trivial topology \${\varnothing,X}\$ it suddenly isn’t. Keep the phrase "open in \$X\$" in your mental subtitles every time you see the word.

One other snag: some readers assume "finite intersections" means "any finite collection." In practice you only ever need the two-set version; the three-set case follows by applying it twice, and so on.

With the concept of open sets pinned down we can finally talk about *local data*: information attached to each open subset. That is the gateway to presheaves, which in turn set the stage for sheaves. But first we package the opens themselves into a tidy type, so they can be manipulated without dragging the entire topology everywhere we go - next section.

#### Topology from Power Sets

{{< mediabox type="note" title="Box 4 – What to (optionally) memorize" align="right" id="box4">}}
**Three more topological notions:**

* A *topology* on a set \$X\$ is a distinguished collection \$\mathcal O\subseteq\mathcal P(X)\$ of subsets of \$X\$.
* Requirements on \$\mathcal O\$:

 1. \$X\in\mathcal O\$ (the whole space is open);
 2. \$\bigcup S\in\mathcal O\$ whenever every member of \$S\$ lies in \$\mathcal O\$;
 3. \$U\cap V\in\mathcal O\$ whenever \$U,V\in\mathcal O\$.
* The "\$\subseteq\mathcal P(X)\$" part matters: \$\mathcal O\$ *lives inside* the power set, it doesn’t replace it.

TODO: items for memorizing the two patterns

{{< /mediabox >}}

I like to present the subset-of-the-power-set perspective, despite the fact that it's not necessary here and utilizes operations that were not defined in the [primitive set theory](#primitive-set-theory) section,  because it's _**extremely useful**_ to understand that many "larger" objects you encounter in mathematics just boil down to two main patterns:

* take a [power set](https://en.wikipedia.org/wiki/Power_set) over some base set, and then take some kind of subset of the power set
* take a [cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) between two sets, and then take some kind of subset of that cartesian product

Topological spaces (TODO mention two or three other examples) match the first pattern, while objects like functions follow the second one. Some objects (such as measures) actually use both.

Take any set \$X\$. Its **power set** \$\mathcal P(X)\$ is the gigantic set containing *every* possible subset of \$X\$. (TODO example of a powerset). Choosing a topology means marking some plates on that buffet with the label **open** and leaving the rest un-labeled. Formally, you pick a subset

$$
\mathcal O\;\subseteq\;\mathcal P(X)
$$

and demand that \$\mathcal O\$ satisfy the three axioms in the box. Thinking of \$\mathcal O\$ as a subset of \$\mathcal P(X)\$ is useful for two reasons (beyond just being a generally good/unifying way to think about a whole slew of things):

* **Visual bookkeeping.** It tells you at a glance that "open" is a *property* of ordinary subsets, not some exotic new gadget. Every open set is still just a member of \$\mathcal P(X)\$ - there’s no secret structure glued on.
* **Compare topologies.** If you have two collections \$\mathcal O\_1\$ and \$\mathcal O\_2\$ inside the same power set, inclusion \$\mathcal O\_1\subseteq\mathcal O\_2\$ translates directly into "\$\mathcal O\_2\$ has at least as many open sets as \$\mathcal O\_1\$." This lets you speak sensibly about one topology being finer or coarser than another.

A quick illustration. On \$\mathbb R\$ the **usual topology** is the set of all unions of open intervals. That sits strictly between two extremes that also live inside \$\mathcal P(\mathbb R)\$:

* The **discrete topology** is *all* of \$\mathcal P(\mathbb R)\$ - every subset is open.
* The **trivial topology** is \${\varnothing,\mathbb R}\$ - nothing but the empty set and the whole line.

Both extremes obey the axioms, so they really are topologies; they just choose radically different subsets of \$\mathcal P(\mathbb R)\$.

#### Why the axioms use union and (binary) intersection

Union ensures you can always *widen* a neighborhood without losing openness; intersection guarantees you can *refine* two overlapping neighborhoods to a smaller one. Notice it is **finite** intersection, not arbitrary - if you intersect the nested family \$(0,1/n)\$ over all \$n\$, you fall out of the usual topology and land on \${0}\$, which is closed.

A first-time snag: the axioms refer only to *operations already available in \$\mathcal P(X)\$*. They don’t impose anything alien; they merely select a subset stable under those operations.

With this subset-of-the-power-set picture in mind, the phrase *"open in \$X\$"* should read as: *belongs to the chosen \$\mathcal O\subseteq\mathcal P(X)\$*. Keep that translation handy; the moment we attach data to opens the distinction between "all subsets" and "the ones in \$\mathcal O\$" becomes critical.

#### A Few Final Points of Confusion

TODO: topologists abuse the term "closeness" but topology does not necessarily entail metrics; confusingly sometimes a metric entails or _induces_ a topology, though.

## Opens as a Subtype and Basic Operations

{{< mediabox type="note" title="Box 5 – What to memorize" align="right" id="box5">}}
**Three notions to keep in your head:**

* **Opens (X)** is the universe of open subsets of \$X\$.
* \$V \subseteq_o U\$ means: \$V\$ is contained in \$U\$ *and both are open*.
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

## Coder-friendly Restatement of Sheaves

## Mnemonics

## Wrapping Up
