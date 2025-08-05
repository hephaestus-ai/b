---
draft: true
title: "Sheaves from Scratch"
---

# Sheaves from Scratch

In this post I build sheaves from "scratch", at least from the point of view of set theory, starting from primitive notions and climbing up a ladder of objects until sheaves come into view. I have tried to keep it relatively comprehensible to anyone with at least an understanding of basic set theory, spending time focusing especially on the "what" and "why", while keeping the detailed "how" simple and explained in plain english.

This information was put together in response to a question in a Discord private conversation. I haven't seen a "from scratch" definition of sheaves anywhere, so I thought this might be useful. I often call these sorts of maximalist definitions "groundworks." I’d already laid most of it out across notes and messages, so assembling it all wasn’t too much work, despite the length.

I may break this post up later. As you will see, we build many other things from scratch as we work our way up to sheaves. Future posts may address schemes, manifolds, and other objects, since, once you understand sheaves, you're already much of the way to understanding how a large number of other complex objects are constructed. Future posts may also touch on various collections of interesting implications one can derive from these definitions.

{{< table_of_contents >}}

## TLDR


## Why Sheaves are Important

In short, a sheaf is a machine for turning local, overlapping pieces of information into a consistent global picture - and for telling you precisely when that fails. While reading through this section is *optional*, before we start laying out details it might help to know what we are building toward. "Sheaf" can sound forbiddingly abstract, yet the idea is less exotic than the name, and once you start thinking in sheaves you’ll see them everywhere. The understanding of sheaves, like many fundamental mathematical concepts, confers a super-power that helps you organize and understand problems more quickly. Looking at some examples can help illustrate; however, _if you're not already familiar with some of the basic concepts, then you will need to return to these later to fully understand them_.

#### The Engineer’s View

If you want to describe a global sensor grid monitoring temperature over a large facility you might eventually discover that you’re just dealing with a sheaf. Each sensor reports only for the room it occupies; adjacent rooms overlap in their coverage because data packets sometimes drop. You want a single, up-to-date heat-map of the whole building, but you will only trust a reading if every overlapping sensor agrees on the shared region. A sheaf formalises exactly that: it assigns a *set of possible data states* to every room (open set) and tells you whether those states are compatible on their overlaps. If they are, the sheaf produces one coherent building-wide state; if not, it pinpoints the conflict. From a systems perspective, this is a recipe for robust data-fusion and graceful degradation.

A rules- or exception-handling engine behaves similarly. Each rule (or exception handler) fires under a specific set of conditions. Those condition-sets overlap, and the engine must decide what happens when two rules both apply. Model the *active rules* over any given condition-set as a section of a sheaf. Compatibility on an overlap demands that the lists of still-relevant rules agree; failure isolates the minimal contradictory slice and therefore the bug. Debugging a snarled permission matrix is literally computing 0-th cohomology.

In robotics, coverage problems for cooperating drones translate into sheaves over time-indexed configuration spaces. In even more complex distributed systems, with half-trusting agents, each node might keep its own list of "normal" rules and "exceptions that override those rules." The overrides form a second layer: you must know whose exception beats whose when two agents disagree. That two-tier structure is exactly what a 2-sheaf (a sheaf of sheaves, or a *stack*) captures. A section over one agent might be a pair *(rule-set, exception-set)*; compatibility on an overlap checks that the exception hierarchy lines up, and gluing succeeds only when every clash can be resolved into a single, well-scoped override leaving no silent contradictions.

Type-theoretic semantics often interpret a program fragment *in a context* and then extend that interpretation when more variables become visible. Contexts overlap when sub-routines share free variables. A *presheaf* on the lattice of contexts captures how meanings restrict; requiring it to be a *sheaf* adds the principled uniqueness condition that parallels referential transparency. Categorical models of dependent type theory exploit exactly this sheaf condition to guarantee that substitution behaves predictably.

