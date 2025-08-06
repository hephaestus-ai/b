---
draft: true
title: "Sheaves from Scratch"
---

## Sheaves from Scratch

In this post I build sheaves from "scratch", at least from the point of view of set theory, starting from primitive notions and climbing up a ladder of objects until sheaves come into view. I have tried to keep it relatively comprehensible to anyone with at least an understanding of basic set theory, spending time focusing especially on the "what" and "why", while keeping the detailed "how" simple and explained in plain english.

This information was put together in response to a question in a Discord private conversation. I haven't seen a "from scratch" definition of sheaves anywhere, so I thought this might be useful. I often call these sorts of maximalist definitions "groundworks." I’d already laid most of it out across notes and messages, so assembling it all wasn’t too much work, despite the length.

I may break this post up later. As you will see, we build many other things from scratch as we work our way up to sheaves. Future posts may address schemes, manifolds, and other objects, since, once you understand sheaves, you're already much of the way to understanding how a large number of other complex objects are constructed. Future posts may also touch on various collections of interesting implications one can derive from these definitions.

{{< table_of_contents >}}

## Why Sheaves are Important

**Intuition 1.1.** In short, a sheaf is a machine for turning local, overlapping pieces of information into a consistent global picture - and for telling you precisely when that fails. While reading through this section is *optional*, before we start laying out details it might help to know what we are building toward. "Sheaf" can sound forbiddingly abstract, yet the idea is less exotic than the name, and once you start thinking in sheaves you’ll see them everywhere. The understanding of sheaves, like many fundamental mathematical concepts, confers a super-power that helps you organize and understand problems more quickly. Looking at some examples can help illustrate; however, _if you're not already familiar with some of the basic concepts, then you will need to return to these later to fully understand them_.

#### The Engineer’s View

**Application 1.1.** If you want to describe a global sensor grid monitoring temperature over a large facility you might eventually discover that you’re just dealing with a sheaf. Each sensor reports only for the room it occupies; adjacent rooms overlap in their coverage because data packets sometimes drop. You want a single, up-to-date heat-map of the whole building, but you will only trust a reading if every overlapping sensor agrees on the shared region. A sheaf formalises exactly that: it assigns a *set of possible data states* to every room (open set) and tells you whether those states are compatible on their overlaps. If they are, the sheaf produces one coherent building-wide state; if not, it pinpoints the conflict. From a systems perspective, this is a recipe for robust data-fusion and graceful degradation.

**Application 1.2.** A rules- or exception-handling engine behaves similarly. Each rule (or exception handler) fires under a specific set of conditions. Those condition-sets overlap, and the engine must decide what happens when two rules both apply. Model the *active rules* over any given condition-set as a section of a sheaf. Compatibility on an overlap demands that the lists of still-relevant rules agree; failure isolates the minimal contradictory slice and therefore the bug. Debugging a snarled permission matrix is literally computing 0-th cohomology.

**Application 1.3.** In robotics, coverage problems for cooperating drones translate into sheaves over time-indexed configuration spaces. In even more complex distributed systems, with half-trusting agents, each node might keep its own list of "normal" rules and "exceptions that override those rules." The overrides form a second layer: you must know whose exception beats whose when two agents disagree. That two-tier structure is exactly what a 2-sheaf (a sheaf of sheaves, or a *stack*) captures. A section over one agent might be a pair *(rule-set, exception-set)*; compatibility on an overlap checks that the exception hierarchy lines up, and gluing succeeds only when every clash can be resolved into a single, well-scoped override leaving no silent contradictions.

**Application 1.4.** Type-theoretic semantics often interpret a program fragment *in a context* and then extend that interpretation when more variables become visible. Contexts overlap when sub-routines share free variables. A *presheaf* on the lattice of contexts captures how meanings restrict; requiring it to be a *sheaf* adds the principled uniqueness condition that parallels referential transparency. Categorical models of dependent type theory exploit exactly this sheaf condition to guarantee that substitution behaves predictably.

**Application 1.5.** In another post I plan on writing, I show how domain-driven design (DDD) can be viewed as a 2-sheaf. Here's a handy hint: whenever two domains think about the same underlying reality in different ontologies, the comparison functor is usually secretly a stack.

#### The Scientist’s View

**Application 1.6.** Experimental physicists treat many quantities - temperature, pressure, electromagnetic potential, etc. - as *fields*: functions defined on space-time that you usually measure only in patches. You integrate those patches into a global field by enforcing that neighbouring patches agree where they meet. Classical analysis handles smoothness or continuity; a sheaf pushes the idea further, handling not just numbers but any algebraic or logical structure you care to measure. The associated cohomology then quantifies the *obstruction* to globalising your field, detecting, for instance, magnetic monopoles or defects in a crystal lattice.

**Application 1.7.** Sometimes in physics you want to know whether two boundary states of a system could come from a single, well-defined evolution. The simplest case is: you know what your system looks like at the start and at the end, and you're trying to decide if there's some field (temperature, phase, whatever) that fills in the space in between.

Think of two time-slices of a physical system as the boundaries of a higher-dimensional manifold. The object in between the time slices is called a **cobordism**. You don’t need to know the details right now. It just means: a region that connects two boundary spaces. The field you're trying to glue lives on that region.

This is where the sheaf condition becomes useful. You already know the field on both ends (the boundaries). If these two fields are *compatible* where they overlap, the sheaf lets you glue them into one global field across the whole cobordism. If they're not compatible, the sheaf will tell you why not, and the failure to glue becomes a concrete object: a cohomology class. Thus, a field that propagates from the "incoming" slice to the "outgoing" one is precisely a section of a sheaf on that cobordism.

This kind of reasoning appears in condensed matter physics, where failures to glue correspond to topological obstructions such as phase boundaries or defects inside the material.

**Application 1.8.** In topological data analysis, persistent cohomology detects shape in point-clouds. The raw algorithm feeds a simplicial-complex sheaf into a cohomology engine; the resulting bar-codes visualize when local clusters knit together. Newer techniques replace simplices with *cosheaves* to encode *directed* influence, useful in network flow and contagion models.

**Application 1.9.** Computational neuroscience offers an instructive case: local measurements of neural activity (say, micro-electrode arrays in mouse visual cortex) identify *receptive fields* that overlap spatially and temporally. A sheaf whose sections are firing-rate distributions over electrode patches tracks which local patterns are compatible. Cohomology then reveals global motifs such as orientation maps or grid-cell lattices - features that may not be obvious from any single electrode but emerge when the patches glue coherently. (TODO: might want a citation for this in particular)

#### The Mathematician’s View

**Application 1.10.** Modern geometry, from Riemann surfaces to schemes in algebraic geometry, lives on the mantra "build globally by gluing locally." Charts of a manifold, affine pieces of a variety, even basic coordinate systems are local patches that must be stitched together on overlaps. Sheaves abstract that glueing process so cleanly that entire subjects - étale cohomology, Hodge theory, perverse sheaves - follow just by feeding different kinds of algebraic gadgets into the same framework. The slogan *"cohomology is the derived functor of global sections"* packages decades of theory into one line; without sheaves the slogan is meaningless.

