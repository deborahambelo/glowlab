// Helpers to map Firestore documents into the exact shapes
// your existing UI was built around: BLOG_POSTS, FITNESS_GROUPS,
// SKINCARE_CONCERNS, and ALL_PRODUCTS.

// ----- Blog mapping -----

export function mapBlogDocToPost(doc) {
  if (!doc) return null;

  const {
    title = "",
    date,
    cat = "Skincare",
    preview,
    read,
    body,
    content,
    createdAt,
  } = doc;

  // Fallbacks to keep older / partial data rendering gracefully.
  const finalBody = body || content || "";

  const formattedDate =
    typeof date === "string"
      ? date
      : createdAt
      ? toDisplayDate(createdAt)
      : "";

  const previewText =
    typeof preview === "string" && preview.length
      ? preview
      : finalBody
      ? truncate(finalBody, 160)
      : "";

  const readTime =
    typeof read === "string" && read.length
      ? read
      : estimateReadTime(finalBody);

  return {
    id: doc.id,
    title,
    date: formattedDate,
    cat,
    preview: previewText,
    read: readTime,
    body: finalBody,
  };
}

// ----- Fitness mapping -----

export function mapFitnessDocsToGroups(docs) {
  // Input: array of firestore docs for fitnessGroups.
  // Output: FITNESS_GROUPS-style object keyed by id.
  const groups = {};
  (docs || []).forEach((doc) => {
    if (!doc || !doc.id) return;
    const {
      label = "",
      icon = "💪",
      color = "#f97316",
      bg = "#fff7ed",
      tip = "",
      exercises = [],
    } = doc;

    groups[doc.id] = {
      id: doc.id,
      label,
      icon,
      color,
      bg,
      tip,
      exercises: (exercises || []).map((ex) => ({
        name: ex?.name || "",
        sets: ex?.sets || "",
        reps: ex?.reps || "",
        level: ex?.level || "",
        desc: ex?.desc || "",
      })),
    };
  });
  return groups;
}

// ----- Skincare mapping -----

export function mapSkincareDocsToConcerns(docs) {
  // Input: array of firestore docs for skincareConcerns.
  // Output: SKINCARE_CONCERNS-style object keyed by id.
  const concerns = {};

  (docs || []).forEach((doc) => {
    if (!doc || !doc.id) return;

    const {
      label = "",
      emoji = "🌸",
      color = "#f43f5e",
      bg = "#fef2f2",
      description = "",
      causes = [],
      ingredients = [],
      products = {},
      routine = {},
    } = doc;

    const safeProducts = {};
    Object.entries(products || {}).forEach(([categoryName, items]) => {
      safeProducts[categoryName] = (items || []).map((item, index) => ({
        id: item?.id || `${doc.id}-${categoryName}-${index}`,
        brand: item?.brand || "",
        name: item?.name || "",
        key: item?.key || "",
        benefit: item?.benefit || "",
      }));
    });

    concerns[doc.id] = {
      id: doc.id,
      label,
      emoji,
      color,
      bg,
      description,
      causes: Array.isArray(causes) ? causes : [],
      ingredients: Array.isArray(ingredients) ? ingredients : [],
      products: safeProducts,
      routine: {
        AM: Array.isArray(routine.AM) ? routine.AM : [],
        PM: Array.isArray(routine.PM) ? routine.PM : [],
        tips: Array.isArray(routine.tips) ? routine.tips : [],
      },
    };
  });

  return concerns;
}

// Flatten skincare concerns into ALL_PRODUCTS-style list.
export function buildAllProductsFromConcerns(concernsObject) {
  if (!concernsObject) return [];

  return Object.values(concernsObject).flatMap((concern) =>
    Object.entries(concern.products || {}).flatMap(([category, items]) =>
      (items || []).map((item) => ({
        ...item,
        concernId: concern.id,
        concernLabel: concern.label,
        category,
      }))
    )
  );
}

// ----- Internal helpers -----

function truncate(text, maxLength) {
  const str = String(text);
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}…`;
}

function estimateReadTime(text) {
  if (!text) return "1 min";
  const words = String(text).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

function toDisplayDate(value) {
  try {
    if (!value) return "";
    if (typeof value === "string" || typeof value === "number") {
      return new Date(value).toLocaleDateString();
    }
    if (value.toDate) {
      return value.toDate().toLocaleDateString();
    }
    return "";
  } catch {
    return "";
  }
}

