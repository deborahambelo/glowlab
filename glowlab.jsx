import { useState, createContext, useContext, useEffect } from "react";

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #faf8f5; font-family: 'DM Sans', sans-serif; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #faf8f5; }
    ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
    .serif { font-family: 'DM Serif Display', serif; }
    .italic { font-style: italic; }
    .fade-up { animation: fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
    .btn { font-family:'DM Sans',sans-serif; font-weight:600; font-size:13px; letter-spacing:0.02em; padding:10px 22px; border-radius:100px; border:none; cursor:pointer; transition:all 0.22s ease; }
    .btn-dark { background:#1a1a1a; color:white; }
    .btn-dark:hover { background:#333; transform:translateY(-1px); box-shadow:0 8px 18px rgba(0,0,0,0.18); }
    .btn-rose { background:#f43f5e; color:white; }
    .btn-rose:hover { background:#e11d48; transform:translateY(-1px); box-shadow:0 8px 18px rgba(244,63,94,0.28); }
    .btn-outline { background:transparent; border:1.5px solid #e5e7eb; color:#4b5563; }
    .btn-outline:hover { border-color:#9ca3af; background:#f9fafb; }
    .btn-sm { padding:7px 14px; font-size:12px; }
    .tag { display:inline-block; padding:3px 10px; border-radius:100px; font-size:11px; font-weight:600; letter-spacing:0.04em; font-family:'DM Sans',sans-serif; }
    .expand-body { animation:expandIn 0.38s cubic-bezier(0.22,1,0.36,1) both; }
    @keyframes expandIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
    .nav-link { font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500; padding:7px 16px; border-radius:100px; cursor:pointer; border:none; background:none; transition:all 0.2s ease; color:#6b7280; }
    .nav-link:hover { color:#1a1a1a; background:#f5f0eb; }
    .nav-link.active { color:#1a1a1a; background:#f5f0eb; font-weight:600; }
    .concern-card { padding:22px; border-radius:20px; background:white; border:1.5px solid #f0ece8; cursor:pointer; transition:all 0.28s cubic-bezier(0.34,1.56,0.64,1); }
    .concern-card:hover { transform:translateY(-3px); box-shadow:0 14px 30px rgba(0,0,0,0.07); }
    .muscle-btn { padding:13px 18px; border-radius:14px; cursor:pointer; border:1.5px solid #f0ece8; background:white; transition:all 0.25s cubic-bezier(0.34,1.56,0.64,1); display:flex; align-items:center; gap:10px; font-family:'DM Sans',sans-serif; font-weight:600; font-size:14px; color:#1a1a1a; }
    .muscle-btn:hover { transform:translateY(-2px); box-shadow:0 10px 24px rgba(0,0,0,0.08); }
    .muscle-btn.active { border-color:#f97316; background:#fff7ed; color:#c2410c; }
    .product-card-inner { padding:18px; border-radius:16px; background:white; border:1.5px solid #f0ece8; transition:all 0.22s ease; }
    .product-card-inner:hover { border-color:#ddd5ce; box-shadow:0 8px 20px rgba(0,0,0,0.06); }
    .blog-card { padding:28px; border-radius:20px; background:white; border:1.5px solid #f0ece8; cursor:pointer; transition:all 0.25s ease; }
    .blog-card:hover { transform:translateY(-3px); box-shadow:0 14px 30px rgba(0,0,0,0.07); }
    .exercise-row { display:grid; grid-template-columns:1fr auto auto auto; gap:12px; align-items:start; padding:14px 16px; border-radius:12px; background:#fafaf9; border:1px solid #f0ece8; margin-bottom:8px; cursor:pointer; transition:background 0.18s; }
    .exercise-row:hover { background:#f5f3f0; }
    input { font-family:'DM Sans',sans-serif; font-size:14px; padding:12px 16px; border-radius:12px; border:1.5px solid #e5e0da; background:white; width:100%; outline:none; transition:border 0.2s; margin-bottom:12px; }
    input:focus { border-color:#f43f5e; box-shadow:0 0 0 3px rgba(244,63,94,0.08); }
    .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.35); backdrop-filter:blur(6px); z-index:1000; display:flex; align-items:center; justify-content:center; }
    .modal-box { background:#faf8f5; border-radius:24px; padding:40px; width:420px; max-width:90vw; box-shadow:0 32px 80px rgba(0,0,0,0.18); animation:fadeUp 0.3s ease both; }
    .label { font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#9ca3af; margin-bottom:10px; }
    .divider { height:1px; background:#f0ece8; margin:20px 0; }
    .routine-step { display:flex; align-items:center; gap:12px; padding:9px 14px; border-radius:10px; background:#fafaf9; border:1px solid #f0ece8; font-size:13px; font-weight:500; color:#374151; margin-bottom:6px; }
  `}</style>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SKINCARE_DATA = {
  acne: {
    id:"acne", label:"Acne & Breakouts", emoji:"🫧", color:"#f43f5e", bg:"#fef2f2",
    description:"Recurring pimples, cysts, blackheads caused by clogged pores, excess sebum, and bacteria.",
    causes:["Excess oil production","Hormonal fluctuations","C. acnes bacteria","Diet & stress triggers"],
    ingredients:["Salicylic Acid (BHA)","Benzoyl Peroxide","Adapalene / Tretinoin","Niacinamide"],
    products:{
      Cleansers:[
        {brand:"La Roche-Posay",name:"Effaclar Gel Cleanser",key:"Zinc Pirithione",benefit:"Controls oil without over-drying sensitized skin"},
        {brand:"CeraVe",name:"Salicylic Acid Cleanser",key:"Salicylic Acid 2%",benefit:"Unclogs pores and smooths skin texture daily"},
      ],
      Treatment:[
        {brand:"Differin",name:"Adapalene Gel 0.1%",key:"Adapalene (Retinoid)",benefit:"OTC retinoid that clears breakouts and prevents future ones"},
        {brand:"Rx Only",name:"Tretinoin 0.025–0.05%",key:"Tretinoin (Prescription)",benefit:"Gold-standard retinoid — see a dermatologist to prescribe"},
      ],
      Moisturizers:[
        {brand:"Neutrogena",name:"Hydro Boost Water Gel",key:"Hyaluronic Acid",benefit:"Lightweight, non-comedogenic hydration"},
        {brand:"Cetaphil",name:"Moisturizing Lotion",key:"Glycerin & Niacinamide",benefit:"Gentle barrier support for acne-prone skin"},
        {brand:"Vanicream",name:"Moisturizing Cream",key:"Fragrance & dye free",benefit:"Ideal for reactive acne skin — zero irritants"},
      ],
      Sunscreen:[
        {brand:"Fixderma",name:"Shadow SPF 50+",key:"Chemical filters",benefit:"Matte finish, safe for acne-prone skin"},
        {brand:"Eucerin",name:"Oil Control SPF 30",key:"Mattifying Silica",benefit:"Controls shine throughout the day"},
        {brand:"Neutrogena",name:"Ultra Sheer SPF 50",key:"Helioplex",benefit:"Featherlight texture, no white cast"},
      ],
    },
    routine:{
      AM:["Cleanser","Moisturizer","Sunscreen SPF 50"],
      PM:["Cleanser","Retinoid (2–3× per week)","Moisturizer"],
      tips:["Start retinoids 2–3× per week then slowly increase","Never mix retinoids with AHAs/BHAs initially","Always moisturize after retinoid to buffer irritation","Never skip SPF — UV exposure worsens post-acne marks"],
    },
  },
  hyperpigmentation:{
    id:"hyperpigmentation",label:"Hyperpigmentation",emoji:"🌑",color:"#d97706",bg:"#fffbeb",
    description:"Dark spots, uneven skin tone, post-acne marks (PIH), and melasma from excess melanin.",
    causes:["UV exposure (worsens all pigmentation)","Post-inflammatory response from acne","Hormones (melasma)","Skin trauma or picking"],
    ingredients:["Azelaic Acid","Tranexamic Acid","Glycolic Acid (AHA)","Vitamin C","Niacinamide"],
    products:{
      "Active Ingredients":[
        {brand:"The Ordinary",name:"Azelaic Acid Suspension 10%",key:"Azelaic Acid",benefit:"Reduces PIH, redness, and uneven tone gently"},
        {brand:"The Inkey List",name:"Tranexamic Acid Serum",key:"Tranexamic Acid 2%",benefit:"Targets stubborn melasma and deep dark spots"},
        {brand:"The Ordinary",name:"Glycolic Acid 7% Toner",key:"Glycolic Acid",benefit:"Exfoliates surface cells, evens texture and tone"},
      ],
      Sunscreen:[
        {brand:"Fixderma",name:"Shadow SPF 50+",key:"Broad Spectrum",benefit:"Prevents existing spots from darkening further"},
        {brand:"Neutrogena",name:"Ultra Sheer SPF 50",key:"UVA/UVB filters",benefit:"Lightweight daily shield non-negotiable for pigmentation"},
      ],
    },
    routine:{
      AM:["Cleanser","Vitamin C serum (optional)","Moisturizer","SPF 50 — non-negotiable"],
      PM:["Cleanser","Azelaic Acid or Tranexamic Acid","Moisturizer"],
      tips:["Sunscreen is your #1 treatment — actives alone won't work without it","Introduce acids one at a time, 3× per week to start","Fading takes 8–12 weeks minimum — be patient","Avoid picking at skin — it triggers more PIH"],
    },
  },
  dryness:{
    id:"dryness",label:"Dryness & Dehydration",emoji:"🌿",color:"#0d9488",bg:"#f0fdfa",
    description:"Tight, flaky, dull skin from a compromised barrier lacking water or lipids.",
    causes:["Damaged skin barrier","Over-cleansing or harsh products","Low humidity / cold weather","Hot showers and heavy exfoliation"],
    ingredients:["Hyaluronic Acid","Ceramides","Glycerin","Squalane","Petrolatum (occlusive)"],
    products:{
      "Hydrating Serums":[
        {brand:"The Ordinary",name:"Hyaluronic Acid 2% + B5",key:"Hyaluronic Acid",benefit:"Draws moisture deep into skin — apply on damp skin"},
        {brand:"Vichy",name:"Minéral 89 Booster",key:"HA + Minerals",benefit:"Strengthens and deeply hydrates in one step"},
      ],
      Moisturizers:[
        {brand:"Neutrogena",name:"Hydro Boost Water Gel",key:"Hyaluronic Acid",benefit:"Fast-absorbing gel for dehydrated combination skin"},
        {brand:"CeraVe",name:"Moisturizing Cream",key:"Ceramides 1,3,6-II",benefit:"Repairs and maintains skin barrier — dermatologist favourite"},
      ],
      "Night Occlusives":[
        {brand:"Vaseline",name:"Original Petroleum Jelly",key:"Petrolatum",benefit:"Ultimate moisture seal overnight — 'slugging' method"},
        {brand:"Aquaphor",name:"Healing Ointment",key:"Petrolatum + Panthenol",benefit:"Repairs very dry, cracked areas overnight"},
      ],
    },
    routine:{
      AM:["Gentle non-foaming cleanser","HA serum on damp skin","Ceramide moisturizer","SPF"],
      PM:["Gentle cleanser","HA serum","Rich ceramide moisturizer","Occlusive (slug 2–3× per week)"],
      tips:["Apply HA on damp skin — it needs water to draw in","Slug 2–3 nights per week to lock in hydration","Switch to a non-foaming cleanser immediately","Avoid hot showers — use lukewarm water"],
    },
  },
  antiaging:{
    id:"antiaging",label:"Anti-Aging",emoji:"✨",color:"#7c3aed",bg:"#faf5ff",
    description:"Fine lines, loss of firmness, uneven texture from collagen breakdown and UV damage over time.",
    causes:["UV damage — the #1 cause of premature aging","Collagen and elastin loss","Repetitive muscle movements","Oxidative stress and pollution"],
    ingredients:["Retinoids (Retinol/Tretinoin)","Vitamin C","Peptides","Niacinamide","Broad Spectrum SPF"],
    products:{
      Retinoids:[
        {brand:"Differin",name:"Adapalene 0.1% Gel",key:"Adapalene",benefit:"Boosts cell turnover and collagen — reduces fine lines"},
        {brand:"RoC",name:"Retinol Correxion Serum",key:"Retinol 0.5%",benefit:"Firms skin and smooths texture over 12 weeks"},
      ],
      "Vitamin C":[
        {brand:"Timeless",name:"Vitamin C + E + Ferulic",key:"L-Ascorbic Acid 20%",benefit:"Neutralises free radicals, firms, and brightens skin"},
      ],
      Sunscreen:[
        {brand:"Neutrogena",name:"Ultra Sheer SPF 50",key:"Broad Spectrum",benefit:"Prevents 80%+ of visible aging — most important step"},
      ],
    },
    routine:{
      AM:["Gentle cleanser","Vitamin C serum","Peptide moisturizer","SPF 50"],
      PM:["Cleanser","Retinoid (2× per week to start)","Moisturizer"],
      tips:["SPF is the best anti-aging product available — full stop","Vitamin C in the morning, retinoid at night — never mix","Retinoids take 3–6 months to see real collagen results","Consistency over 6–12 months is what transforms skin"],
    },
  },
  sensitivity:{
    id:"sensitivity",label:"Sensitivity & Redness",emoji:"🌸",color:"#db2777",bg:"#fdf2f8",
    description:"Reactive skin with visible redness, flushing, or rosacea — barrier is often impaired.",
    causes:["Rosacea (genetic)","Compromised skin barrier","Harsh or fragranced products","Temperature changes and spicy foods"],
    ingredients:["Centella Asiatica","Azelaic Acid (gentle)","Ceramides","Allantoin","Avoid fragrance & alcohol"],
    products:{
      Cleansers:[
        {brand:"La Roche-Posay",name:"Toleriane Hydrating Cleanser",key:"Prebiotic water",benefit:"Zero-irritant — specifically formulated for rosacea"},
        {brand:"Avène",name:"Extremely Gentle Cleanser",key:"Avène Thermal Water",benefit:"Calms reactivity and redness while cleansing"},
      ],
      Treatments:[
        {brand:"The Ordinary",name:"Azelaic Acid 10%",key:"Azelaic Acid",benefit:"Reduces redness, rosacea symptoms, and PIH gently"},
      ],
      Moisturizers:[
        {brand:"Vanicream",name:"Moisturizing Cream",key:"Fragrance-free",benefit:"Hypoallergenic — trusted for rosacea and eczema"},
        {brand:"La Roche-Posay",name:"Toleriane Double Repair",key:"Ceramides + Niacinamide",benefit:"Rebuilds barrier and visibly reduces redness"},
      ],
    },
    routine:{
      AM:["Gentle rinse or non-foaming cleanser","Centella calming serum","Fragrance-free moisturizer","Mineral SPF (zinc/titanium)"],
      PM:["Gentle cleanser","Azelaic acid (if tolerated)","Rich ceramide moisturizer"],
      tips:["Patch test everything before applying to full face","Mineral SPF is less irritating than chemical for rosacea","Avoid fragrance, alcohol, menthol, and witch hazel","Simplify your routine — fewer products = fewer triggers"],
    },
  },
  pores:{
    id:"pores",label:"Enlarged Pores",emoji:"🔬",color:"#0284c7",bg:"#f0f9ff",
    description:"Visibly enlarged pores — mostly on T-zone. Can appear significantly smaller with the right actives.",
    causes:["Excess sebum stretching pores","Genetics","Sun damage reducing elasticity","Clogged debris inside pores"],
    ingredients:["Salicylic Acid (BHA)","Niacinamide","Retinoids (long-term)","Clay (masks)"],
    products:{
      Exfoliants:[
        {brand:"Paula's Choice",name:"BHA 2% Skin Perfecting Liquid",key:"Salicylic Acid 2%",benefit:"Exfoliates inside the pore lining — best BHA available"},
        {brand:"CeraVe",name:"Salicylic Acid Cleanser",key:"Salicylic Acid",benefit:"Gentle daily option to prevent congestion"},
      ],
      Serums:[
        {brand:"The Ordinary",name:"Niacinamide 10% + Zinc 1%",key:"Niacinamide",benefit:"Regulates oil and visibly minimises pore appearance"},
      ],
      Sunscreen:[
        {brand:"Eucerin",name:"Oil Control SPF 30",key:"Mattifying Silica",benefit:"Absorbs excess oil that makes pores appear larger"},
      ],
    },
    routine:{
      AM:["Gentle cleanser","Niacinamide serum","Lightweight moisturizer","Mattifying SPF"],
      PM:["Oil cleanser then water cleanser (double cleanse)","BHA 3–4× per week","Moisturizer"],
      tips:["Never skip cleansing — congested pores look larger","Retinoids tighten pore appearance long-term via collagen","BHA is oil-soluble — it dissolves the debris inside pores","Mattifying SPF minimises midday shine and visible pores"],
    },
  },
};

const FITNESS_DATA = {
  glutes:{
    id:"glutes",label:"Glutes",icon:"🍑",color:"#f97316",bg:"#fff7ed",
    tip:"Hip thrusts are the #1 glute exercise. Squeeze hard at the top for 1 second every rep. Progressive overload weekly — your glutes respond to heavy loads.",
    exercises:[
      {name:"Barbell Hip Thrust",sets:"4",reps:"8–12",level:"Intermediate",desc:"Shoulder blades on bench, bar across hip crease. Drive hips up to full extension, squeeze glutes hard at top for 1s. Lower slowly."},
      {name:"Romanian Deadlift",sets:"3",reps:"10–12",level:"Intermediate",desc:"Hinge at hips, push them back. Bar close to legs. Feel deep hamstring stretch. Drive hips forward to stand. Don't round lower back."},
      {name:"Sumo Squat",sets:"4",reps:"12–15",level:"Beginner",desc:"Wide stance, toes 45° out. Sit deep between heels, knees track over toes. Drive through heels, squeeze glutes at top."},
      {name:"Cable Kickback",sets:"3",reps:"12–15 each",level:"Beginner",desc:"Ankle strap attached. Hinge slightly forward at hips. Kick straight back — not to the side. Control the return. Isolates glute max."},
      {name:"Single-Leg Hip Thrust",sets:"3",reps:"10 each",level:"Intermediate",desc:"One leg elevated, one foot on floor. Drive up through planted heel. Addresses imbalances between glutes."},
    ],
  },
  abs:{
    id:"abs",label:"Core & Abs",icon:"⚡",color:"#ca8a04",bg:"#fefce8",
    tip:"Visible abs = lower body fat + strong core. Train for function first: bracing, anti-rotation, stability. Crunches alone won't build the core you want.",
    exercises:[
      {name:"Dead Bug",sets:"3",reps:"8–10 each side",level:"Beginner",desc:"On back, arms up. Extend opposite arm and leg toward floor simultaneously. Press lower back into floor throughout. Slow and deliberate."},
      {name:"Pallof Press",sets:"3",reps:"10–12 each",level:"Intermediate",desc:"Cable at chest height, stand sideways. Press out and resist rotation. Anti-rotation movement — the most underrated core exercise."},
      {name:"Hanging Leg Raise",sets:"3",reps:"10–15",level:"Intermediate",desc:"Dead hang from pull-up bar. Raise legs straight to 90°. Control the descent — do not swing. Deeply targets lower abs."},
      {name:"Cable Crunch",sets:"3",reps:"12–15",level:"Beginner",desc:"Kneel at cable with rope. Crunch elbows to knees — you're rounding your spine, not pulling with arms. Focus on ab contraction."},
      {name:"Plank to Pike",sets:"3",reps:"10",level:"Intermediate",desc:"From high plank, pike hips up into inverted V. Return to plank. Challenges all core layers plus shoulders. Keep controlled."},
    ],
  },
  back:{
    id:"back",label:"Back",icon:"🏹",color:"#2563eb",bg:"#eff6ff",
    tip:"Think about pulling your elbows — not your hands — to activate lats. A strong back transforms posture and creates that coveted hourglass silhouette.",
    exercises:[
      {name:"Pull-Up / Assisted Pull-Up",sets:"4",reps:"5–10",level:"Intermediate",desc:"Dead hang, grip shoulder-width or wider. Pull elbows down toward ribs. Chin over bar. The best lat-building exercise available."},
      {name:"Seated Cable Row",sets:"3",reps:"10–12",level:"Beginner",desc:"Neutral grip. Row to navel, squeeze shoulder blades together at end. Take 3 seconds to return the weight — control matters."},
      {name:"Lat Pulldown",sets:"3",reps:"10–12",level:"Beginner",desc:"Wide grip. Pull bar to upper chest, slight lean back. Think elbows to hips — not hands to chest. Full lat stretch at top."},
      {name:"Face Pull",sets:"3",reps:"15–20",level:"Beginner",desc:"Rope at face height. Pull to face with elbows flared high and wide. Critical for rear deltoid health and fixing rounded shoulders."},
      {name:"Single-Arm DB Row",sets:"3",reps:"10–12 each",level:"Beginner",desc:"Brace on bench. Pull dumbbell to hip, elbow close to torso. Full range — stretch at bottom, complete contraction at top."},
    ],
  },
  arms:{
    id:"arms",label:"Arms",icon:"💪",color:"#db2777",bg:"#fdf2f8",
    tip:"Triceps make up 2/3 of arm mass — don't just train biceps. Train both on the same day for full arm development and the lean defined look.",
    exercises:[
      {name:"Barbell Curl",sets:"3",reps:"10–12",level:"Beginner",desc:"Elbows locked at sides. Curl fully, squeeze hard at top. Lower slowly — the eccentric phase builds more muscle than the lift."},
      {name:"Overhead Tricep Extension",sets:"3",reps:"10–12",level:"Beginner",desc:"Dumbbell or cable overhead, elbows close to head. Lower behind head, extend up. Hits the long head of triceps — most of the mass."},
      {name:"Hammer Curl",sets:"3",reps:"12–15",level:"Beginner",desc:"Neutral grip (palms facing each other). Builds brachialis and forearms, giving arms more thickness and definition."},
      {name:"Cable Tricep Pushdown",sets:"3",reps:"12–15",level:"Beginner",desc:"Rope or straight bar. Elbows pinned to sides — don't move them. Push to full extension, squeeze and hold 1 second."},
      {name:"Incline Dumbbell Curl",sets:"3",reps:"12",level:"Intermediate",desc:"Lying on incline bench, arms hang freely. Full stretch at bottom maximises bicep recruitment through the entire range."},
    ],
  },
  chest:{
    id:"chest",label:"Chest",icon:"🎯",color:"#7c3aed",bg:"#faf5ff",
    tip:"Incline pressing is especially important — it builds the upper chest which creates shape and improves posture significantly. Chest training also protects shoulder health.",
    exercises:[
      {name:"Incline Dumbbell Press",sets:"4",reps:"8–12",level:"Intermediate",desc:"30–45° incline. Press dumbbells up and slightly together at top. Targets upper chest and front delts. Best chest movement for overall shape."},
      {name:"Cable Fly",sets:"3",reps:"12–15",level:"Beginner",desc:"Cables at shoulder height, slight lean forward. Bring hands together in a wide hugging arc. Full chest stretch — feel it working."},
      {name:"Push-Up Variations",sets:"3",reps:"10–15",level:"Beginner",desc:"Standard, wide, or diamond hand position. Lower chest fully to floor. Push up explosively. Modify on knees until strength builds."},
      {name:"Flat DB Bench Press",sets:"3",reps:"10–12",level:"Intermediate",desc:"Flat bench. Press up with slight arc inward. Full stretch at bottom activates more muscle fibres than a partial range."},
      {name:"Chest Dip",sets:"3",reps:"8–12",level:"Intermediate",desc:"Lean forward to target chest over triceps. Lower until upper arms are parallel to floor. Powerful compound finisher."},
    ],
  },
  legs:{
    id:"legs",label:"Full Legs",icon:"🦵",color:"#0d9488",bg:"#f0fdfa",
    tip:"Leg training elevates metabolism for 24–48 hours post-session. Pair quad-dominant and hamstring-dominant exercises in the same workout for balanced development.",
    exercises:[
      {name:"Bulgarian Split Squat",sets:"4",reps:"8–10 each",level:"Intermediate",desc:"Rear foot elevated on bench. Lower back knee toward floor. Single-leg work reveals imbalances and builds exceptional size and balance."},
      {name:"Leg Press",sets:"4",reps:"12–15",level:"Beginner",desc:"Feet high on platform for glutes/hamstrings, low for quads. Full range of motion — don't lock knees at top of press."},
      {name:"Nordic Hamstring Curl",sets:"3",reps:"5–8",level:"Intermediate",desc:"Ankles held, lower your body toward floor using hamstrings only. Eccentric-dominant — the most effective hamstring builder known."},
      {name:"Walking Lunge",sets:"3",reps:"12–16 each",level:"Beginner",desc:"Long forward stride, lower back knee to just above floor. Drive through front foot to step forward. Add dumbbells to progress."},
      {name:"Leg Extension",sets:"3",reps:"15",level:"Beginner",desc:"Full extension at top, squeeze quads hard. Isolation movement — excellent quad finisher that machines do better than free weights."},
    ],
  },
};

const BLOG_POSTS = [
  {id:1,title:"How to Introduce Retinol Safely",date:"Feb 12, 2026",cat:"Skincare",preview:"Retinoids are one of the most evidence-backed skincare ingredients — but they come with a learning curve. Here's exactly how to start without the dreaded purge.",read:"5 min",body:"Start with adapalene OTC 0.1%, applied 2–3 nights per week. Always moisturize after applying. Expect mild peeling in weeks 2–4 — this is normal cell turnover, not an allergic reaction. After 4–6 weeks at 2–3x per week, move to every other night, then nightly over 3 months. Never layer with AHAs or BHAs at the same time initially. SPF is non-negotiable when using retinoids — UV degrades retinol and dramatically increases sensitivity. Give it 3 full months before assessing results. Most people give up at 6 weeks and miss the transformation."},
  {id:2,title:"Why Sunscreen Is Non-Negotiable",date:"Jan 28, 2026",cat:"Skincare",preview:"No serum, active, or routine step comes close to the protective and anti-aging impact of daily SPF. The science is unambiguous.",read:"4 min",body:"UV radiation is responsible for 80–90% of visible skin aging. It triggers hyperpigmentation, breaks down collagen and elastin, worsens acne scarring, and is the leading cause of skin cancer. Use SPF 30 minimum daily — SPF 50 is better. Apply as the final AM skincare step before makeup. Reapply every 2 hours if spending time outdoors. Chemical SPF formulas tend to feel lighter; mineral SPFs (zinc oxide, titanium dioxide) are gentler for sensitive and acne-prone skin. Your retinoids, vitamin C, and niacinamide all work harder when you protect them with sunscreen. Find a formula you love and wear it every single day."},
  {id:3,title:"Progressive Overload Explained",date:"Jan 15, 2026",cat:"Fitness",preview:"The single principle behind every physique transformation ever. If you're not progressively overloading, you're maintaining — not building.",read:"6 min",body:"Progressive overload means consistently increasing the demand placed on your muscles over time. This doesn't only mean adding weight — it also includes adding reps, reducing rest periods, slowing the eccentric phase, or improving range of motion. You don't need to add weight every session. Aiming for weekly progression is realistic and sustainable. Track your lifts in a notebook or app. If you hip thrusted 40kg for 3x10 last week, aim for 42.5kg or 3x11 this week. Your body is incredibly efficient — it adapts to the exact stress you give it and stops changing unless you increase that stress. Log everything. Progress everything. That's the whole game."},
  {id:4,title:"Building Your Skin Barrier",date:"Jan 5, 2026",cat:"Skincare",preview:"If your skin is constantly reactive, tight after cleansing, or stinging from products — your barrier is damaged. Here's how to repair it in 2–4 weeks.",read:"4 min",body:"A damaged barrier lets transepidermal water loss occur freely and allows irritants in. Signs: products sting, skin feels tight after cleansing, random redness, sensitivity to things that never bothered you before. To repair: strip your routine down to just cleanser + ceramide moisturizer + SPF for 2–4 weeks. No actives. Lukewarm water only — hot water strips lipids. Add an occlusive at night (Vaseline thin layer, or Aquaphor). Ceramides, cholesterol, and fatty acids are the lipids that form your barrier — look for all three in your moisturizer. CeraVe Moisturizing Cream and Vanicream are reliable choices. Once healed, reintroduce one active at a time with at least 2 weeks between each new addition."},
];

// ─── AUTH CONTEXT ─────────────────────────────────────────────────────────────
const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [routine, setRoutine] = useState({ AM: [], PM: [] });
  const [workoutPlan, setWorkoutPlan] = useState([]);

  useEffect(() => {
    try {
      const u = localStorage.getItem("gl_user");
      const r = localStorage.getItem("gl_routine");
      const w = localStorage.getItem("gl_workout");
      if (u) setUser(JSON.parse(u));
      if (r) setRoutine(JSON.parse(r));
      if (w) setWorkoutPlan(JSON.parse(w));
    } catch(e) {}
  }, []);

  const login = (name, email) => {
    const u = { name: name || email.split("@")[0], email };
    setUser(u);
    try { localStorage.setItem("gl_user", JSON.stringify(u)); } catch(e) {}
  };
  const logout = () => {
    setUser(null);
    try { localStorage.removeItem("gl_user"); } catch(e) {}
  };
  const addToRoutine = (product, time) => {
    setRoutine(prev => {
      const item = `${product.brand} ${product.name}`;
      if (prev[time].includes(item)) return prev;
      const updated = { ...prev, [time]: [...prev[time], item] };
      try { localStorage.setItem("gl_routine", JSON.stringify(updated)); } catch(e) {}
      return updated;
    });
  };
  const removeFromRoutine = (item, time) => {
    setRoutine(prev => {
      const updated = { ...prev, [time]: prev[time].filter(i => i !== item) };
      try { localStorage.setItem("gl_routine", JSON.stringify(updated)); } catch(e) {}
      return updated;
    });
  };
  const addToWorkout = (exercise, muscle) => {
    setWorkoutPlan(prev => {
      const item = `${muscle}: ${exercise}`;
      if (prev.includes(item)) return prev;
      const updated = [...prev, item];
      try { localStorage.setItem("gl_workout", JSON.stringify(updated)); } catch(e) {}
      return updated;
    });
  };
  const removeFromWorkout = (item) => {
    setWorkoutPlan(prev => {
      const updated = prev.filter(i => i !== item);
      try { localStorage.setItem("gl_workout", JSON.stringify(updated)); } catch(e) {}
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, routine, addToRoutine, removeFromRoutine, workoutPlan, addToWorkout, removeFromWorkout }}>
      {children}
    </AuthContext.Provider>
  );
}
const useAuth = () => useContext(AuthContext);

// ─── AUTH MODAL ───────────────────────────────────────────────────────────────
function AuthModal({ onClose }) {
  const { login } = useAuth();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const submit = () => {
    if (!email.includes("@")) return;
    login(name, email);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ fontSize:32, marginBottom:10 }}>🌷</div>
          <h2 className="serif" style={{ fontSize:26, color:"#1a1a1a" }}>
            {mode === "login" ? "Welcome back" : "Join glowlab"}
          </h2>
          <p style={{ fontSize:13, color:"#9ca3af", marginTop:6 }}>
            {mode === "login" ? "Sign in to access your saved routines" : "Create a free account to save your routines & workouts"}
          </p>
        </div>
        {mode === "signup" && (
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
        )}
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email" />
        <input value={pw} onChange={e => setPw(e.target.value)} placeholder="Password" type="password" style={{ marginBottom:24 }} />
        <button className="btn btn-rose" style={{ width:"100%", padding:"14px" }} onClick={submit}>
          {mode === "login" ? "Sign In" : "Create Account"}
        </button>
        <div className="divider" />
        <p style={{ textAlign:"center", fontSize:13, color:"#9ca3af" }}>
          {mode === "login" ? "New here? " : "Already have an account? "}
          <span style={{ color:"#f43f5e", cursor:"pointer", fontWeight:600 }}
            onClick={() => setMode(mode === "login" ? "signup" : "login")}>
            {mode === "login" ? "Create account" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <div className="fade-up">
      <div style={{ padding:"80px 0 64px", display:"grid", gridTemplateColumns:"1.15fr 0.85fr", gap:60, alignItems:"center" }}>
        <div>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fef2f2", borderRadius:100, padding:"5px 14px", marginBottom:26 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#f43f5e", display:"inline-block" }} />
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#be123c" }}>Health & Wellness Platform</span>
          </div>
          <h1 className="serif" style={{ fontSize:"clamp(2.4rem,5.5vw,3.8rem)", lineHeight:1.08, color:"#1a1a1a", letterSpacing:"-0.025em", marginBottom:22 }}>
            Your skin.<br/>
            Your <span className="italic" style={{ color:"#f43f5e" }}>strength.</span><br/>
            Your routine.
          </h1>
          <p style={{ fontSize:15, color:"#6b7280", lineHeight:1.75, maxWidth:420, marginBottom:34 }}>
            A calm, focused space to understand your skin concerns and build a training routine grounded in real science.
          </p>
          <div style={{ display:"flex", gap:12 }}>
            <button className="btn btn-dark" onClick={() => setPage("skincare")}>Explore Skincare ✦</button>
            <button className="btn btn-outline" onClick={() => setPage("fitness")}>Start Training ◈</button>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {[
            { bg:"linear-gradient(145deg,#fce7f3,#fdf5f7)", e:"🫧", t:"Clear Skin", s:"Acne & Congestion" },
            { bg:"linear-gradient(145deg,#fef9c3,#fffde7)", e:"☀️", t:"Sun Protection", s:"SPF Essentials" },
            { bg:"linear-gradient(145deg,#ccfbf1,#f0fdfa)", e:"🌿", t:"Hydration", s:"Barrier Care" },
            { bg:"linear-gradient(145deg,#fae8ff,#f3e8ff)", e:"💪", t:"Get Strong", s:"Guided Training" },
          ].map((c, i) => (
            <div key={i} style={{ background:c.bg, borderRadius:20, padding:"20px 16px", border:"1.5px solid rgba(0,0,0,0.04)", animation:`fadeUp 0.5s ${i*0.1}s both` }}>
              <div style={{ fontSize:26, marginBottom:8 }}>{c.e}</div>
              <div className="serif" style={{ fontSize:14, color:"#1a1a1a", marginBottom:2 }}>{c.t}</div>
              <div style={{ fontSize:11, color:"#b0a8a2" }}>{c.s}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", borderRadius:20, overflow:"hidden", border:"1px solid #f0ece8", marginBottom:64 }}>
        {[{n:"6",l:"Skin Concerns",c:"#fef2f2"},{n:"20+",l:"Products Curated",c:"#f0fdf4"},{n:"6",l:"Muscle Groups",c:"#fff7ed"},{n:"30+",l:"Exercises",c:"#faf5ff"}].map((s,i) => (
          <div key={i} style={{ background:s.c, padding:"28px 16px", textAlign:"center", borderRight:i<3?"1px solid #f0ece8":"none" }}>
            <div className="serif" style={{ fontSize:36, color:"#1a1a1a" }}>{s.n}</div>
            <div style={{ fontSize:11, color:"#9ca3af", fontWeight:500, marginTop:4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:72 }}>
        <div style={{ background:"linear-gradient(145deg,#fce7f3,#fdfafa)", borderRadius:24, padding:"34px 30px", cursor:"pointer", border:"1.5px solid #fce7f3" }} onClick={() => setPage("skincare")}>
          <div style={{ fontSize:34, marginBottom:14 }}>🌸</div>
          <h3 className="serif" style={{ fontSize:22, color:"#1a1a1a", marginBottom:8 }}>Skincare Library</h3>
          <p style={{ fontSize:13, color:"#9ca3af", lineHeight:1.65, marginBottom:18 }}>6 concerns with causes, ingredients, curated products, and full routine guides.</p>
          <span style={{ fontSize:13, color:"#f43f5e", fontWeight:600 }}>Explore →</span>
        </div>
        <div style={{ background:"linear-gradient(145deg,#fff7ed,#fffbf5)", borderRadius:24, padding:"34px 30px", cursor:"pointer", border:"1.5px solid #fed7aa" }} onClick={() => setPage("fitness")}>
          <div style={{ fontSize:34, marginBottom:14 }}>🏋️</div>
          <h3 className="serif" style={{ fontSize:22, color:"#1a1a1a", marginBottom:8 }}>Training Hub</h3>
          <p style={{ fontSize:13, color:"#9ca3af", lineHeight:1.65, marginBottom:18 }}>6 muscle groups, 30+ exercises with sets, reps, levels, and coaching cues.</p>
          <span style={{ fontSize:13, color:"#f97316", fontWeight:600 }}>Start Training →</span>
        </div>
      </div>
    </div>
  );
}

// ─── SKINCARE ─────────────────────────────────────────────────────────────────
function SkincarePage() {
  const { user, routine, addToRoutine, removeFromRoutine } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [activeConcern, setActiveConcern] = useState(null);
  const concern = activeConcern ? SKINCARE_DATA[activeConcern] : null;

  return (
    <div className="fade-up" style={{ paddingTop:52, paddingBottom:80 }}>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

      <div style={{ marginBottom:46 }}>
        <div className="label" style={{ marginBottom:12 }}>✦ Skincare</div>
        <h2 className="serif" style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", color:"#1a1a1a", lineHeight:1.15, letterSpacing:"-0.02em" }}>
          What does your skin<br/>
          <span className="italic" style={{ color:"#f43f5e" }}>need right now?</span>
        </h2>
        <p style={{ fontSize:14, color:"#9ca3af", marginTop:12, maxWidth:460, lineHeight:1.7 }}>
          Select a concern to get causes, hero ingredients, curated product picks, and your full AM/PM routine.
        </p>
      </div>

      {/* Concern grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:40 }}>
        {Object.values(SKINCARE_DATA).map(c => (
          <div key={c.id} className="concern-card"
            style={{ borderColor: activeConcern === c.id ? c.color : undefined, boxShadow: activeConcern === c.id ? `0 0 0 3px ${c.color}15` : undefined }}
            onClick={() => setActiveConcern(activeConcern === c.id ? null : c.id)}>
            <div style={{ width:48, height:48, borderRadius:14, background:c.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:12, border:`1.5px solid ${c.color}22` }}>
              {c.emoji}
            </div>
            <h3 className="serif" style={{ fontSize:16, color:"#1a1a1a", marginBottom:5 }}>{c.label}</h3>
            <p style={{ fontSize:12, color:"#9ca3af", lineHeight:1.5 }}>{c.description.split(".")[0]}.</p>
            {activeConcern === c.id && (
              <div style={{ marginTop:10, paddingTop:10, borderTop:`1px solid ${c.color}20` }}>
                <span style={{ fontSize:11, color:c.color, fontWeight:700 }}>✓ Viewing guide below</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {concern && (
        <div className="expand-body" key={concern.id}>
          {/* Banner */}
          <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:28, padding:"22px 26px", background:concern.bg, borderRadius:20, border:`1.5px solid ${concern.color}22` }}>
            <span style={{ fontSize:38 }}>{concern.emoji}</span>
            <div>
              <h3 className="serif" style={{ fontSize:24, color:"#1a1a1a" }}>{concern.label}</h3>
              <p style={{ fontSize:13, color:"#6b7280", marginTop:4, maxWidth:500 }}>{concern.description}</p>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:28 }}>
            <div style={{ padding:"20px 22px", background:"white", borderRadius:16, border:"1.5px solid #f0ece8" }}>
              <div className="label" style={{ marginBottom:12 }}>Common Causes</div>
              {concern.causes.map(c => (
                <div key={c} style={{ display:"flex", alignItems:"center", gap:9, marginBottom:7, fontSize:13, color:"#374151", fontWeight:500 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:concern.color, flexShrink:0 }} />{c}
                </div>
              ))}
            </div>
            <div style={{ padding:"20px 22px", background:"white", borderRadius:16, border:"1.5px solid #f0ece8" }}>
              <div className="label" style={{ marginBottom:12 }}>Hero Ingredients</div>
              {concern.ingredients.map(ing => (
                <span key={ing} className="tag" style={{ background:`${concern.color}14`, color:concern.color, marginRight:6, marginBottom:6, display:"inline-block" }}>{ing}</span>
              ))}
            </div>
          </div>

          {/* Products */}
          {Object.entries(concern.products).map(([cat, prods]) => (
            <div key={cat} style={{ marginBottom:26 }}>
              <div className="label" style={{ marginBottom:12 }}>{cat}</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))", gap:10 }}>
                {prods.map(p => (
                  <div key={p.name} className="product-card-inner">
                    <div style={{ fontSize:10, color:"#9ca3af", fontWeight:700, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:2 }}>{p.brand}</div>
                    <div style={{ fontSize:14, fontWeight:600, color:"#1a1a1a", marginBottom:6 }}>{p.name}</div>
                    <span className="tag" style={{ background:`${concern.color}12`, color:concern.color, fontSize:10, marginBottom:8, display:"inline-block" }}>{p.key}</span>
                    <p style={{ fontSize:12, color:"#6b7280", lineHeight:1.5, marginBottom:12 }}>{p.benefit}</p>
                    <div style={{ display:"flex", gap:7 }}>
                      <button className="btn btn-sm btn-outline" onClick={() => { if (!user) setShowAuth(true); else addToRoutine(p,"AM"); }}>+ AM</button>
                      <button className="btn btn-sm btn-outline" onClick={() => { if (!user) setShowAuth(true); else addToRoutine(p,"PM"); }}>+ PM</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Routine */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
            {["AM","PM"].map(t => (
              <div key={t} style={{ padding:"22px", background:"white", borderRadius:16, border:"1.5px solid #f0ece8" }}>
                <div className="label" style={{ marginBottom:12 }}>{t === "AM" ? "☀️ Morning Routine" : "🌙 Night Routine"}</div>
                {concern.routine[t].map((step, i) => (
                  <div key={i} className="routine-step">
                    <span style={{ width:22, height:22, borderRadius:"50%", background:"#f43f5e", color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, flexShrink:0 }}>{i+1}</span>
                    {step}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Tips */}
          <div style={{ padding:"20px 24px", background:`${concern.color}08`, borderRadius:16, border:`1.5px solid ${concern.color}20`, marginBottom:28 }}>
            <div className="label" style={{ marginBottom:12, color:concern.color }}>📌 Expert Tips</div>
            {concern.routine.tips.map((tip,i) => (
              <div key={i} style={{ display:"flex", gap:10, marginBottom:9, fontSize:13, color:"#374151", fontWeight:500 }}>
                <span style={{ color:concern.color, fontWeight:700, flexShrink:0 }}>0{i+1}</span>{tip}
              </div>
            ))}
          </div>

          {/* Saved routine */}
          {user && (routine.AM.length > 0 || routine.PM.length > 0) && (
            <div style={{ padding:"22px", background:"white", borderRadius:16, border:"1.5px solid #f0ece8" }}>
              <div className="label" style={{ marginBottom:14 }}>💾 Your Saved Routine</div>
              {["AM","PM"].map(t => routine[t].length > 0 && (
                <div key={t} style={{ marginBottom:14 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:"#9ca3af", marginBottom:7 }}>{t === "AM" ? "☀️ Morning" : "🌙 Night"}</div>
                  {routine[t].map(item => (
                    <div key={item} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 12px", background:"#fafaf9", borderRadius:8, marginBottom:4, fontSize:13 }}>
                      <span style={{ color:"#374151" }}>{item}</span>
                      <button style={{ background:"none", border:"none", cursor:"pointer", color:"#9ca3af", fontSize:18, lineHeight:1 }} onClick={() => removeFromRoutine(item,t)}>×</button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── FITNESS ──────────────────────────────────────────────────────────────────
function FitnessPage() {
  const { user, workoutPlan, addToWorkout, removeFromWorkout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [activeMuscle, setActiveMuscle] = useState(null);
  const [expandedEx, setExpandedEx] = useState(null);
  const muscle = activeMuscle ? FITNESS_DATA[activeMuscle] : null;

  return (
    <div className="fade-up" style={{ paddingTop:52, paddingBottom:80 }}>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

      <div style={{ marginBottom:46 }}>
        <div className="label" style={{ marginBottom:12 }}>◈ Fitness</div>
        <h2 className="serif" style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", color:"#1a1a1a", lineHeight:1.15, letterSpacing:"-0.02em" }}>
          Pick a muscle group<br/>
          <span className="italic" style={{ color:"#f97316" }}>& get to work.</span>
        </h2>
        <p style={{ fontSize:14, color:"#9ca3af", marginTop:12, maxWidth:460, lineHeight:1.7 }}>
          Each group includes exercises with sets, reps, level, coaching cues, and a pro tip. Log in to save to your weekly plan.
        </p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:36 }}>
        {Object.values(FITNESS_DATA).map(m => (
          <button key={m.id} className={`muscle-btn ${activeMuscle === m.id ? "active" : ""}`}
            onClick={() => { setActiveMuscle(activeMuscle === m.id ? null : m.id); setExpandedEx(null); }}>
            <span style={{ fontSize:20 }}>{m.icon}</span>
            {m.label}
            {activeMuscle === m.id && <span style={{ marginLeft:"auto", fontSize:10 }}>▲</span>}
          </button>
        ))}
      </div>

      {muscle && (
        <div className="expand-body" key={muscle.id}>
          <div style={{ padding:"18px 22px", background:`${muscle.color}10`, borderRadius:14, border:`1.5px solid ${muscle.color}22`, marginBottom:24, display:"flex", gap:14, alignItems:"flex-start" }}>
            <span style={{ fontSize:24, flexShrink:0 }}>{muscle.icon}</span>
            <div>
              <div className="label" style={{ color:muscle.color, marginBottom:5 }}>Coach Tip</div>
              <p style={{ fontSize:13, color:"#374151", lineHeight:1.65 }}>{muscle.tip}</p>
            </div>
          </div>

          <div className="label" style={{ marginBottom:12 }}>Exercises — {muscle.label}</div>
          {muscle.exercises.map((ex, i) => (
            <div key={ex.name} className="exercise-row" onClick={() => setExpandedEx(expandedEx === i ? null : i)}>
              <div>
                <div style={{ fontWeight:600, fontSize:14, color:"#1a1a1a" }}>{ex.name}</div>
                {expandedEx === i && (
                  <div style={{ fontSize:12, color:"#6b7280", marginTop:6, lineHeight:1.6, maxWidth:340 }}>{ex.desc}</div>
                )}
              </div>
              <span className="tag" style={{ background:"#f3f4f6", color:"#6b7280", whiteSpace:"nowrap" }}>{ex.sets} sets</span>
              <span className="tag" style={{ background:"#f3f4f6", color:"#6b7280", whiteSpace:"nowrap", fontSize:11 }}>{ex.reps} reps</span>
              <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                <span className="tag" style={{ background:ex.level==="Beginner"?"#ecfdf5":"#fef3c7", color:ex.level==="Beginner"?"#065f46":"#92400e", whiteSpace:"nowrap", fontSize:10 }}>
                  {ex.level}
                </span>
                <button className="btn btn-sm" style={{ background:muscle.color, color:"white", whiteSpace:"nowrap" }}
                  onClick={e => { e.stopPropagation(); if(!user) setShowAuth(true); else addToWorkout(ex.name, muscle.label); }}>
                  + Plan
                </button>
              </div>
            </div>
          ))}

          {user && workoutPlan.length > 0 && (
            <div style={{ marginTop:28, padding:"22px", background:"white", borderRadius:16, border:"1.5px solid #f0ece8" }}>
              <div className="label" style={{ marginBottom:12 }}>📋 Your Workout Plan</div>
              {workoutPlan.map(item => (
                <div key={item} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 12px", background:"#fafaf9", borderRadius:8, marginBottom:4, fontSize:13 }}>
                  <span style={{ color:"#374151", fontWeight:500 }}>{item}</span>
                  <button style={{ background:"none", border:"none", cursor:"pointer", color:"#9ca3af", fontSize:18, lineHeight:1 }} onClick={() => removeFromWorkout(item)}>×</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop:52, background:"linear-gradient(135deg,#1a1a1a,#2d2d2d)", borderRadius:24, padding:"42px 46px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <h3 className="serif" style={{ fontSize:24, color:"white", marginBottom:8 }}>
            Build your <span className="italic" style={{ color:"#fb923c" }}>weekly split.</span>
          </h3>
          <p style={{ fontSize:13, color:"#9ca3af", maxWidth:360 }}>
            Log in to save exercises across all muscle groups and build a structured training plan.
          </p>
        </div>
        <button className="btn" style={{ background:"#f97316", color:"white", whiteSpace:"nowrap", flexShrink:0 }}>
          Build My Plan →
        </button>
      </div>
    </div>
  );
}

// ─── BLOG ─────────────────────────────────────────────────────────────────────
function BlogPage() {
  const [active, setActive] = useState(null);
  const post = active !== null ? BLOG_POSTS[active] : null;

  return (
    <div className="fade-up" style={{ paddingTop:52, paddingBottom:80 }}>
      {post ? (
        <div style={{ maxWidth:680 }}>
          <button className="btn btn-outline btn-sm" style={{ marginBottom:30 }} onClick={() => setActive(null)}>← All Articles</button>
          <span className="tag" style={{ background:post.cat==="Skincare"?"#fce7f3":"#fff7ed", color:post.cat==="Skincare"?"#be123c":"#c2410c", marginBottom:16, display:"inline-block" }}>{post.cat}</span>
          <h2 className="serif" style={{ fontSize:"clamp(1.6rem,4vw,2.4rem)", color:"#1a1a1a", marginBottom:10, letterSpacing:"-0.02em" }}>{post.title}</h2>
          <div style={{ fontSize:12, color:"#9ca3af", marginBottom:32 }}>{post.date} · {post.read} read</div>
          <p style={{ fontSize:15, color:"#374151", lineHeight:1.85 }}>{post.body}</p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom:44 }}>
            <div className="label" style={{ marginBottom:12 }}>✦ Blog</div>
            <h2 className="serif" style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", color:"#1a1a1a", lineHeight:1.15, letterSpacing:"-0.02em" }}>
              Skin, science &<br/>
              <span className="italic" style={{ color:"#f43f5e" }}>strong bodies.</span>
            </h2>
            <p style={{ fontSize:14, color:"#9ca3af", marginTop:12, maxWidth:440, lineHeight:1.7 }}>
              Evidence-based reads on skincare ingredients, routines, and training principles.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            {BLOG_POSTS.map((p, i) => (
              <div key={p.id} className="blog-card" onClick={() => setActive(i)}>
                <span className="tag" style={{ background:p.cat==="Skincare"?"#fce7f3":"#fff7ed", color:p.cat==="Skincare"?"#be123c":"#c2410c", marginBottom:14, display:"inline-block" }}>{p.cat}</span>
                <h3 className="serif" style={{ fontSize:19, color:"#1a1a1a", marginBottom:8, lineHeight:1.25 }}>{p.title}</h3>
                <p style={{ fontSize:12, color:"#9ca3af", lineHeight:1.6, marginBottom:16 }}>{p.preview}</p>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:11, color:"#c4bdb8" }}>{p.date}</span>
                  <span style={{ fontSize:12, color:"#f43f5e", fontWeight:600 }}>Read · {p.read} →</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
function ProfilePage({ setPage }) {
  const { user, logout, routine, workoutPlan, removeFromRoutine, removeFromWorkout } = useAuth();

  if (!user) return (
    <div style={{ paddingTop:80, textAlign:"center" }}>
      <div style={{ fontSize:44, marginBottom:14 }}>🔒</div>
      <h2 className="serif" style={{ fontSize:24, color:"#1a1a1a", marginBottom:8 }}>Sign in to view your profile</h2>
      <p style={{ fontSize:14, color:"#9ca3af", marginBottom:26 }}>Save routines and track your workout plan.</p>
      <button className="btn btn-rose" onClick={() => setPage("home")}>← Back to Home</button>
    </div>
  );

  return (
    <div className="fade-up" style={{ paddingTop:52, paddingBottom:80 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:36 }}>
        <div>
          <div className="label" style={{ marginBottom:8 }}>Profile</div>
          <h2 className="serif" style={{ fontSize:26, color:"#1a1a1a" }}>Hey, {user.name} 🌷</h2>
          <p style={{ fontSize:13, color:"#9ca3af", marginTop:3 }}>{user.email}</p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={logout}>Sign Out</button>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
        <div style={{ padding:"24px", background:"white", borderRadius:20, border:"1.5px solid #f0ece8" }}>
          <div className="label" style={{ marginBottom:14 }}>🌸 Skincare Routine</div>
          {routine.AM.length === 0 && routine.PM.length === 0 ? (
            <div style={{ textAlign:"center", padding:"20px 0" }}>
              <div style={{ fontSize:28, marginBottom:10 }}>🫧</div>
              <p style={{ fontSize:13, color:"#9ca3af" }}>No products saved yet.</p>
              <button className="btn btn-outline btn-sm" style={{ marginTop:12 }} onClick={() => setPage("skincare")}>Browse Skincare</button>
            </div>
          ) : ["AM","PM"].map(t => routine[t].length > 0 && (
            <div key={t} style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#9ca3af", marginBottom:7 }}>{t==="AM"?"☀️ Morning":"🌙 Night"}</div>
              {routine[t].map(item => (
                <div key={item} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 12px", background:"#fafaf9", borderRadius:8, marginBottom:4, fontSize:13 }}>
                  <span style={{ color:"#374151" }}>{item}</span>
                  <button style={{ background:"none", border:"none", cursor:"pointer", color:"#9ca3af", fontSize:18, lineHeight:1 }} onClick={() => removeFromRoutine(item,t)}>×</button>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ padding:"24px", background:"white", borderRadius:20, border:"1.5px solid #f0ece8" }}>
          <div className="label" style={{ marginBottom:14 }}>💪 Workout Plan</div>
          {workoutPlan.length === 0 ? (
            <div style={{ textAlign:"center", padding:"20px 0" }}>
              <div style={{ fontSize:28, marginBottom:10 }}>🏋️</div>
              <p style={{ fontSize:13, color:"#9ca3af" }}>No exercises saved yet.</p>
              <button className="btn btn-outline btn-sm" style={{ marginTop:12 }} onClick={() => setPage("fitness")}>Browse Training</button>
            </div>
          ) : workoutPlan.map(item => (
            <div key={item} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 12px", background:"#fafaf9", borderRadius:8, marginBottom:4, fontSize:13 }}>
              <span style={{ color:"#374151", fontWeight:500 }}>{item}</span>
              <button style={{ background:"none", border:"none", cursor:"pointer", color:"#9ca3af", fontSize:18, lineHeight:1 }} onClick={() => removeFromWorkout(item)}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, onAuthClick }) {
  const { user } = useAuth();
  return (
    <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(250,248,245,0.92)", backdropFilter:"blur(14px)", borderBottom:"1px solid #f0ece8" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <button style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:8 }} onClick={() => setPage("home")}>
          <span style={{ fontSize:18 }}>🌷</span>
          <span className="serif" style={{ fontSize:18, color:"#1a1a1a", letterSpacing:"-0.02em" }}>
            glow<span className="italic" style={{ color:"#f43f5e" }}>lab</span>
          </span>
        </button>
        <div style={{ display:"flex", gap:4 }}>
          {[{id:"home",l:"Home"},{id:"skincare",l:"✦ Skincare"},{id:"fitness",l:"◈ Fitness"},{id:"blog",l:"Blog"}].map(link => (
            <button key={link.id} className={`nav-link ${page === link.id ? "active" : ""}`} onClick={() => setPage(link.id)}>{link.l}</button>
          ))}
        </div>
        <div>
          {user ? (
            <button className="nav-link active" onClick={() => setPage("profile")}>{user.name.split(" ")[0]} ✦</button>
          ) : (
            <button className="btn btn-dark btn-sm" onClick={onAuthClick}>Sign In</button>
          )}
        </div>
      </div>
    </nav>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [showAuth, setShowAuth] = useState(false);

  return (
    <AuthProvider>
      <GlobalStyles />
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      <Navbar page={page} setPage={setPage} onAuthClick={() => setShowAuth(true)} />
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px" }}>
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "skincare" && <SkincarePage />}
        {page === "fitness" && <FitnessPage />}
        {page === "blog" && <BlogPage />}
        {page === "profile" && <ProfilePage setPage={setPage} />}
      </div>
      <footer style={{ borderTop:"1px solid #f0ece8", padding:"22px", textAlign:"center", fontSize:12, color:"#d1d5db", fontFamily:"'DM Sans',sans-serif" }}>
        🌷 glowlab — built with passion for health & wellness
      </footer>
    </AuthProvider>
  );
}