In another post I plan on writing, I show how domain-driven design (DDD) can be viewed as a 2-sheaf. Here's a handy hint: whenever two domains think about the same underlying reality in different ontologies, the comparison functor is usually secretly a stack.

#### The Scientist’s View

Experimental physicists treat many quantities - temperature, pressure, electromagnetic potential, etc. - as *fields*: functions defined on space-time that you usually measure only in patches. You integrate those patches into a global field by enforcing that neighbouring patches agree where they meet. Classical analysis handles smoothness or continuity; a sheaf pushes the idea further, handling not just numbers but any algebraic or logical structure you care to measure. The associated cohomology then quantifies the *obstruction* to globalising your field, detecting, for instance, magnetic monopoles or defects in a crystal lattice.

A particularly vivid illustration comes from *cobordism*. Think of two time-slices of a physical system as the boundaries of a higher-dimensional manifold. A field that propagates from the "incoming" slice to the "outgoing" one is precisely a section of a sheaf on that cobordism. Cohomological obstructions along the interior tell you whether the two boundary data can be glued into a single history; in condensed-matter language this is how topological phases get classified. (FIXME: make this example more comprehensible or just delete it)

In topological data analysis, persistent cohomology detects shape in point-clouds. The raw algorithm feeds a simplicial-complex sheaf into a cohomology engine; the resulting bar-codes visualize when local clusters knit together. Newer techniques replace simplices with *cosheaves* to encode *directed* influence, useful in network flow and contagion models.

Computational neuroscience offers an instructive case: local measurements of neural activity (say, micro-electrode arrays in mouse visual cortex) identify *receptive fields* that overlap spatially and temporally. A sheaf whose sections are firing-rate distributions over electrode patches tracks which local patterns are compatible. Cohomology then reveals global motifs such as orientation maps or grid-cell lattices - features that may not be obvious from any single electrode but emerge when the patches glue coherently. (TODO: might want a citation for this in particular)

#### The Mathematician’s View

Modern geometry, from Riemann surfaces to schemes in algebraic geometry, lives on the mantra "build globally by gluing locally." Charts of a manifold, affine pieces of a variety, even basic coordinate systems are local patches that must be stitched together on overlaps. Sheaves abstract that glueing process so cleanly that entire subjects - étale cohomology, Hodge theory, perverse sheaves - follow just by feeding different kinds of algebraic gadgets into the same framework. The slogan *"cohomology is the derived functor of global sections"* packages decades of theory into one line; without sheaves the slogan is meaningless.

The same local-to-global principle drives classification of vector bundles, patching solutions to partial differential equations, and even the existence of Spin structures. In each case, cohomology measures "how far" we are from extending compatible local data; its vanishing grants you the global object you hoped for.

#### Less-Conventional Examples: LLMs, Narrative, Etc.

LLMs as sheaves: take any finite set of token bigrams - pairs \$(w\_i, w\_{i+1})\$. Call that set your *open context*. A section over it is a probability distribution for the *next* token conditioned on those bigrams. Overlaps are smaller contexts that two bigger ones share; compatibility means the two distributions agree after marginalising to the overlap. Gluing all compatible local distributions is what a large-language-model learns during training: a single global rule that extends every fragment. Failures to glue show up as places where the model assigns inconsistent probabilities to the same substring seen through two different neighbourhoods.

Distributed ledgers can be phrased in sheaf language: each block covers a slice of global state; overlaps check for double-spends; the sheaf condition enforces ledger consistency without central control.

Chains of reasoning in *defeasible logic* also glue. Each argument fragment covers a subset of premises; overlaps share common sub-arguments. A sheaf whose sections are ordered lists of defeaters ensures that, on overlaps, defeat priorities line up. Cohomological obstructions correspond to cycles of mutually defeating arguments - a rigorous way to diagnose paradoxes like the pre-emption problem.

Narrative theory can even exploit sheaf-like structures: events live on local graph- or DAG-based time-lines (chapters, scenes, character arcs); compatibility on overlaps enforces causal and thematic consistency; global sections are coherent plots. Surprise, in this language, is the failure of a tentative extension to glue, forming a "surprise presheaf".

