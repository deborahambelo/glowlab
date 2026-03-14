// Example seed data matching your target Firestore schema.
// Collections:
// - blogs
// - fitnessGroups
// - skincareConcerns

export const seedBlogs = [
  {
    title: "How to Introduce Retinol Safely",
    date: "Feb 12, 2026",
    cat: "Skincare",
    preview:
      "Retinoids are one of the most evidence-backed skincare ingredients — but they come with a learning curve. Here's exactly how to start without the dreaded purge.",
    read: "5 min",
    body:
      "Start with adapalene OTC 0.1%, applied 2–3 nights per week. Always moisturize after applying. Expect mild peeling in weeks 2–4 — this is normal cell turnover, not an allergic reaction. After 4–6 weeks at 2–3x per week, move to every other night, then nightly over 3 months. Never layer with AHAs or BHAs at the same time initially. SPF is non-negotiable when using retinoids — UV degrades retinol and dramatically increases sensitivity.",
  },
  {
    title: "Progressive Overload Explained",
    date: "Jan 15, 2026",
    cat: "Fitness",
    preview:
      "The single principle behind every physique transformation ever. If you're not progressively overloading, you're maintaining — not building.",
    read: "6 min",
    body:
      "Progressive overload means consistently increasing the demand placed on your muscles over time. This doesn't only mean adding weight — it also includes adding reps, reducing rest periods, slowing the eccentric phase, or improving range of motion.",
  },
];

export const seedFitnessGroups = [
  {
    id: "glutes",
    label: "Glutes",
    icon: "🍑",
    color: "#f97316",
    bg: "#fff7ed",
    tip: "Hip thrusts are the #1 glute exercise. Squeeze hard at the top for 1 second every rep.",
    exercises: [
      {
        name: "Barbell Hip Thrust",
        sets: "4",
        reps: "8–12",
        level: "Intermediate",
        desc: "Shoulder blades on bench, bar across hip crease. Drive hips up to full extension and squeeze.",
      },
      {
        name: "Romanian Deadlift",
        sets: "3",
        reps: "10–12",
        level: "Intermediate",
        desc: "Hinge at hips, push them back. Bar close to legs. Feel hamstring stretch, then drive hips forward.",
      },
    ],
  },
  {
    id: "abs",
    label: "Core & Abs",
    icon: "⚡",
    color: "#ca8a04",
    bg: "#fefce8",
    tip: "Train for bracing, anti-rotation, and stability. Crunches alone won't build the core you want.",
    exercises: [
      {
        name: "Dead Bug",
        sets: "3",
        reps: "8–10 each side",
        level: "Beginner",
        desc: "On back, extend opposite arm and leg. Keep low back pressed into floor.",
      },
    ],
  },
];

export const seedSkincareConcerns = [
  {
    id: "acne",
    label: "Acne & Breakouts",
    emoji: "🫧",
    color: "#f43f5e",
    bg: "#fef2f2",
    description:
      "Recurring pimples, cysts, blackheads caused by clogged pores, excess sebum, and bacteria.",
    causes: ["Excess oil production", "Hormonal fluctuations", "C. acnes bacteria"],
    ingredients: ["Salicylic Acid (BHA)", "Benzoyl Peroxide", "Niacinamide"],
    products: {
      Cleansers: [
        {
          id: "acne-cleanser-effaclar",
          brand: "La Roche-Posay",
          name: "Effaclar Gel Cleanser",
          key: "Zinc Pirithione",
          benefit: "Controls oil without over-drying sensitized skin",
        },
      ],
      Treatment: [
        {
          id: "acne-treatment-adapalene",
          brand: "Differin",
          name: "Adapalene Gel 0.1%",
          key: "Adapalene (Retinoid)",
          benefit: "OTC retinoid that clears breakouts and prevents future ones",
        },
      ],
    },
    routine: {
      AM: ["Cleanser", "Moisturizer", "Sunscreen SPF 50"],
      PM: ["Cleanser", "Retinoid (2–3× per week)", "Moisturizer"],
      tips: ["Start retinoids 2–3× per week then slowly increase", "Never skip SPF"],
    },
  },
];

