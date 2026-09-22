export const site = {
  name: "Ashish Pandey",
  title: "Physics × Mathematics",
  domain: "ashishpandey.com",
  email: "hello@ashishpandey.com",
  location: "",
  statement:
    "I am interested in the structures beneath reality—the mathematics that describes them, the physics that reveals them, and the questions that remain unanswered.",
  chapter: "Metamorphosis",
  chapterLine: "This is the beginning of my metamorphosis."
};

export const questions = [
  "What is reality made of?",
  "Why does mathematics describe nature so effectively?",
  "How does complexity emerge from simple laws?",
  "What happens when abstraction becomes technology?",
  "What can I build with what I learn?"
];

export const fields = [
  {
    group: "Physics",
    items: ["Classical Mechanics", "Electromagnetism", "Quantum Mechanics", "Relativity", "Computational Physics"]
  },
  {
    group: "Mathematics",
    items: ["Calculus", "Linear Algebra", "Differential Equations", "Probability", "Analysis"]
  },
  {
    group: "Computation",
    items: ["Scientific Computing", "Simulation", "Data Analysis", "Machine Learning", "Visualization"]
  }
];

export const fallbackContent = [
  {
    type: "project",
    slug: "double-pendulum",
    title: "Double Pendulum",
    excerpt: "A computational study of deterministic motion becoming visually chaotic.",
    body: "Question: How quickly do nearby initial conditions diverge in a double-pendulum system?\n\nBuild the simulation, compare trajectories, and document the mathematics behind the motion.",
    metadata: { statusLabel: "Planned", disciplines: ["Mechanics", "Differential Equations", "Simulation"] },
    status: "public",
    sort_order: 10
  },
  {
    type: "project",
    slug: "fourier-lab",
    title: "Fourier Laboratory",
    excerpt: "An interactive exploration of how simple waves reconstruct complex signals.",
    body: "Question: How can periodic structures be decomposed into a language of frequencies?",
    metadata: { statusLabel: "Exploring", disciplines: ["Analysis", "Signals", "Visualization"] },
    status: "public",
    sort_order: 20
  },
  {
    type: "project",
    slug: "orbital-sandbox",
    title: "Orbital Sandbox",
    excerpt: "A visual numerical playground for two-body and multi-body orbital motion.",
    body: "Question: What do conservation laws look like when they are made interactive?",
    metadata: { statusLabel: "Planned", disciplines: ["Gravity", "Numerical Methods", "Computation"] },
    status: "public",
    sort_order: 30
  },
  {
    type: "research",
    slug: "mathematics-of-physical-law",
    title: "The Mathematics of Physical Law",
    excerpt: "An evolving reading and research thread on why mathematical structure maps so effectively onto nature.",
    body: "A long-term inquiry connecting symmetry, differential equations, geometry, and physical law.",
    metadata: { statusLabel: "Open question" },
    status: "public",
    sort_order: 10
  },
  {
    type: "note",
    slug: "beginning",
    title: "The Beginning",
    excerpt: "A note about choosing to document the process before the outcome is known.",
    body: "A portfolio usually displays finished work. I want this one to preserve the unfinished process: questions, experiments, revisions, and the changing shape of ambition.",
    metadata: { dateLabel: "Chapter 01" },
    status: "public",
    sort_order: 10
  },
  {
    type: "note",
    slug: "linear-algebra-physics",
    title: "Why Linear Algebra Keeps Appearing",
    excerpt: "A future notebook entry connecting vectors, transformations, eigenvalues, and physical models.",
    body: "Notes in progress.",
    metadata: { dateLabel: "Planned" },
    status: "public",
    sort_order: 20
  },
  {
    type: "timeline",
    slug: "2026-beginning",
    title: "2026 — The Beginning",
    excerpt: "Physics × Mathematics. Building foundations and beginning to publish the process.",
    status: "public",
    sort_order: 10
  },
  {
    type: "timeline",
    slug: "exploration",
    title: "Exploration",
    excerpt: "Research, programming, independent projects, and deeper mathematical maturity.",
    status: "public",
    sort_order: 20
  },
  {
    type: "timeline",
    slug: "specialization",
    title: "Specialization",
    excerpt: "The direction is intentionally unresolved. The work will determine it.",
    status: "public",
    sort_order: 30
  },
  {
    type: "timeline",
    slug: "unknown",
    title: "Beyond — ?",
    excerpt: "The next version has not been written yet.",
    status: "public",
    sort_order: 40
  },
  {
    type: "current",
    slug: "studying",
    title: "Studying",
    excerpt: "Physics + Mathematics foundations",
    status: "public",
    sort_order: 10
  },
  {
    type: "current",
    slug: "building",
    title: "Building",
    excerpt: "This evolving portfolio and its first scientific experiments",
    status: "public",
    sort_order: 20
  },
  {
    type: "current",
    slug: "thinking",
    title: "Thinking about",
    excerpt: "How mathematical structure becomes physical understanding",
    status: "public",
    sort_order: 30
  },
  {
    type: "current",
    slug: "question",
    title: "Current question",
    excerpt: "What should I understand deeply enough to build with?",
    status: "public",
    sort_order: 40
  }
];