#### Take-away

The discipline is almost irrelevant. The recurring pattern is "information lives on overlapping pieces; agreement on overlaps decides whether it unifies." A sheaf captures that agreement and exposes its limits. Despite its generality, it usually retains enough structure to answer concrete questions you care about if you know how to ask them, making it one of those "surprisingly effective" ideas.

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

In plain english: Two sets are equal exactly when they have all the same elements; every x that’s in A is also in B, and vice versa. Or a closer reading of the expression: A equals B if and only if, for every x, x is in A if and only if x is in B.

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

The plain english reading of this expression is basically: x belongs to the big union of S exactly when it belongs to at least one of the sets inside S. Or a closer reading of the expression: x is in the union of S if and only if there exists a T in S such that x is in T.

A point many people miss on first reading: \$\bigcup S\$ is a *one-step* operation. The whole family of sets is swallowed at once; there’s no hidden iteration. (why is this relevant?)

If \$S={(0,1),, (1,2)}\$ inside \$\mathbb R\$, then \$\bigcup S=(0,2)\$. Exactly the points that appear somewhere in the two intervals - no more, no less.

#### Intersection

For intersection we only need the binary case for sheaves. Given two sets \$X\$ and \$Y\$ we define

$$
X\cap Y=\{x\mid x\in X\text{ and }x\in Y\}.
$$

Plain english: The intersection of X and Y is the set of things that are in both X and Y. Or: X intersect Y equals the set of x such that x is in X and x is in Y.

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

* A **topological space** $(X,\mathcal O)$ is a set $X$ "equipped" with a specified collection $\mathcal O$ of subsets of $X$, which obey three axioms designed to capture the idea of continuity and locality. $\mathcal O$ is called the *open sets* and a member of $\mathcal O$ is an open set.
* Axioms: (i) the whole space \$X\$ is open; (ii) any union \$\bigcup S\$ of open sets is open; (iii) the intersection \$U\cap V\$ of **two** open sets is open.
* Infinite intersections are *not* guaranteed to stay open - the "two" in axiom (iii) is doing real work.
{{< /mediabox >}}

Topologies are a way of talking about *closeness*, *continuity*, and *gluing*, but in an extremely stripped-down, minimalist way. Think of them as what you're left with when you remove distances from geometry, but still want to talk about which points are "near" each other, or what it means for a function to vary "smoothly."

More precisely: a **topology** doesn’t tell you how far apart two points are; it just tells you, for every point, which surrounding regions count as "open neighborhoods" around it. These open sets let us define all the core ideas of calculus and geometry, like continuity, limits, or connectedness, purely in terms of set membership, without ever talking about distances.

This abstraction is what makes topology so powerful. The same basic ideas work whether your underlying set is a line, a surface, a space of functions, or a wild combinatorial structure. All you need is a system of open sets that satisfies three axioms.

Union and intersection let us manufacture new sets; now we decide which of those sets count as *open* and thereby fix the structure of our universe. Formally, a topology on a set \$X\$ is a choice of collection \$\mathcal O\$ satisfying the three axioms in the box. (FIXME: put the axioms here as well)

Why these axioms and no others? The short answer is that they capture the way neighborhoods behave in ordinary spaces like \$\mathbb R\$.

* **Whole space first.** If *nothing* in \$X\$ were open, analysis would starve; making \$X\$ itself open guarantees at least one playground.
* **Unions are cheap.** If every point already sits in one open set or another, pooling them shouldn’t break openness. This encodes the intuition that you can enlarge a neighborhood as much as you like.
* **Finite intersections are safe.** Two overlapping neighborhoods share a smaller neighborhood. But the axiom stops at two: intersect an infinite tower of shrinking intervals \$(0,1/n)\$ and you drop to \${0}\$, which is *not* open in the usual topology on \$\mathbb R\$.

