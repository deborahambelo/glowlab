export const FITNESS_GROUPS = {
  glutes: {
    id: "glutes",
    label: "Glutes",
    icon: "🍑",
    color: "#f97316",
    bg: "#fff7ed",
    tip: "Hip thrusts are the #1 glute exercise. Squeeze hard at the top for 1 second every rep. Progressive overload weekly — your glutes respond to heavy loads.",
    exercises: [
      {
        name: "Barbell Hip Thrust",
        sets: "4",
        reps: "8–12",
        level: "Intermediate",
        desc: "Shoulder blades on bench, bar across hip crease. Drive hips up to full extension, squeeze glutes hard at top for 1s. Lower slowly."
      },
      {
        name: "Romanian Deadlift",
        sets: "3",
        reps: "10–12",
        level: "Intermediate",
        desc: "Hinge at hips, push them back. Bar close to legs. Feel deep hamstring stretch. Drive hips forward to stand. Don't round lower back."
      },
      {
        name: "Sumo Squat",
        sets: "4",
        reps: "12–15",
        level: "Beginner",
        desc: "Wide stance, toes 45° out. Sit deep between heels, knees track over toes. Drive through heels, squeeze glutes at top."
      },
      {
        name: "Cable Kickback",
        sets: "3",
        reps: "12–15 each",
        level: "Beginner",
        desc: "Ankle strap attached. Hinge slightly forward at hips. Kick straight back — not to the side. Control the return. Isolates glute max."
      },
      {
        name: "Single-Leg Hip Thrust",
        sets: "3",
        reps: "10 each",
        level: "Intermediate",
        desc: "One leg elevated, one foot on floor. Drive up through planted heel. Addresses imbalances between glutes."
      }
    ]
  },
  abs: {
    id: "abs",
    label: "Core & Abs",
    icon: "⚡",
    color: "#ca8a04",
    bg: "#fefce8",
    tip: "Visible abs = lower body fat + strong core. Train for function first: bracing, anti-rotation, stability. Crunches alone won't build the core you want.",
    exercises: [
      {
        name: "Dead Bug",
        sets: "3",
        reps: "8–10 each side",
        level: "Beginner",
        desc: "On back, arms up. Extend opposite arm and leg toward floor simultaneously. Press lower back into floor throughout. Slow and deliberate."
      },
      {
        name: "Pallof Press",
        sets: "3",
        reps: "10–12 each",
        level: "Intermediate",
        desc: "Cable at chest height, stand sideways. Press out and resist rotation. Anti-rotation movement — the most underrated core exercise."
      },
      {
        name: "Hanging Leg Raise",
        sets: "3",
        reps: "10–15",
        level: "Intermediate",
        desc: "Dead hang from pull-up bar. Raise legs straight to 90°. Control the descent — do not swing. Deeply targets lower abs."
      },
      {
        name: "Cable Crunch",
        sets: "3",
        reps: "12–15",
        level: "Beginner",
        desc: "Kneel at cable with rope. Crunch elbows to knees — you're rounding your spine, not pulling with arms. Focus on ab contraction."
      },
      {
        name: "Plank to Pike",
        sets: "3",
        reps: "10",
        level: "Intermediate",
        desc: "From high plank, pike hips up into inverted V. Return to plank. Challenges all core layers plus shoulders. Keep controlled."
      }
    ]
  },
  back: {
    id: "back",
    label: "Back",
    icon: "🏹",
    color: "#2563eb",
    bg: "#eff6ff",
    tip: "Think about pulling your elbows — not your hands — to activate lats. A strong back transforms posture and creates that coveted hourglass silhouette.",
    exercises: [
      {
        name: "Pull-Up / Assisted Pull-Up",
        sets: "4",
        reps: "5–10",
        level: "Intermediate",
        desc: "Dead hang, grip shoulder-width or wider. Pull elbows down toward ribs. Chin over bar. The best lat-building exercise available."
      },
      {
        name: "Seated Cable Row",
        sets: "3",
        reps: "10–12",
        level: "Beginner",
        desc: "Neutral grip. Row to navel, squeeze shoulder blades together at end. Take 3 seconds to return the weight — control matters."
      },
      {
        name: "Lat Pulldown",
        sets: "3",
        reps: "10–12",
        level: "Beginner",
        desc: "Wide grip. Pull bar to upper chest, slight lean back. Think elbows to hips — not hands to chest. Full lat stretch at top."
      },
      {
        name: "Face Pull",
        sets: "3",
        reps: "15–20",
        level: "Beginner",
        desc: "Rope at face height. Pull to face with elbows flared high and wide. Critical for rear deltoid health and fixing rounded shoulders."
      },
      {
        name: "Single-Arm DB Row",
        sets: "3",
        reps: "10–12 each",
        level: "Beginner",
        desc: "Brace on bench. Pull dumbbell to hip, elbow close to torso. Full range — stretch at bottom, complete contraction at top."
      }
    ]
  },
  arms: {
    id: "arms",
    label: "Arms",
    icon: "💪",
    color: "#db2777",
    bg: "#fdf2f8",
    tip: "Triceps make up 2/3 of arm mass — don't just train biceps. Train both on the same day for full arm development and the lean defined look.",
    exercises: [
      {
        name: "Barbell Curl",
        sets: "3",
        reps: "10–12",
        level: "Beginner",
        desc: "Elbows locked at sides. Curl fully, squeeze hard at top. Lower slowly — the eccentric phase builds more muscle than the lift."
      },
      {
        name: "Overhead Tricep Extension",
        sets: "3",
        reps: "10–12",
        level: "Beginner",
        desc: "Dumbbell or cable overhead, elbows close to head. Lower behind head, extend up. Hits the long head of triceps — most of the mass."
      },
      {
        name: "Hammer Curl",
        sets: "3",
        reps: "12–15",
        level: "Beginner",
        desc: "Neutral grip (palms facing each other). Builds brachialis and forearms, giving arms more thickness and definition."
      },
      {
        name: "Cable Tricep Pushdown",
        sets: "3",
        reps: "12–15",
        level: "Beginner",
        desc: "Rope or straight bar. Elbows pinned to sides — don't move them. Push to full extension, squeeze and hold 1 second."
      },
      {
        name: "Incline Dumbbell Curl",
        sets: "3",
        reps: "12",
        level: "Intermediate",
        desc: "Lying on incline bench, arms hang freely. Full stretch at bottom maximises bicep recruitment through the entire range."
      }
    ]
  },
  chest: {
    id: "chest",
    label: "Chest",
    icon: "🎯",
    color: "#7c3aed",
    bg: "#faf5ff",
    tip: "Incline pressing is especially important — it builds the upper chest which creates shape and improves posture significantly. Chest training also protects shoulder health.",
    exercises: [
      {
        name: "Incline Dumbbell Press",
        sets: "4",
        reps: "8–12",
        level: "Intermediate",
        desc: "30–45° incline. Press dumbbells up and slightly together at top. Targets upper chest and front delts. Best chest movement for overall shape."
      },
      {
        name: "Cable Fly",
        sets: "3",
        reps: "12–15",
        level: "Beginner",
        desc: "Cables at shoulder height, slight lean forward. Bring hands together in a wide hugging arc. Full chest stretch — feel it working."
      },
      {
        name: "Push-Up Variations",
        sets: "3",
        reps: "10–15",
        level: "Beginner",
        desc: "Standard, wide, or diamond hand position. Lower chest fully to floor. Push up explosively. Modify on knees until strength builds."
      },
      {
        name: "Flat DB Bench Press",
        sets: "3",
        reps: "10–12",
        level: "Intermediate",
        desc: "Flat bench. Press up with slight arc inward. Full stretch at bottom activates more muscle fibres than a partial range."
      },
      {
        name: "Chest Dip",
        sets: "3",
        reps: "8–12",
        level: "Intermediate",
        desc: "Lean forward to target chest over triceps. Lower until upper arms are parallel to floor. Powerful compound finisher."
      }
    ]
  },
  legs: {
    id: "legs",
    label: "Full Legs",
    icon: "🦵",
    color: "#0d9488",
    bg: "#f0fdfa",
    tip: "Leg training elevates metabolism for 24–48 hours post-session. Pair quad-dominant and hamstring-dominant exercises in the same workout for balanced development.",
    exercises: [
      {
        name: "Bulgarian Split Squat",
        sets: "4",
        reps: "8–10 each",
        level: "Intermediate",
        desc: "Rear foot elevated on bench. Lower back knee toward floor. Single-leg work reveals imbalances and builds exceptional size and balance."
      },
      {
        name: "Leg Press",
        sets: "4",
        reps: "12–15",
        level: "Beginner",
        desc: "Feet high on platform for glutes/hamstrings, low for quads. Full range of motion — don't lock knees at top of press."
      },
      {
        name: "Nordic Hamstring Curl",
        sets: "3",
        reps: "5–8",
        level: "Intermediate",
        desc: "Ankles held, lower your body toward floor using hamstrings only. Eccentric-dominant — the most effective hamstring builder known."
      },
      {
        name: "Walking Lunge",
        sets: "3",
        reps: "12–16 each",
        level: "Beginner",
        desc: "Long forward stride, lower back knee to just above floor. Drive through front foot to step forward. Add dumbbells to progress."
      },
      {
        name: "Leg Extension",
        sets: "3",
        reps: "15",
        level: "Beginner",
        desc: "Full extension at top, squeeze quads hard. Isolation movement — excellent quad finisher that machines do better than free weights."
      }
    ]
  }
};

