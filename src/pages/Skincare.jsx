import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConcernCard } from "../components/skincare/ConcernCard.jsx";
import { useSkincareConcerns } from "../hooks/useFirestoreCollections.js";
import { mapSkincareDocsToConcerns } from "../utils/dataMapping.js";

const SKINCARE_COLORS = [
  { color: "#f43f5e", bg: "#fce7f3" },
  { color: "#6366f1", bg: "#e0e7ff" },
  { color: "#22c55e", bg: "#dcfce7" },
  { color: "#f97316", bg: "#ffedd5" }
];

const SKINCARE_EMOJIS = ["✨", "💧", "🌙", "🌞", "🌿", "🧪"];

export function Skincare() {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  const { items, loading } = useSkincareConcerns();

  const concerns = useMemo(() => {
    const obj = mapSkincareDocsToConcerns(items || []);
    // Preserve a stable render order: by label then id.
    return Object.values(obj).sort((a, b) => {
      const al = (a.label || "").toLowerCase();
      const bl = (b.label || "").toLowerCase();
      if (al < bl) return -1;
      if (al > bl) return 1;
      return String(a.id).localeCompare(String(b.id));
    });
  }, [items]);

  return (
    <div className="fade-up" style={{ paddingTop: 52, paddingBottom: 80 }}>
      <div style={{ marginBottom: 46 }}>
        <div className="label" style={{ marginBottom: 12 }}>
          ✦ Skincare
        </div>
        <h2
          className="serif"
          style={{
            fontSize: "clamp(1.8rem,4vw,2.8rem)",
            color: "#1a1a1a",
            lineHeight: 1.15,
            letterSpacing: "-0.02em"
          }}
        >
          What does your skin
          <br />
          <span className="italic" style={{ color: "#f43f5e" }}>
            need right now?
          </span>
        </h2>
        <p
          style={{
            fontSize: 14,
            color: "#9ca3af",
            marginTop: 12,
            maxWidth: 460,
            lineHeight: 1.7
          }}
        >
          Tap into a concern to open a full guide with causes, ingredients,
          curated products, and routine structure.
        </p>
      </div>

      {loading ? (
        <div style={{ fontSize: 13, color: "#9ca3af" }}>
          Loading skincare concerns...
        </div>
      ) : concerns.length === 0 ? (
        <div style={{ fontSize: 13, color: "#9ca3af" }}>
          No skincare concerns yet.
        </div>
      ) : (
        <div
          className="skincare-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 14,
            marginBottom: 40
          }}
        >
          {concerns.map((c, index) => {
            const palette = SKINCARE_COLORS[index % SKINCARE_COLORS.length];
            const emoji = SKINCARE_EMOJIS[index % SKINCARE_EMOJIS.length];

            const concern = {
              id: c.id,
              label: c.label || "Skincare Concern",
              description: c.description || "",
              color: c.color || palette.color,
              bg: c.bg || palette.bg,
              emoji: c.emoji || emoji,
              isActive: active === c.id
            };

            return (
              <ConcernCard
                key={c.id}
                concern={concern}
                onClick={() => {
                  setActive(c.id);
                  navigate(`/skincare/${c.id}`);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

