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

## System Design With STPA Methodology



## Mission Profile and Requirements

#### Characteristics of the target environment

####  Power

####  Communications

####  Operational constraints

## High-Level System Architecture

####  Compute core: Multi-node BFT-based "kernel"

####  Memory & Storage

####  Clock & Power domains

####  Data & Control Fabric

## Fault-Tolerance Strategies

####  Byzantine Fault Tolerance at every layer (2f+1 quorum)

####  Self-diagnosis and recovery flows

####  Consensus-based bootloader and image management

####  Watchdog hierarchy and power-cycle quarantine

## Diversity and Anti-Common-Mode Measures

####  Heterogeneous cores (ISA diversity)

####  Compiler and toolchain diversity

####  Physical placement and shielding strategies

####  Vendor and fab diversity

## Formal Hazard Analysis with STPA

####  Identifying unsafe control actions

####  Mapping faults to hazardous states

####  Designing control structure and safety constraints

####  Integrating STPA results into design decisions

## Reliability Modeling and Lifetime Estimation

####  Radiation-induced failure rates (TID, SEL, displacement)

####  Permanent hardware decay (polymers, solder fatigue, micrometeoroid damage)

####  Exponential failure models and expected time to quorum loss

####  Graceful degradation vs. strict quorum policies

## Material and Technology Roadmap

####  Current rad-hard hardware capabilities

####  Emerging substrates

####  Packaging innovations

####  Self-replication and in-situ repair prospects

#### Estimated lifespans

## Risk Discussion: Scientific vs. Engineering Value

####  Limited scientific return compared to mission cost and complexity

####  Cultural and inspirational roles of ultra-durable probes

####  Engineering lessons for adjacent domains

## Conclusions and Future Work

## Bibliography