**Application 1.11.** The same local-to-global principle drives classification of vector bundles, patching solutions to partial differential equations, and even the existence of Spin structures. In each case, cohomology measures "how far" we are from extending compatible local data; its vanishing grants you the global object you hoped for.

#### Less-Conventional Examples: LLMs, Narrative, Etc.

**Application 1.12.** LLMs as sheaves: take any finite set of token bigrams - pairs \$(w\_i, w\_{i+1})\$. Call that set your *open context*. A section over it is a probability distribution for the *next* token conditioned on those bigrams. Overlaps are smaller contexts that two bigger ones share; compatibility means the two distributions agree after marginalising to the overlap. Gluing all compatible local distributions is what a large-language-model learns during training: a single global rule that extends every fragment. Failures to glue show up as places where the model assigns inconsistent probabilities to the same substring seen through two different neighbourhoods.

**Application 1.13.** Distributed ledgers can be phrased in sheaf language: each block covers a slice of global state; overlaps check for double-spends; the sheaf condition enforces ledger consistency without central control.

**Application 1.14.** Chains of reasoning in *defeasible logic* also glue. Each argument fragment covers a subset of premises; overlaps share common sub-arguments. A sheaf whose sections are ordered lists of defeaters ensures that, on overlaps, defeat priorities line up. Cohomological obstructions correspond to cycles of mutually defeating arguments - a rigorous way to diagnose paradoxes like the pre-emption problem.

**Application 1.15.** Narrative theory can even exploit sheaf-like structures: events live on local graph- or DAG-based time-lines (chapters, scenes, character arcs); compatibility on overlaps enforces causal and thematic consistency; global sections are coherent plots. Surprise, in this language, is the failure of a tentative extension to glue, forming a "surprise presheaf".

#### Take-away

The discipline is almost irrelevant. The recurring pattern is "information lives on overlapping pieces; agreement on overlaps decides whether it unifies." A sheaf captures that agreement and exposes its limits. Despite its generality, it usually retains enough structure to answer concrete questions you care about if you know how to ask them, making it one of those "surprisingly effective" ideas.

## Primitive Set Theory

{{< mediabox type="note" title="Box 1 - What to memorize" align="right" id="box1">}}
**Three set theoretic concepts to memorize.**

* The symbol \$\in\$ reads "is an element of."
* The relation \$\subseteq\$ reads "is a subset of"; every point of \$A\$ lies in \$B\$.
* **Extensionality.** two sets are equal exactly when they have the same elements.
{{< /mediabox >}}

Before we build anything sophisticated we need a place to stand. That place is a surprisingly small fragment of set theory - small enough to write on an index card, but rich enough to support everything that follows.

Start with one *universe* of discourse, which we’ll simply call **Set**. (If you're confused by the phrase "universe of discourse", it just means the set of all objects that are under consideration in a specific context or discussion; you don't need to understand this term fully). Think of it as the object containing every set we will ever talk about. Inside that object we highlight two relations between subobjects:

1. **Definition 2.1:** **Membership** \$\boldsymbol{\in}\$
 Saying \$a \in A\$ means *"the set \$a\$ sits inside the set \$A\$ as a single member."*
 A classic point of confusion: \$a\subseteq A\$ is generally **false** if \$a\$ itself is an element - you can’t be both an element and a subset at the same time.

2. **Definition 2.2:** **Subset** \$\boldsymbol{\subseteq}\$
 We write \$A \subseteq B\$ when *every* element of \$A\$ is also an element of \$B\$.
 It’s worth pausing here: newbies often blur \$\in\$ and \$\subseteq\$ because both talk about "being inside" something. Remember - one compares a *set to a set*, the other compares a *set to its members*.

**Axiom 2.1:** Everything else we need flows from a single guiding principle called the **axiom of extensionality**, written:

$$
A = B \quad\Longleftrightarrow\quad \forall x\,(x\in A\;\Leftrightarrow\;x\in B).
$$

In plain english: Two sets are equal exactly when they have all the same elements; every x that’s in A is also in B, and vice versa. Or a closer reading of the expression: A equals B if and only if, for every x, x is in A if and only if x is in B.

**Intuition 2.1.** In practice the axiom does two jobs. First, it keeps us rigorous - if you want to prove two sets are equal, you must check every element. Second, it lets us *rename* a set once we know its elements, sparing us from carrying around duplicate symbols.

That’s the entire skeleton. No power sets, no choice, not even unions yet - those arrive in the next sections. For now, resist the urge to import heavier machinery; this lean framework (pun not intended) is enough to scaffold topology, presheaves, and ultimately sheaves.

**Warning 2.1.** A common stumble at this stage: treating \$\subseteq\$ as though it were symmetric. It isn’t. Saying \$A\subseteq B\$ puts a directional arrow from \$A\$ into \$B\$; going the other way requires its own proof. Forgetting that directionality later - when we restrict data or glue it - tends to snowball into bigger mistakes.

Take a moment to let these three notions settle. Once they feel second-nature you’ll be able to parse every definition that follows without stopping to untangle basic set theory ideas.

## Constructors Used by Topology

{{< mediabox type="note" title="Box 2 - What to memorize" align="right" id="box2">}}
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

**Definition 3.1.** Take any collection of sets, call it \$S\$. We write

$$
\bigcup S
$$

for the set of all points that show up in at least one member of \$S\$. The rule is as simple as it looks:

$$
x\in\bigcup S \;\Longleftrightarrow\; \exists\,T\in S\;(x\in T).
$$

The plain english reading of this expression is basically: x belongs to the big union of S exactly when it belongs to at least one of the sets inside S. Or a closer reading of the expression: x is in the union of S if and only if there exists a T in S such that x is in T.

**Nuance 3.1.** Mostly as an aside, but a point many people miss without some explanation: \$\bigcup S\$ is a *one-step* operation. The whole family of sets is swallowed at once; there’s no hidden iteration. Why is this relevant? A huge reason is that, being able to do these big operations in "O(1) complexity" is necessary for making "infinite leaps" later on.

**Example 3.1.**  If \$S=\{(0,1),\,(1,2)\}\subseteq\mathbf R\$ then  

$$
\bigcup S \;=\; (0,2).
$$

Exactly the points that lie in at least one of the two intervals – no more, no less.


#### Intersection

**Definition 3.2.** For intersection we only need the binary case for sheaves. Given two sets \$X\$ and \$Y\$ we define

$$
X\cap Y=\{x\mid x\in X\text{ and }x\in Y\}.
$$

Plain english: The intersection of X and Y is the set of things that are in both X and Y. Or: X intersect Y equals the set of x such that x is in X and x is in Y.

**Lemma 3.1 & Lemma 3.2.** Nothing subtle here, but two elementary lemmas save headaches later:

$$
X\cap Y\subseteq X,\quad X\cap Y\subseteq Y.
$$

They look obvious; still, they are worth a spot in your memory. When we start restricting data on open sets, these inclusions justify every "of course this lands where it should" step.

