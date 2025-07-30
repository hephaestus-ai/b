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

## Primitive Set Theory

{{< mediabox type="note" title="Box 1 – What to memorize" align="right" id="box1">}}
**Four set theoretic notions to memorize:**

* **Universe**: a type called $\texttt{Set}$  
* **Membership relation**: $\in$  
* **Subset relation**: $U\subseteq V\;:\iff\;\forall u\,(u\in U\Rightarrow u\in V)$  
* **Extensionality**: $A=B\iff\forall u\;(u\in A\Leftrightarrow u\in B)$  
{{< /mediabox >}}

## Constructors Used by Topology

## Topological Space

## Opens as a Subtype and Basic Operations

{{< mediabox type="note" title="Box 4 – What to memorize" align="right" id="box4">}}
**Three notions to keep in your head:**

* **Opens (X)** is the universe of open subsets of $X$.
* $V \subseteq_o U$ means: $V$ is contained in $U$ *and both are open*.
* The intersection of two opens is again open, and it never makes either set larger.

These three bullets are the real cargo we need later when we define how to *restrict* data from one open set to another and, ultimately, how to glue local data into something global.
{{< /mediabox >}}

Up to now we’ve been talking about open sets inside a topological space, but they’ve lived implicitly within the definition of the space itself. At this stage, we pull them out into their own setting—without introducing any computational baggage.

Concretely, if $X$ is our space, we bundle all of its open subsets into a new type, called $\mathrm{Opens}(X)$. Think of an element of $\mathrm{Opens}(X)$ as “just an open set,” and nothing more. Under the hood, each “open” carries *two* pieces of data: the set itself, and a guarantee that it really is open in $X$. From there, we can treat it like an ordinary set when needed.

If you’ve ever fumbled the notation $V \subseteq_o U$, here’s the catch: it doesn’t mean just any subset relation. It means “$V$ and $U$ are both open, and every point of $V$ lies in $U$” but the little circle reminds you that you're only comparing open sets. Don’t lose sight of that.

We also want to intersect two open sets and remain inside the world of opens. Definitionally, it’s no surprise that:

$$
\mathrm{openInter}(U, V) = U \cap V,
$$

and the topology axioms guarantee that $U \cap V$ is still open. These two facts give us two easy but crucial properties: when you intersect, you don’t accidentally “grow” your set. In plain terms:

* intersecting with $V$ can only shrink $U$, and
* intersecting with $U$ can only shrink $V$.

Here’s a quick sanity check: imagine $X = \mathbb{R}$ with the usual topology, let $U = (0, 2)$ and $V = (1, 3)$. Then $\mathrm{openInter}(U, V)$ is just the interval $(1, 2)$. Everything behaves exactly as you’d expect from high school intuition.

Behind the scenes, this construction simply takes the intersection of the underlying sets and verifies that the result is still open. The key point is that we've created a standalone type for open sets, complete with its own subset relation and intersection operation. These are the building blocks for restriction maps on presheaves and, eventually, the gluing conditions in a sheaf. Lose these details, and you’ll quickly get lost when we start talking about “compatible families” on overlaps.


## Presheaf and Sheaf of Sets

## Constructable Sheaves

## Why Sheaves are Important

## Wrapping Up