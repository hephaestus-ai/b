---
draft: true
title: "System Design for Deep Space Probes"
---

# System Design for Deep Space Probes

This post outlines a speculative system architecture for a Voyager-style interstellar probe, with an emphasis on ultra-long-term reliability through software and systems engineering techniques. The design leans on methods like Byzantine fault tolerance, redundancy across multiple subsystems, and formal hazard analysis using STPA (System-Theoretic Process Analysis) to reason about failure modes.

This was sparked by a conversation about NASA’s C coding standards, and grew into a broader exploration of how you might design a system intended to run mostly unsupervised for several human lifetimes.

The goal is to push expected operational lifetime into at least the multi-century range -- admittedly impractical, but an interesting thought experiment in resilient design under extreme constraints, and something that goes beyond the usual system design problem in any domain. Unfortunately, as we will see, these techniques appear no where near sufficient to get us any place interesting beyond the solar system, yet they still gesture towards what will be needed.

Near the end I also briefly discuss:
* materials and technologies needed to extend the lifespan of a spacecraft more or less indefinitely
* the scientific value of such missions in the modern era, and why, despite that, they remain deeply compelling as engineering artifacts.

{{< table_of_contents >}}

## Introduction

## Discussion