A classic trip-up is forgetting that *open* is always **relative to the chosen \$\mathcal O\$**. The subset \$,(0,1)\subseteq(0,2)\subseteq\mathbb R,\$ is open for the usual topology, yet if you switch to the trivial topology \${\varnothing,X}\$ it suddenly isn’t. Keep the phrase "open in \$X\$" in your mental subtitles every time you see the word.

One other snag: some readers assume "finite intersections" means "any finite collection." In practice you only ever need the two-set version; the three-set case follows by applying it twice, and so on.

With the concept of open sets pinned down we can finally talk about *local data*: information attached to each open subset. That is the gateway to presheaves, which in turn set the stage for sheaves. But first we package the opens themselves into a tidy type, so they can be manipulated without dragging the entire topology everywhere we go - next section.

#### Topology from Power Sets

{{< mediabox type="note" title="Box 4 – What to (optionally) memorize" align="right" id="box4">}}
**Two construction patterns worth memorizing**

* **Pattern A - subsets of a power set.**
 Start with a set $X$, take its power set $\mathcal P(X)$, then single out some subcollection that exhibits certain properties, follows certain axioms, or sometimes even just select arbitrarily.
 *Typical examples*: topologies, $\sigma$-algebras (measure theory), abstract simplicial complexes (algebraic topology), hypergraphs (these are arbitrary subsets of a power set).
* **Pattern B - subsets of a Cartesian product.**
 Start with two sets $X, Y$, form their product $X\times Y$, then pick a subset of that product.
 *Typical examples*: graphs of functions, general binary relations, edge-sets of (directed) graphs.

**Four more notions:**

* $\mathcal O$ can also be constructed by selecting specific _members_ from the power set $\mathcal P(X)$, each of which correspond to _subsets_ of $X$.
* The entire $\mathcal O$ corresponds to _one subset_ of $\mathcal P(X)$
* Requirements on $\mathcal O$:
  - $X\in\mathcal O$ (the whole space is open, i.e. the whole set $X$ must be a member of $\mathcal O$);
  - **closure under arbitrary unions:** $\bigcup S\in\mathcal O$ whenever every member of $S$ lies in $\mathcal O$;
  - **closure under finite intersections:** $U\cap V\in\mathcal O$ whenever $U,V\in\mathcal O$.
* An example of a cross discipline connection:
  * Because inclusion $\subseteq$ already orders the opens, these closure axioms make $\mathcal O$ a frame (a complete Heyting algebra): every family of opens has a join given by its union, and every finite family has a meet given by its intersection. More abstractly, $\mathcal O$ is a lattice.
  * A **lattice** is any collection where you can always take  
    * the "smallest common **superset**" of two members (their union), and  
    * the "largest common **subset**" (their intersection).  
    So as soon as you spot that your object is a lattice, every general lattice-theoretic law—De Morgan rules, distributivity tricks, order-by-inclusion reasoning—applies *automatically*.  
  * A **Heyting algebra** (or *frame*) is just a lattice with one extra operation that plays the role of logical "implication."  That viewpoint links topology to logic: opens behave like truth-values in intuitionistic logic. 
  Memorising these names pays off because any theorem that starts "In a lattice..." or "In every Heyting algebra..." becomes an instant theorem about open sets (and about σ-algebras, Boolean algebras, simplicial complexes, ...).  In other words, you get a big toolbox of ready-made results **for free** once you recognise the pattern.

{{< /mediabox >}}