**Example 3.2.** With \$X=(0,2)\$ and \$Y=(1,3)\$ in \$\mathbb R\$ we get \$X\cap Y=(1,2)\$, strictly smaller than either parent. No surprises, and that’s the point - the constructor behaves exactly the way everyday intuition says it should.

Now, with union and intersection in place we finally have enough raw material to describe a topology: a family of subsets closed under union (the first operation) and stable under intersection (the second operation).

## Topological Space

{{< mediabox type="note" title="Box 3 - What to memorize" align="right" id="box3">}}
**Three topology notions to memorize.**

* A **topological space** $X_\tau = (X,\tau)$ ($\tau$ is the greek lowercase tau) is a set $X$ "equipped" with a specified collection $\tau$ of subsets of $X$, which obey three axioms designed to capture the idea of continuity and locality. $\tau$ is called the *topology* or the *open sets* and a member of $\tau$ is an open set.
* Axioms: (i) the whole space \$X\$ is open; (ii) any union \$\bigcup S\$ of open sets is open; (iii) the intersection \$U\cap V\$ of **two** open sets is open.
* Infinite intersections are *not* guaranteed to stay open - the "two" in axiom (iii) is doing real work.
{{< /mediabox >}}

**Intuition 4.1.** Topologies are a way of talking about *closeness*, *continuity*, and *gluing*, but in an extremely stripped-down, minimalist way. Think of them as what you're left with when you remove distances from geometry, but still want to talk about which points are "near" each other, or what it means for a function to vary "smoothly."

**Intuition 4.2.** More precisely: a **topology** doesn’t tell you how far apart two points are; it just tells you, for every point, which surrounding regions count as "open neighborhoods" around it. _These open sets let us define all the core ideas of calculus and geometry, like continuity, limits, or connectedness, purely in terms of set membership, without ever talking about distances._

**Intuition 4.3.**  Topologists joke that a coffee mug is the same as a donut because you can **stretch, twist, and bend** one into the other without *tearing* or *gluing*.  Those are exactly the moves the axioms preserve: arbitrary unions let you enlarge a region smoothly, binary intersections let you zoom into overlapping bits, but nothing ever rips the underlying set apart or stitches two pieces that were disjoint.  A topology therefore tells you *which deformations are harmless to this underlying structure* while forgetting all geometric measurements such as angle or distance.

**Intuition 4.4.**  The data lost when you ignore distances is recovered in part by how opens overlap. If you wander around a circle you can cover it with two open arcs whose overlaps are *disconnected*; that pattern never appears on a line. By counting the ways opens patch together you can detect *holes* (one in a circle, two in a torus, infinitely many in a fractal Swiss cheese) without ever talking about radii or coordinates.  Cohomology (not gone over here) lets us formalize that counting.

This abstraction is what makes topology so powerful. The same basic ideas work whether your underlying set is a line, a surface, a space of functions, or a wild combinatorial structure. All you need is a system of open sets that satisfies three axioms.

Union and intersection let us manufacture new sets; now we decide which of those sets count as *open* and thereby fix the structure of our universe. Formally, a topology on a set \$X\$ is a choice of collection \$\tau\$ satisfying the three axioms in the box.

**Axiom 4.1 (Openness of the whole space).**  To state that $X$ must belong to the topology $\tau$ we write: \$X \in \tau\$.

**Axiom 4.2 (Stability under arbitrary unions).**  If $ \{U_i\}_{i\in I}\subseteq\tau $ then $ \bigcup_{i\in I} U_i \in \tau $.

**Axiom 4.3 (Stability under finite intersections).**  If \$U,V\in\tau\$ then \$U\cap V \in \tau\$. By induction this extends to any finite family \$U_1,\dots,U_n\$.

**Intuition 4.5.** Why these axioms and no others? The short answer is that they capture the way neighborhoods behave in ordinary spaces like \$\mathbb R\$.

* **Whole space first.** If *nothing* in \$X\$ were open, analysis would starve; making \$X\$ itself open guarantees at least one playground.
* **Unions are cheap.** If every point already sits in one open set or another, pooling them shouldn’t break openness. This encodes the intuition that you can enlarge a neighborhood as much as you like.
* **Finite intersections are safe.** Two overlapping neighborhoods share a smaller neighborhood. But the axiom stops at two: intersect an infinite tower of shrinking intervals \$(0,1/n)\$ and you drop to \${0}\$, which is *not* open in the usual topology on \$\mathbb R\$.

**Warning 4.1.** A classic trip-up is forgetting that *open* is always **relative to the chosen \$\tau\$**. The subset \$(0,1)\subseteq(0,2)\subseteq\mathbb R,\$ is open for the usual topology, yet if you switch to the trivial topology \${\varnothing,X}\$ it suddenly isn’t.

**Warning 4.2.** One other snag: some readers assume "finite intersections" means "any finite collection." In practice you only ever need the two-set version; the three-set case follows by applying it twice, and so on.

With the concept of open sets pinned down we can finally talk about *local data*: information attached to each open subset. That is the gateway to presheaves, which in turn set the stage for sheaves. But first we package the opens themselves into a tidy type, so they can be manipulated without dragging the entire topology everywhere we go - next section.

#### Topology from Power Sets

{{< mediabox type="note" title="Box 4 - What to (optionally) memorize" align="right" id="box4">}}
**Two construction patterns worth memorizing**

* **Pattern A - subsets of a power set.**
 Start with a set $X$, take its power set $\mathcal P(X)$, then single out some subcollection that exhibits certain properties, follows certain axioms, or sometimes even just select arbitrarily.
 *Typical examples*: topologies, $\sigma$-algebras (measure theory), abstract simplicial complexes (algebraic topology), hypergraphs (these are arbitrary subsets of a power set).
* **Pattern B - subsets of a Cartesian product.**
 Start with two sets $X, Y$, form their product $X\times Y$, then pick a subset of that product.
 *Typical examples*: graphs of functions, general binary relations, edge-sets of (directed) graphs.

**Four more notions.**

* $\tau$ can also be constructed by selecting specific _members_ from the power set $\mathcal P(X)$, each of which correspond to _subsets_ of $X$.
* The entire $\tau$ corresponds to _one subset_ of $\mathcal P(X)$
* Requirements on $\tau$:
  - $X\in\tau$ (the whole space is open, i.e. the whole set $X$ must be a member of $\tau$);
  - **closure under arbitrary unions.** $\bigcup S\in\tau$ whenever every member of $S$ lies in $\tau$;
  - **closure under finite intersections.** $U\cap V\in\tau$ whenever $U,V\in\tau$.
* An example of a cross discipline connection:
  * Because inclusion $\subseteq$ already orders the opens, these closure axioms make $\tau$ a frame (a complete Heyting algebra): every family of opens has a join given by its union, and every finite family has a meet given by its intersection. More abstractly, $\tau$ is a lattice.
  * A **lattice** is any collection where you can always take  
    * the "smallest common **superset**" of two members (their union), and  
    * the "largest common **subset**" (their intersection).  
    So as soon as you spot that your object is a lattice, every general lattice-theoretic law - De Morgan rules, distributivity tricks, order-by-inclusion reasoning - applies *automatically*.  
  * A **Heyting algebra** (or *frame*) is just a lattice with one extra operation that plays the role of logical "implication."  That viewpoint links topology to logic: opens behave like truth-values in intuitionistic logic.

