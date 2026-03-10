import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SKINCARE_CONCERNS } from "../data/skincareData.js";
import { ConcernCard } from "../components/skincare/ConcernCard.jsx";

export function Skincare() {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  const activeConcern = active ? SKINCARE_CONCERNS[active] : null;

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

      <div
        className="skincare-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 14,
          marginBottom: 40
        }}
      >
        {Object.values(SKINCARE_CONCERNS).map((c) => (
          <ConcernCard
            key={c.id}
            concern={{ ...c, isActive: active === c.id }}
            onClick={() => {
              setActive(c.id);
              navigate(`/skincare/${c.id}`);
            }}
          />
        ))}
      </div>
    </div>
  );
}