I like to present the subset-of-the-power-set perspective, despite the fact that it’s not strictly necessary here and relies on operations not introduced in the [primitive set theory](#primitive-set-theory) section, because it’s **extremely useful** to notice that many "larger" mathematical objects reduce to two main patterns:

* take a [power set](https://en.wikipedia.org/wiki/Power_set) over some base set, then choose a subset of that power set;
* take a [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) of two sets, then choose a subset of that product.

Topological spaces, $\sigma$-algebras, and abstract simplicial complexes match the first pattern, while objects like functions, relations, and graph edge-sets follow the second. Some objects (such as measures) actually employ both.

What is a power set? Take any set $X$. Then its **power set** $\mathcal P(X)$ is the gigantic set containing *every* possible subset of $X$, including the empty set $\varnothing$. For example, if $X=\{a,b,c\}$ then:

$$
 \mathcal P(X)=\{\varnothing, \{a\}, \{b\}, \{c\}, \{a,b\}, \{a,c\}, \{b,c\}, \{a,b,c\}\}.
$$

To define a topology on $X$ formally, you pick a subset:

$$
 \mathcal O\;\subseteq\;\mathcal P(X)
$$

and demand that $\mathcal O$ satisfy the three axioms. Thinking of $\mathcal O$ as a subset of $\mathcal P(X)$ pays off for three reasons:

* **Spotting family resemblances (and getting theorems "for free").**  
  Once you notice that many gadgets are literally "just special subsets" of a power set (or product set), you can reuse ideas instead of re-proving them.  
  * Open sets (topology) and measurable sets (measure theory) both form collections closed under unions ∧ intersections, so any lattice-theoretic fact you show in one world (e.g. De Morgan’s laws, distributivity tricks) automatically holds in the other.  
  * A σ-algebra is just a topology with complements and countable unions thrown in, so every theorem about topologies that doesn’t mention complements still applies.  
  * The graph of a function $f\colon X\to Y$ is a special kind of relation-just a subset of $X\times Y$ with at most one $Y$-partner per $X$-so facts about relations (domain, range, composition) instantly specialise to functions.
  Recognising these "same-shape" constructions turns big theorems into plug-and-play modules and shows how different areas of math quietly talk to each other.
* **Visual bookkeeping.** It makes clear that "open" is just an extra property of ordinary subsets - no exotic new gadget needed. Every open set is still a plain member of $\mathcal P(X)$.
* **Comparing topologies.** Given two collections $\mathcal O_1$ and $\mathcal O_2$ inside the same power set, inclusion $\mathcal O_1\subseteq\mathcal O_2$ translates directly into "$\mathcal O_2$ has at least as many open sets as $\mathcal O_1$." This lets you talk sensibly about one topology being *finer* or *coarser* than another.

A quick illustration. On $\mathbb R$ the **usual topology** is the set of all unions of open intervals. That sits strictly between two extremes that also live inside $\mathcal P(\mathbb R)$:

* The **discrete topology** is *all* of $\mathcal P(\mathbb R)$ – every subset is open.
* The **trivial topology** is $\{\varnothing,\mathbb R\}$ – only the empty set and the whole line are open.

Both extreme examples obey the axioms, so they really are topologies; they just choose radically different subsets of $\mathcal P(\mathbb R)$.

#### Why the axioms use union and (binary) intersection

Union ensures you can always *widen* a neighborhood without losing openness; intersection guarantees you can *refine* two overlapping neighborhoods to a smaller one. Notice it is **finite** intersection, not arbitrary - if you intersect the nested family \$(0,1/n)\$ over all \$n\$, you fall out of the usual topology and land on \${0}\$, which is closed.

A first-time snag: the axioms refer only to *operations already available in \$\mathcal P(X)\$*. They don’t impose anything alien; they merely select a subset stable under those operations.

With this subset-of-the-power-set picture in mind, the phrase *"open in \$X\$"* should read as: *belongs to the chosen \$\mathcal O\subseteq\mathcal P(X)\$*. Keep that translation handy; the moment we attach data to opens the distinction between "all subsets" and "the ones in \$\mathcal O\$" becomes critical.

#### A Few Final Points of Confusion

TODO: many subsets of $\mathcal P(X)$ are topologies. Selection is often arbitrary, meaning what is "open" in one context is not in another.

TODO: topologists abuse the term "closeness" but topology does not necessarily entail metrics; confusingly sometimes a metric entails or _induces_ a topology, though.

TODO: the example provided has a finite power set, but power sets can be infinitely large

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