{{< /mediabox >}}

**Intuition 4.6.** I like to present the subset-of-the-power-set perspective, despite the fact that it’s not strictly necessary here and relies on operations not introduced in the [primitive set theory](#primitive-set-theory) section, because it’s **extremely useful** to notice that many "larger" mathematical objects reduce to two main patterns:

* take a [power set](https://en.wikipedia.org/wiki/Power_set) over some base set, then choose a subset of that power set;
* take a [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) of two sets, then choose a subset of that product.

Topological spaces, $\sigma$-algebras, and abstract simplicial complexes match the first pattern, while objects like functions, relations, and graph edge-sets follow the second. Some objects (such as measures) actually employ both.

**Definition 4.1.** What is a power set? Take any set $X$. Then its **power set** $\mathcal P(X)$ is the gigantic set containing *every* possible subset of $X$, including the empty set $\varnothing$.

**Example 4.1.** For example, if $X=\{a,b,c\}$ then:

$$
 \mathcal P(X)=\{\varnothing, \{a\}, \{b\}, \{c\}, \{a,b\}, \{a,c\}, \{b,c\}, \{a,b,c\}\}.
$$

**Definition 4.2.** To define a topology on $X$ formally, you pick a subset:

$$
 \tau\;\subseteq\;\mathcal P(X)
$$

and demand that $\tau$ satisfy the three axioms.

**Intuition 4.7.** Now, thinking of $\tau$ as a subset of $\mathcal P(X)$ pays off for at least three reasons:

* **Spotting family resemblances (and getting theorems "for free").**  Once you notice that many gadgets are literally "just special subsets" of a power set (or product set), you can reuse ideas instead of re-proving them. Recognising these "same-shape" constructions turns big theorems into plug-and-play modules and shows how different areas of math quietly talk to each other.
  * Open sets (topology) and measurable sets (measure theory) both form collections closed under unions ∧ intersections, so any lattice-theoretic fact you show in one world (e.g. De Morgan’s laws, distributivity tricks) automatically holds in the other.  
  * A σ-algebra is just a topology with complements and countable unions thrown in, so every theorem about topologies that doesn’t mention complements still applies.  
  * The graph of a function $f\colon X\to Y$ is a special kind of relation-just a subset of $X\times Y$ with at most one $Y$-partner per $X$-so facts about relations (domain, range, composition) instantly specialise to functions.
* **Visual bookkeeping.** It makes clear that "open" is just an extra property of ordinary subsets - no exotic new gadget needed. Every open set is still a plain member of $\mathcal P(X)$.
* **Comparing topologies.** Given two collections $\tau_1$ and $\tau_2$ inside the same power set, inclusion $\tau_1\subseteq\tau_2$ translates directly into "$\tau_2$ has at least as many open sets as $\tau_1$." This lets you talk sensibly about one topology being *finer* or *coarser* than another.

**Example 4.2.** A quick illustration. On $\mathbb R$ the **usual topology** is the set of all unions of open intervals. That sits strictly between two extremes that also live inside $\mathcal P(\mathbb R)$:

* The **discrete topology** is *all* of $\mathcal P(\mathbb R)$ - every subset is open.
* The **trivial topology** is $\{\varnothing,\mathbb R\}$ - only the empty set and the whole line are open.

Both extreme examples obey the axioms, so they really are topologies; they just choose radically different subsets of $\mathcal P(\mathbb R)$.

#### Why the axioms use union and (binary) intersection

**Intuition 4.8.** Union ensures you can always *widen* a neighborhood without losing openness; intersection guarantees you can *refine* two overlapping neighborhoods to a smaller one. Notice it is **finite** intersection, not arbitrary - if you intersect the nested family \$(0,1/n)\$ over all \$n\$, you fall out of the usual topology and land on \${0}\$, which is closed.

**Warning 4.3.** A first-time snag: the axioms refer only to *operations already available in \$\mathcal P(X)\$*. They don’t impose anything alien; they merely select a subset stable under those operations.

**Warning 4.4.** With this subset-of-the-power-set picture in mind, the phrase *"open in \$X\$"* should read as: *belongs to the chosen \$\tau\subseteq\mathcal P(X)\$*. Keep that translation handy; the moment we attach data to opens the distinction between "all subsets" and "the ones in \$\tau\$" becomes critical.

#### A Few Final Points of Clarification

**Warning 4.5.** TODO: the example provided has a finite power set, but power sets can be infinitely large. Most of topology is actually concerned with topologies that are not finite.

**Warning 4.6.** TODO: $\tau$ is the *topology*, $X_\tau$ is the *topological space* which is define as $X$ "equipped" with or "endowed" with a topology $\tau$, often written $(X, \tau)$

**Warning 4.7.** TODO: Openness is not an intrinsic propery to some of the subsets of $X$. Many subsets of $\mathcal P(X)$ are topologies. Selection is often arbitrary, or stems from additional axioms you want to place on the subset beyond the topological ones, meaning what is "open" in one context is not in another.

**Warning 4.8.** TODO: While most treatments of topology also focus on how you get topologies from shapes, topologies can be defined on any set, not just geometric objects. Topologists abuse the term "closeness" but topology does not necessarily entail metrics; confusingly sometimes a metric entails or _induces_ a topology, though.

## Opens as a Subtype and Two More Basic Operations

{{< mediabox type="note" title="Box 5 - What to memorize" align="right" id="box5">}}
**Three notions to keep in your head.**

* **$\mathrm{Opens}(X_\tau)$ = \tau** is a way to take our topological space and get back the topology or open sets $\tau$. So you can even think of $\mathrm{Opens}()$ like a mechanism that takes in a topological space and returns the set of open subsets.
* **$V \subseteq_o U$** means: $V$ and $U$ are *both* in $\mathrm{Opens}(X_\tau)$ **and** $V\subseteq U$ as plain sets.
* The intersection of two opens is again open, so intersecting never makes either set larger.

These three bullets are the real cargo we use later when we define how to *restrict* data from one open set to another and, ultimately, how to glue local data into something global.
{{< /mediabox >}}

Up to now we’ve been talking about open sets inside a topological space, but they’ve lived implicitly within the definition of the space itself. At this stage, we want to completely pull them out into their own setting, while defining two new operations for clarity. This step may feel technical and perhaps unnecessary, and, indeed, it's more for technical convenience and is something you might want to do if you were, for example, working with a theorem prover.

**Definition 5.1.** Concretely, if $X$ is our space, we bundle all of the open subsets we want into a new "type", called $\mathrm{Opens}(X_\tau)$. Since $\mathrm{Opens}(X_\tau) = \tau$, think of an element of $\mathrm{Opens}(X_\tau)$ as "just an open set," and nothing more. Under the hood, each "open" should carry *two* pieces of data: the set itself, and a guarantee that it really is open in $X$. From there, we can treat it like an ordinary set when needed.

**Definition 5.2 & Definition 5.3.** Next, we want to specify two new operations. First, we formalise the "open-subset" relation.  For two elements $V,U\in\mathrm{Opens}(X_\tau)$ we **define**

$$
V \subseteq_o U
\quad:\Longleftrightarrow\quad
V\subseteq U\;\text{ as plain sets.}
$$

Because the typing $V,U\in\mathrm{Opens}(X_\tau)$ already certifies that both sets are open, the little circle is just a visual cue meaning: *"I’m comparing opens, not arbitrary subsets."*

**Intuition 5.1.** Equipped with this order $ \subseteq_o $ (finite meets given by $\mathrm{openInter}$ and arbitrary joins given by unions), $\mathrm{Opens}(X_\tau)$ is exactly the lattice / frame mentioned in Box 4 - so any general lattice-theoretic law you remember applies here automatically.

**Warning 5.1.** If you’ve ever fumbled the notation $V \subseteq_o U$, here’s the catch: it doesn’t mean just any subset relation. It means "$V$ and $U$ are both open, and every point of $V$ lies in $U$" but the little circle reminds you that you're only comparing open sets. Don’t lose sight of that.

**Lemma 5.1.** We also want to intersect two open sets while guaranteeing that we will remain inside the world of opens. Definitionally, it’s no surprise that we want:

$$
\mathrm{openInter}(U, V) = U \cap V,
$$

and the topology axioms guarantee that $U \cap V$ is still open.

**Intuition 5.2.** These two facts give us two easy but crucial properties: when you intersect, you always get something back that's still within the opens. In plain terms:

* intersecting with $V$ can only shrink $U$, and
* intersecting with $U$ can only shrink $V$.

**Example 5.1.** Here’s a quick sanity check: imagine $X = \mathbb{R}$ with the usual topology, let $U = (0, 2)$ and $V = (1, 3)$. Then $\mathrm{openInter}(U, V)$ is just the interval $(1, 2)$. Everything behaves exactly as you’d expect from high school intuition.

Behind the scenes, this construction simply takes the intersection of the underlying sets and verifies that the result is still open. The key point is that we've created a standalone type for open sets, complete with its own subset relation and intersection operation. In a rigorous context (e.g. in Lean or another theorem prover), these become building blocks for restriction maps on presheaves and, eventually, the gluing conditions in a sheaf. Lose these details, and you're more likely to get lost when we start talking about "compatible families" on overlaps.

## Presheaf and Sheaf of Sets

{{< mediabox type="note" title="Box 6 – What to memorize" align="right" id="box6">}}
**Six notions to memorize**

* A **presheaf** \$\mathcal F\$ on a topological space \$X\_\tau\$ assigns
  \$\mathcal F(U)\$ (a set, called the *sections over* \$U\$) to every open \$U\subseteq X\$.
* For each inclusion \$V\subseteq U\$ of opens there is a **restriction map**
  \$\rho\_{U,V}\colon \mathcal F(U)\to\mathcal F(V)\$.
* Two axioms govern these maps

  1. *(Identity)* \$\rho\_{U,U}=\operatorname{id}\_{\mathcal F(U)}\$.
  2. *(Composition)* If \$W\subseteq V\subseteq U\$ then
     \$\rho\_{U,W}=\rho\_{V,W}\circ\rho\_{U,V}\$.
* A **cover** of an open \$U\$ is a family \$(U\_i)\_{i\in I}\$ of opens with \$\bigcup\_i U\_i=U\$.
* A presheaf is a **sheaf** when two extra rules hold for every cover \${U\_i}\$:

  1. *(Locality)* Sections that agree after restriction to every overlap \$U\_i\cap U\_j\$ are equal on each \$U\_i\$.
  2. *(Gluing)* A compatible family \$(s\_i\in\mathcal F(U\_i))\$ has a **unique** section \$s\in\mathcal F(U)\$ with \$\rho\_{U,U\_i}(s)=s\_i\$ for all \$i\$.
     {{< /mediabox >}}

**Intuition 6.1.** Up to this point open sets were our only actors. A presheaf adds content by letting each open carry a collection of "allowable data" and by telling us how to compare that data when one open sits inside another.

#### Definition of a Presheaf

**Definition 6.1.** Fix a topological space \$X\_\tau\$.
A **presheaf of sets** on \$X\_\tau\$ consists of

1. A rule \$U\mapsto\mathcal F(U)\$ that assigns a set to every open \$U\subseteq X\$.
2. For every inclusion of opens \$V\subseteq U\$ a function \$\rho\_{U,V}\colon\mathcal F(U)\to\mathcal F(V)\$ called *restriction*. (\$\rho\$ is the greek lowercase rho)

TODO: in plain english these expressions read as...

**Intuition 6.2.** The two axioms in Box 6 ensure that repeated restriction behaves exactly like ordinary subset inclusion. Identity says nothing changes if you restrict to the same open. Composition says that restricting in one step or in two steps yields the same outcome.

**Intuition 6.3.** Think of \$\mathcal F(U)\$ as the catalogue of observations you can make entirely inside \$U\$. Restriction discards any part of a section that lies outside \$V\$.

#### Compatibility along a Cover

**Definition 6.2.** Let \$U\$ be an open and let \$(U\_i)\_{i\in I}\$ be a cover of \$U\$. A family of sections \$(s\_i)\$ with each \$s\_i\in\mathcal F(U\_i)\$ is **compatible** when, for every pair \$(i,j)\$, the two restricted sections agree on the overlap:

$$
\rho_{U_i,U_i\cap U_j}(s_i)=\rho_{U_j,U_i\cap U_j}(s_j).
$$

TODO: definition in plain english

**Intuition 6.4.** Compatibility is the formal way to say that the local data \$(s\_i)\$ line up on intersections.

#### Sheaf Condition

**Definition 6.3 (Sheaf Condition).** A presheaf becomes a **sheaf** precisely when every compatible family can be *glued* and the gluing is unique. Concretely:

* **Existence**: If \$(s\_i)\$ is compatible, there is a section \$s\in\mathcal F(U)\$ whose restriction to each \$U\_i\$ equals \$s\_i\$.

  $$
  \rho_{U,U_i}(s)=s_i\quad\forall i.
  $$

* **Uniqueness**: If both \$s\$ and \$t\$ restrict to the same \$s\_i\$ on every \$U\_i\$ then \$s=t\$.

**Intuition 6.5.** The locality clause in Box 6 is a convenient rephrasing of uniqueness: if two global sections look the same everywhere locally they are the same globally.

#### Minimal Example

**Example 6.1.** Take \$X\_\tau\$ and define \$\mathcal F(U)={\text{all functions }U\to\mathbb R}\$. Restriction is ordinary function restriction. Every compatible family of real-valued functions on a cover has a unique union, hence this presheaf is a sheaf. In contrast, assigning to \$U\$ the *bounded* functions \$U\to\mathbb R\$ fails the gluing requirement; a locally bounded family can glue to an unbounded function.

#### Take-Away

Presheaves let us store information locally but do not guarantee that local pieces cohere. The sheaf condition will identify exactly those presheaves where coherence and reconstruction are possible. Almost every algebraic or analytic gadget you want to study in geometry or data science naturally forms a sheaf; when it does not, the obstruction is measured by sheaf cohomology.

With presheaves and sheaves now precisely defined we have the machinery needed to discuss more advanced topics, from stalks and germs, to cohomology, schemes, manifolds, etc. (not discussed here).

## Stalks and Germs

{{< mediabox type="note" title="Box 7 – What to memorize" align="right" id="box7">}}
**Four notions to memorize**

* The **stalk** of a sheaf \$\mathcal F\$ at a point \$x\in X\$ is the direct limit

  $$
  \mathcal F_x=\varinjlim_{x\in U}\,\mathcal F(U)
  $$

  taken over all opens containing \$x\$.
* An element of \$\mathcal F\_x\$ is a **germ**, denoted \$\[s]\_x\$, of a section \$s\in\mathcal F(U)\$ defined on some neighborhood of \$x\$.
* Two sections \$s\in\mathcal F(U)\$ and \$t\in\mathcal F(V)\$ define the same germ at \$x\$ precisely when there is some open \$W\ni x\$, \$W\subseteq U\cap V\$, with

  $$
  \rho_{U,W}(s)=\rho_{V,W}(t).
  $$
* Stalks encode all possible local behaviors of a sheaf at a single point.{{< /mediabox >}}

Here I'll present two more important concepts that you encounter when dealing with sheaves. This section is non-essential on a first read through.

**Intuition 7.1.** While sections live on opens, stalks concentrate that data at a point. Instead of carrying an entire neighborhood, a germ records just the *local behavior* of a section near the point.

#### Construction of the Stalk

**Intuition 7.2.**  Think of all opens containing \(x\) as a *directed graph*: every pair \(U,V\) has a smaller neighbourhood \(W=U\cap V\) lying below it.  The arrows point “downwards’’ along these inclusions.  A *directed system* is just any collection of objects (here, the sets \(\mathcal F(U)\)) connected by arrows that always let you move further down.

**Intuition 7.3.**  The symbol  
$$
\varinjlim
$$
is read “direct limit” or “colimit.”  You meet it any time you have data that keeps getting **pushed forward** along bigger and bigger objects.  In stalks the objects are opens that shrink toward the point \(x\).  Each restriction map sends data from a larger open to a smaller one.  The direct limit remembers only the values that eventually stabilise under all those maps.

**Warning 7.1.** Sometimes students will think a direct limit is a plain union. Not always. You first *identify* elements that match under the restriction maps, then take the union of those equivalence classes.  Forgetting the identification step gives wrong answers.

**Construction 7.1.** Fix \$x\in X\$. Consider the directed system of all opens \$U\subseteq X\$ containing \$x\$, ordered by inclusion. Applying the sheaf \$\mathcal F\$ yields a diagram of restriction maps

$$
\mathcal F(U_1)\xrightarrow{\rho_{U_1,U_2}}\mathcal F(U_2)\xrightarrow{\rho_{U_2,U_3}}\cdots
$$

whenever \$U\_3\subseteq U\_2\subseteq U\_1\$. The **stalk** at \$x\$ is the colimit of this system:

$$
\mathcal F_x=\varinjlim_{x\in U}\,\mathcal F(U).
$$

**Intuition 7.4.** TODO: Equivalence class

**Definition 7.1.** Concretely, an element of \$\mathcal{F}\_x\$ is an equivalence class \$\[s]\_x\$, called a **germ**, of a section \$s \in \mathcal{F}(U)\$, where two pairs \$(U, s)\$ and \$(V, t)\$ represent the same germ if they agree on some smaller neighborhood of \$x\$.

#### Usage of Germs and Stalks

**Application 7.1.** Stalks detect local properties of sheaves. For instance:

* A morphism of sheaves is an isomorphism if and only if it induces isomorphisms on all stalks.
* Exactness of sequences of sheaves can be tested on stalks: a sequence is exact if and only if it is exact after passing to each stalk.

**Intuition 7.5.** Thus stalks translate global questions into pointwise checks. TODO expand on intuition

#### Example

**Example 7.1.** For the sheaf of continuous real functions, the stalk at \$x\$ consists of equivalence classes of functions defined near \$x\$, where two functions are equivalent if they agree on some neighborhood of \$x\$. This recovers the familiar notion of the "germ of a function" in analysis.


## Constructable and Not-So-Constructable Sheaves

TODO:
 - box for things to memorize?
 - descriptions for each subsection
 - double check everything

**Intuition 8.1.** Not all sheaves are friendly. As mentioned above, topologies can be finite or infinite. Ditto for sheaves. This has implications for how easy they are to handle in practice, and what you can do with them.

This section looks at a pragmatic, computer-science-oriented classification of sheaves according to how completely their data can be encoded, manipulated, and decided by an ordinary digital computer (i.e. a finite machine working with finite words).

#### Sheaves that can be fully modelled ("tractable")

| Archetype                                                                                                                                                                               | Why it is fully representable                                                                                                                                       | Typical software / algorithms                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Cellular / combinatorial sheaves** on a **finite CW, simplicial, or cubical complex** with stalks that are *finite sets* or *finite-dimensional vector spaces* (often over 𝔽₂ or ℚ). | • Underlying "space" is a finite poset of cells. {{< rawhtml >}}<br>{{< /rawhtml >}}• Stalks are finite objects ⇒ can be stored bit-for-bit. {{< rawhtml >}}<br>{{< /rawhtml >}}• Restriction maps are matrices of finite size. | Incidence-matrix routines, linear algebra kernels, libraries such as **PySheaf**, **Gudhi**, **Sheafhom**, **CelluarSheaves.jl**.         |
| **Constructible sheaves** (constant on each stratum) over a *finite* stratification.                                                                                                    | Reduces to a cellular sheaf on the 1-skeleton of the stratification.                                                                                                | Same as above; algorithms to compute derived pushforwards, barcodes, etc.                                                                 |
| **Coherent sheaves on affine or projective varieties defined by polynomials with rational (or finite-field) coefficients**.                                                             | Equivalent to a finitely presented graded module over a finitely generated ring. Gröbner-basis + homological algebra provide finite resolutions.                    | **Macaulay2**, **Singular**, **Sage**: syzygy, Hilbert function, cohomology, Ext, Tor. (Computation may be expensive, but it terminates.) |

*Key point:* every piece of data (cells, basis elements, matrix entries) is finite, and all axioms of a sheaf reduce to finitely many equalities that a computer can check.

#### Sheaves that can be partially modelled ("approximable")

These sheaves have *infinite* or *uncountable* raw data, but large, computable *finite shadows*.  What you can and cannot capture is indicated.

| Family of sheaves                                                                                         | What can be encoded                                                                                                                                                                                         | What *cannot* be made fully explicit                                                                                                |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Sheaf 𝒞⁰(M) of continuous (or smooth) real functions on a manifold M**                               | • Finite sample values, Taylor jets of bounded order, piecewise-polynomial approximations, or an algorithm producing arbitrary-precision evaluations.  {{< rawhtml >}}<br>{{< /rawhtml >}}• Cohomology of M via simplicial or Čech covers. | • The exact infinite graph of each section. {{< rawhtml >}}<br>{{< /rawhtml >}}• Deciding equality of two arbitrary real-valued sections (undecidable in general). |
| **Étale / locally constant sheaves on a manifold**                                                        | • Their monodromy representation into a finite group (if the sheaf is finite).  {{< rawhtml >}}<br>{{< /rawhtml >}}• Cohomology with finite coefficients.                                                                                  | • Full classification when the fiber is infinite or the fundamental group is not finitely presented.                                |
| **Perverse or constructible sheaves with *infinite-dimensional* stalks (e.g.\ derived category objects)** | • Truncations (Postnikov towers up to degree n). {{< rawhtml >}}<br>{{< /rawhtml >}}• Betti numbers, ranks of cohomology groups up to a fixed degree.                                                                                      | • The entire derived object or its exact ∞-categorical structure. {{< rawhtml >}}<br>{{< /rawhtml >}}• Non-trivial higher extensions past the chosen truncation.   |
| **Sheaves of holomorphic functions 𝒪\_X on complex analytic spaces**                                     | • Local power-series to any prescribed finite jet order.  {{< rawhtml >}}<br>{{< /rawhtml >}}• Cohomology via Čech with Stein covers (each step finite).                                                                                   | • Convergence radius data, transcendental identities, and the full infinite Taylor series.                                          |
| **Grothendieck topoi and higher-stack sheaves**                                                           | • Small sub-sites, finite test diagrams, truncated homotopy sheaves π\_≤n.                                                                                                                                  | • Full ∞-categorical data, all higher coherences.                                                                                   |

#### Sheaves that are essentially incomputable

| Example                                                                          | Obstruction                                                                                                                                                                          |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Arbitrary sheaves of sets on an arbitrary (even countable) topological space** | The sheaf condition involves *all* open covers. Because deciding whether a family of sections on *all* covers admits gluing is Π²-complete, no general terminating algorithm exists. |
| **Sheaves with stalks that are arbitrary subsets of ℝ or ℂ**                     | Each stalk is an uncountable set requiring non-recursive real numbers → cannot even **name** the elements finitely.                                                                  |
| **Deciding isomorphism of two general sheaves on a non-finite space**            | Reduces to logical theories with known undecidable fragments (analogous to the word problem for groups).                                                                             |

---

#### How to read the table "partially modelled"

For a partially modelled sheaf, the following *specific aspects* are usually still computable:

1. **Finite-degree cohomology groups**
   - Build a finite cover or cell structure, form a Čech or cellular chain complex, and compute homology up to dimension *k*.

2. **Restriction maps on a finite nerve**
   - Pick a finite basis of opens/cells; compute the induced restriction matrices.

3. **Local algebraic data truncated at order *N***
   - Taylor jets, Gröbner-basis segments, or spectral-sequence pages E₁…E\_N.

4. **Numerical evaluation procedures**
   - Provide an algorithm that, given rational input *x* and precision ε, returns an approximation of the section’s value; this is still a finite object (a program) even if the actual function is infinite.

Everything outside those finite windows - e.g.\ infinite jets, convergence radii, global analytic identities, higher Ext groups - remains inaccessible without additional *oracle* information that a classical computer does not possess.

#### Take-Away

A sheaf is fully computer-tractable precisely when *both* its underlying indexing site **and** every stalk/restriction map can be described by *finite* data.  The moment either becomes infinite, you must settle for finite approximations like cohomology to bounded degree, truncated jets, finitely many covers, or you must live with outright undecidability.

## Sheaves in (pseudo-)Lean

In this section I'll restate everything up to sheaves (skipping stalks and germs) using a (pseudo) computer language (pseudo-Lean, in particular) in a somewhat "literate programming" style. If you're like me, and have more of a software-engineer's brain than a mathematician's brain, this kind of treatment feels a bit more approachable (however if you're not familiar with theorem provers this may still look like greek).

#### 0. Building a bare-bones "Set" theory

First, we should give ourselves a universe of sets, a way to talk about membership, and the usual subset notation.

```lean
/-!
  We introduce a type `Set` living in some universe `u`.
  Then we postulate a binary relation `elem : Set → Set → Prop`
  which we will write infix as `x ∈ y`.  Finally, we define
  `U ⊆ V` by "every element of `U` is also in `V`."
-/
universe u                          -- we’ll work in arbitrary universe `u`
axiom Set : Type u                  -- a type whose elements we think of as "sets"
axiom elem : Set → Set → Prop       -- membership relation
infix:50 " ∈ " => elem              -- allow us to write `x ∈ U`

/-- `U ⊆ V` means everything in `U` is also in `V`. -/
def subset (U V : Set) : Prop := 
  ∀ u, u ∈ U → u ∈ V
infix:50 " ⊆ " => subset

/-- Extensionality: two sets are equal if they have the same members. -/
axiom set_ext {A B : Set} :
  (∀ u, u ∈ A ↔ u ∈ B) → A = B
```

Even if you’ve never used a theorem prover, you probably knew that sets are determined by their elements; `set_ext` is that familiar principle.  The `subset` definition and `infix` lines just give us the usual notation / syntax sugar.

#### 1. Unions and intersections

Next we define arbitrary union and pairwise intersection, plus the usual membership lemmas.

```lean
/-!
  We postulate a way to form the union of a *collection* `S : Set`.
  We also postulate binary intersection `X ∩ Y`.
-/
axiom union : Set → Set            -- ⋃₀ S
axiom inter : Set → Set → Set      -- X ∩ Y
infix:55 " ∩ " => inter             -- notation

/-- Membership in a union ↔ it lies in some piece. -/
axiom mem_union_iff {S u} :
  u ∈ union S ↔ ∃ T, T ∈ S ∧ u ∈ T

/-- Membership in an intersection ↔ it’s in both. -/
axiom mem_inter_iff {X Y u} :
  u ∈ inter X Y ↔ (u ∈ X ∧ u ∈ Y)

/-- From `u ∈ X ∩ Y` we get `u ∈ X`. -/
lemma inter_subset_left {X Y : Set} :
  X ∩ Y ⊆ X := 
by
  intro u h
  show u ∈ X
  exact (mem_inter_iff.1 h).1

/-- And similarly for the right factor. -/
lemma inter_subset_right {X Y : Set} :
  X ∩ Y ⊆ Y := 
by
  intro u h
  exact (mem_inter_iff.1 h).2
```

So the key ideas here are:

* `union S` means "all points lying in *some* member of `S`."
* `inter X Y` is the familiar pairwise intersection.
* The two `lemmas` simply project out the left or right part of `u ∈ X ∧ u ∈ Y`.

#### 2. Encoding a Topological space

Next we want to pack up a carrier set plus an "open-set" predicate, closed under unions and finite intersections.

```lean
/-- A topological space `X` consists of:
   1. a carrier set `carrier`;
   2. a predicate `is_open : Set → Prop`;
   3. proofs that `carrier` is open;
   4. that arbitrary unions of opens are open;
   5. that finite intersections of opens are open.
-/
structure TopologicalSpace where
  carrier        : Set
  is_open        : Set → Prop
  is_open_univ   : is_open carrier
  is_open_sUnion : ∀ {S : Set}, (∀ U, U ∈ S → is_open U) → is_open (union S)
  is_open_inter  : ∀ {U V : Set}, is_open U → is_open V → is_open (U ∩ V)
```

Notice that this is Lisp-like, and you might think of `TopologicalSpace` as a little record or struct holding exactly the shape of the usual axioms.

TODO: expand on this comment because it might be mildly interesting to a programmer

#### 3. Packaging "open" sets as a subtype

Now we want to make it convenient to refer *only* to open sets, so that downstream definitions (presheaf, etc.) never accidentally leak non-opens.

```lean
/-- The type of opens of `X`.  An element is a pair `(U, h)`
    where `U : Set` and `h : X.is_open U`. -/
def Opens (X : TopologicalSpace) : Type :=
  { U : Set // X.is_open U }

/-- We can automatically coerce an `Opens X` back to its underlying `Set`. -/
instance (X : TopologicalSpace) : Coe (Opens X) Set where
  coe U := U.1

/-- We write `V ⊆ₒ U` if, as underlying sets, `V ⊆ U`. -/
def open_subset {X} (V U : Opens X) : Prop :=
  (V : Set) ⊆ (U : Set)

notation:50 V " ⊆ₒ " U => open_subset V U

/-- Intersection of two opens gives another open. -/
noncomputable def openInter {X}
  (U V : Opens X) : Opens X :=
⟨ (U : Set) ∩ (V : Set),
  X.is_open_inter U.2 V.2 ⟩

-- And the fact that this intersection sits inside each factor:
lemma openInter_subset_left {X} (U V : Opens X) : 
  (openInter U V : Set) ⊆ (U : Set) :=
inter_subset_left

lemma openInter_subset_right {X} (U V : Opens X) : 
  (openInter U V : Set) ⊆ (V : Set) :=
inter_subset_right
```

**Note.**  The `.1` and `.2` projections pull out the "raw set" and the proof of openness, respectively.

#### 4. Defining presheaves and sheaves of sets

We’re finally ready to say what a **presheaf** is: it assigns to each open $U$ a set $F(U)$, and to each inclusion $V ⊆ₒ U$ a restriction map $F(U) → F(V)$, subject to the usual identity and composition laws.

```lean
universe v

/-- A presheaf on `X` assigns:
   1. `F U : Type` for each open `U`;
   2. a map `res` that, given `V ⊆ₒ U`, restricts `F U → F V`;
   3. the identity‐law for `res`;
   4. the composition‐law for chaining two restrictions.
-/
structure Presheaf (X : TopologicalSpace) where
  F        : Opens X → Set
  res      : ∀ {U V : Opens X}, (V ⊆ₒ U) → (F U → F V)
  res_id   : ∀ {U} (s : F U), 
               res (by simp) s = s
  res_comp : ∀ {U V W} (h₁ : W ⊆ₒ V) (h₂ : V ⊆ₒ U)
                  (s : F U),
               let rUV := res h₂
               let rVW := res h₁
               let rUW := res (by simp [h₁, h₂])
               rVW (rUV s) = rUW s
```

In plain terms:

* `F U` is the "sections over U."
* `res` is "pullback along inclusion."
* `res_id` says pulling back along the trivial inclusion $U ⊆ₒ U$ does nothing.
* `res_comp` says that doing two pulls in a row is the same as pulling once along the composite inclusion.

#### 4.1. Covers

We need the notion of an *indexed cover* of an open set $U$.  That is, a family $\{U_i\}_{i∈𝕀}$ of opens that jointly cover $U$.

```lean
/-- A cover of `U` consists of:
   • an index type `ι`,
   • a function `Uis : ι → Opens X`,
   • proofs each `Uis i ⊆ₒ U`,
   • and coverage: every point of `U` lies in some `Uis i`.
-/
structure Cover (X : TopologicalSpace) (U : Opens X) where
  ι      : Type v
  Uis    : ι → Opens X
  sub    : ∀ i, Uis i ⊆ₒ U
  covers : ∀ x, x ∈ (U : Set) → ∃ i, x ∈ (Uis i : Set)
```

#### 4.2. Sheaf condition

Finally, a **sheaf** is a presheaf where sections over a cover can be *uniquely glued* if they agree on all overlaps.

```lean
/-- A sheaf is a presheaf satisfying the usual gluing axiom:
   Given a cover `C` of `U` and a choice of sections
   `s i : F (C.Uis i)` that agree on each overlap,
   there exists a unique `t : F U` restricting to each `s i`.
-/
structure Sheaf (X : TopologicalSpace) extends Presheaf X where
  gluing :
    ∀ {U : Opens X} (C : Cover X U)
      (s : ∀ i, F (C.Uis i))
      (compat : ∀ i j,
         let W := openInter (C.Uis i) (C.Uis j)
         let r_i := res (C.sub i ▸ openInter_subset_left  _ _)
         let r_j := res (C.sub j ▸ openInter_subset_right _ _)
         r_i (s i) = r_j (s j)),
    ∃! t, t ∈ F U ∧
      ∀ i, res (C.sub i) t = s i
```

What’s going on here?:

1. You pick an open `U` and a cover `C` of it.
2. You have local sections `s i : F(Uᵢ)`.
3. You demand they "match" on each overlap.
4. Then there’s a *unique* global `t : F(U)` restricting to each `s i`.

## Mnemonics

TODO

## Wrapping Up

So there it is. We’ve climbed a long ladder from the bare bones of set theory up through topological spaces, opens as their own type, presheaves, and finally the sheaf axioms themselves. Hopefully it wasn't too painful.

You might be wondering: What’s Next?:

* **Schemes and manifolds.**  Having demystified sheaves, you’re well-positioned to see how they underpin algebraic geometry (via structure sheaves on schemes) and differential geometry (via sheaves of smooth functions and forms). I plan to create posts for both of these.
* **Sheaf cohomology.**  We’ve hinted at cohomology as “measuring the failure to glue.”  A future post will build the Čech complex, define higher cohomology groups, and explore examples from topology and physics.
* **Stacks and higher sheaves.**  Two-tier data, monodromy, and descent naturally lead to stacks (2-sheaves) and higher categorical generalizations which are essential for modern moduli problems, homotopical algebra, and which can be found all over the place in the real world if you go looking.

Anyway, thanks for sticking with this "from scratch" expedition.  With sheaves now in your toolkit, you’re closer to unlocking the unifying perspectives that underlie on geometry, analysis, computation, and even logic.
