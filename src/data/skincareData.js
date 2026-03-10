export const SKINCARE_CONCERNS = {
  acne: {
    id: "acne",
    label: "Acne & Breakouts",
    emoji: "🫧",
    color: "#f43f5e",
    bg: "#fef2f2",
    description:
      "Recurring pimples, cysts, blackheads caused by clogged pores, excess sebum, and bacteria.",
    causes: [
      "Excess oil production",
      "Hormonal fluctuations",
      "C. acnes bacteria",
      "Diet & stress triggers"
    ],
    ingredients: [
      "Salicylic Acid (BHA)",
      "Benzoyl Peroxide",
      "Adapalene / Tretinoin",
      "Niacinamide"
    ],
    products: {
      Cleansers: [
        {
          id: "acne-cleanser-effaclar",
          brand: "La Roche-Posay",
          name: "Effaclar Gel Cleanser",
          key: "Zinc Pirithione",
          benefit: "Controls oil without over-drying sensitized skin"
        },
        {
          id: "acne-cleanser-cerave-salicylic",
          brand: "CeraVe",
          name: "Salicylic Acid Cleanser",
          key: "Salicylic Acid 2%",
          benefit: "Unclogs pores and smooths skin texture daily"
        }
      ],
      Treatment: [
        {
          id: "acne-treatment-adapalene",
          brand: "Differin",
          name: "Adapalene Gel 0.1%",
          key: "Adapalene (Retinoid)",
          benefit: "OTC retinoid that clears breakouts and prevents future ones"
        },
        {
          id: "acne-treatment-tretinoin",
          brand: "Rx Only",
          name: "Tretinoin 0.025–0.05%",
          key: "Tretinoin (Prescription)",
          benefit: "Gold-standard retinoid — see a dermatologist to prescribe"
        }
      ],
      Moisturizers: [
        {
          id: "acne-moisturizer-neutrogena-hydroboost",
          brand: "Neutrogena",
          name: "Hydro Boost Water Gel",
          key: "Hyaluronic Acid",
          benefit: "Lightweight, non-comedogenic hydration"
        },
        {
          id: "acne-moisturizer-cetaphil-lotion",
          brand: "Cetaphil",
          name: "Moisturizing Lotion",
          key: "Glycerin & Niacinamide",
          benefit: "Gentle barrier support for acne-prone skin"
        },
        {
          id: "acne-moisturizer-vanicream-cream",
          brand: "Vanicream",
          name: "Moisturizing Cream",
          key: "Fragrance & dye free",
          benefit: "Ideal for reactive acne skin — zero irritants"
        }
      ],
      Sunscreen: [
        {
          id: "acne-sunscreen-fixderma-shadow",
          brand: "Fixderma",
          name: "Shadow SPF 50+",
          key: "Chemical filters",
          benefit: "Matte finish, safe for acne-prone skin"
        },
        {
          id: "acne-sunscreen-eucerin-oil-control",
          brand: "Eucerin",
          name: "Oil Control SPF 30",
          key: "Mattifying Silica",
          benefit: "Controls shine throughout the day"
        },
        {
          id: "acne-sunscreen-neutrogena-ultra-sheer",
          brand: "Neutrogena",
          name: "Ultra Sheer SPF 50",
          key: "Helioplex",
          benefit: "Featherlight texture, no white cast"
        }
      ]
    },
    routine: {
      AM: ["Cleanser", "Moisturizer", "Sunscreen SPF 50"],
      PM: ["Cleanser", "Retinoid (2–3× per week)", "Moisturizer"],
      tips: [
        "Start retinoids 2–3× per week then slowly increase",
        "Never mix retinoids with AHAs/BHAs initially",
        "Always moisturize after retinoid to buffer irritation",
        "Never skip SPF — UV exposure worsens post-acne marks"
      ]
    }
  },
  hyperpigmentation: {
    id: "hyperpigmentation",
    label: "Hyperpigmentation",
    emoji: "🌑",
    color: "#d97706",
    bg: "#fffbeb",
    description:
      "Dark spots, uneven skin tone, post-acne marks (PIH), and melasma from excess melanin.",
    causes: [
      "UV exposure (worsens all pigmentation)",
      "Post-inflammatory response from acne",
      "Hormones (melasma)",
      "Skin trauma or picking"
    ],
    ingredients: ["Azelaic Acid", "Tranexamic Acid", "Glycolic Acid (AHA)"],
    products: {
      "Active Ingredients": [
        {
          id: "pigment-azelaic-ordinary",
          brand: "The Ordinary",
          name: "Azelaic Acid Suspension 10%",
          key: "Azelaic Acid",
          benefit: "Reduces PIH, redness, and uneven tone gently"
        },
        {
          id: "pigment-tranexamic-inkey",
          brand: "The Inkey List",
          name: "Tranexamic Acid Serum",
          key: "Tranexamic Acid 2%",
          benefit: "Targets stubborn melasma and deep dark spots"
        },
        {
          id: "pigment-glycolic-toner",
          brand: "The Ordinary",
          name: "Glycolic Acid 7% Toner",
          key: "Glycolic Acid",
          benefit: "Exfoliates surface cells, evens texture and tone"
        }
      ],
      Sunscreen: [
        {
          id: "pigment-sunscreen-fixderma-shadow",
          brand: "Fixderma",
          name: "Shadow SPF 50+",
          key: "Broad Spectrum",
          benefit: "Prevents existing spots from darkening further"
        },
        {
          id: "pigment-sunscreen-neutrogena-ultra-sheer",
          brand: "Neutrogena",
          name: "Ultra Sheer SPF 50",
          key: "UVA/UVB filters",
          benefit:
            "Lightweight daily shield non-negotiable for pigmentation"
        }
      ]
    },
    routine: {
      AM: [
        "Cleanser",
        "Vitamin C serum (optional)",
        "Moisturizer",
        "SPF 50 — non-negotiable"
      ],
      PM: ["Cleanser", "Azelaic Acid or Tranexamic Acid", "Moisturizer"],
      tips: [
        "Sunscreen is your #1 treatment — actives alone won't work without it",
        "Introduce acids one at a time, 3× per week to start",
        "Fading takes 8–12 weeks minimum — be patient",
        "Avoid picking at skin — it triggers more PIH"
      ]
    }
  },
  dryness: {
    id: "dryness",
    label: "Dryness & Dehydration",
    emoji: "🌿",
    color: "#0d9488",
    bg: "#f0fdfa",
    description:
      "Tight, flaky, dull skin from a compromised barrier lacking water or lipids.",
    causes: [
      "Damaged skin barrier",
      "Over-cleansing or harsh products",
      "Low humidity / cold weather",
      "Hot showers and heavy exfoliation"
    ],
    ingredients: ["Hyaluronic Acid", "Ceramides", "Glycerin"],
    products: {
      "Hydrating Serums": [
        {
          id: "dryness-serum-ordinary-ha",
          brand: "The Ordinary",
          name: "Hyaluronic Acid 2% + B5",
          key: "Hyaluronic Acid",
          benefit:
            "Draws moisture deep into skin — apply on damp skin"
        },
        {
          id: "dryness-serum-vichy-mineral89",
          brand: "Vichy",
          name: "Minéral 89 Booster",
          key: "HA + Minerals",
          benefit: "Strengthens and deeply hydrates in one step"
        }
      ],
      Moisturizers: [
        {
          id: "dryness-moisturizer-neutrogena-hydroboost",
          brand: "Neutrogena",
          name: "Hydro Boost Water Gel",
          key: "Hyaluronic Acid",
          benefit:
            "Fast-absorbing gel for dehydrated combination skin"
        },
        {
          id: "dryness-moisturizer-cerave-cream",
          brand: "CeraVe",
          name: "Moisturizing Cream",
          key: "Ceramides 1,3,6-II",
          benefit:
            "Repairs and maintains skin barrier — dermatologist favourite"
        }
      ],
      "Night Occlusives": [
        {
          id: "dryness-occlusive-vaseline",
          brand: "Vaseline",
          name: "Original Petroleum Jelly",
          key: "Petrolatum",
          benefit:
            "Ultimate moisture seal overnight — 'slugging' method"
        },
        {
          id: "dryness-occlusive-aquaphor",
          brand: "Aquaphor",
          name: "Healing Ointment",
          key: "Petrolatum + Panthenol",
          benefit:
            "Repairs very dry, cracked areas overnight"
        }
      ]
    },
    routine: {
      AM: [
        "Gentle non-foaming cleanser",
        "HA serum on damp skin",
        "Ceramide moisturizer",
        "SPF"
      ],
      PM: [
        "Gentle cleanser",
        "HA serum",
        "Rich ceramide moisturizer",
        "Occlusive (slug 2–3× per week)"
      ],
      tips: [
        "Apply HA on damp skin — it needs water to draw in",
        "Slug 2–3 nights per week to lock in hydration",
        "Switch to a non-foaming cleanser immediately",
        "Avoid hot showers — use lukewarm water"
      ]
    }
  }
};

export const ALL_PRODUCTS = Object.values(SKINCARE_CONCERNS).flatMap(
  (concern) =>
    Object.entries(concern.products).flatMap(([category, items]) =>
      items.map((item) => ({
        ...item,
        concernId: concern.id,
        concernLabel: concern.label,
        category
      }))
    )
);

