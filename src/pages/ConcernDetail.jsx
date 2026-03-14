import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { ProductCard } from "../components/skincare/ProductCard.jsx";
import { AuthModal } from "../components/layout/AuthModal.jsx";
import { useSkincareConcern } from "../hooks/useFirestoreCollections.js";
import { mapSkincareDocsToConcerns } from "../utils/dataMapping.js";

export function ConcernDetail() {
  const { id } = useParams();
  const { item, loading } = useSkincareConcern(id);
  const concern = item ? mapSkincareDocsToConcerns([item])[id] : null;
  const { user, routine, addToRoutine, removeFromRoutine } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  if (loading) {
    return (
      <div style={{ paddingTop: 60 }}>
        <p style={{ fontSize: 14, color: "#9ca3af" }}>Loading concern...</p>
      </div>
    );
  }

  if (!concern) {
    return (
      <div style={{ paddingTop: 60 }}>
        <p style={{ fontSize: 14, color: "#9ca3af" }}>
          This concern could not be found.
        </p>
      </div>
    );
  }

  return (
    <div className="fade-up" style={{ paddingTop: 72, paddingBottom: 80 }}>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 28,
          padding: "22px 26px",
          background: concern.bg,
          borderRadius: 20,
          border: `1.5px solid ${concern.color}22`,
        }}
      >
        <span style={{ fontSize: 38 }}>{concern.emoji}</span>
        <div>
          <h3 className="serif" style={{ fontSize: 24, color: "#1a1a1a" }}>
            {concern.label}
          </h3>
          <p
            style={{
              fontSize: 13,
              color: "#6b7280",
              marginTop: 4,
              maxWidth: 500,
            }}
          >
            {concern.description}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            padding: "20px 22px",
            background: "white",
            borderRadius: 16,
            border: "1.5px solid #f0ece8",
          }}
        >
          <div className="label" style={{ marginBottom: 12 }}>
            Common Causes
          </div>
          {concern.causes.map((c) => (
            <div
              key={c}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                marginBottom: 7,
                fontSize: 13,
                color: "#374151",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: concern.color,
                  flexShrink: 0,
                }}
              />
              {c}
            </div>
          ))}
        </div>
        <div
          style={{
            padding: "20px 22px",
            background: "white",
            borderRadius: 16,
            border: "1.5px solid #f0ece8",
          }}
        >
          <div className="label" style={{ marginBottom: 12 }}>
            Hero Ingredients
          </div>
          {concern.ingredients.map((ing) => (
            <span
              key={ing}
              className="tag"
              style={{
                background: `${concern.color}14`,
                color: concern.color,
                marginRight: 6,
                marginBottom: 6,
                display: "inline-block",
              }}
            >
              {ing}
            </span>
          ))}
        </div>
      </div>

      {Object.entries(concern.products).map(([cat, prods]) => (
        <div key={cat} style={{ marginBottom: 26 }}>
          <div className="label" style={{ marginBottom: 12 }}>
            {cat}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
              gap: 10,
            }}
          >
            {prods.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                accentColor={concern.color}
                onAddAM={() => {
                  if (!user) setShowAuth(true);
                  else addToRoutine(p, "AM");
                }}
                onAddPM={() => {
                  if (!user) setShowAuth(true);
                  else addToRoutine(p, "PM");
                }}
              />
            ))}
          </div>
        </div>
      ))}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {["AM", "PM"].map((t) => (
          <div
            key={t}
            style={{
              padding: "22px",
              background: "white",
              borderRadius: 16,
              border: "1.5px solid #f0ece8",
            }}
          >
            <div className="label" style={{ marginBottom: 12 }}>
              {t === "AM" ? "☀️ Morning Routine" : "🌙 Night Routine"}
            </div>
            {concern.routine[t].map((step, i) => (
              <div key={step} className="routine-step">
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#f43f5e",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                {step}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div
        style={{
          padding: "20px 24px",
          background: `${concern.color}08`,
          borderRadius: 16,
          border: `1.5px solid ${concern.color}20`,
          marginBottom: 28,
        }}
      >
        <div
          className="label"
          style={{ marginBottom: 12, color: concern.color }}
        >
          📌 Expert Tips
        </div>
        {concern.routine.tips.map((tip, i) => (
          <div
            key={tip}
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 9,
              fontSize: 13,
              color: "#374151",
              fontWeight: 500,
            }}
          >
            <span
              style={{ color: concern.color, fontWeight: 700, flexShrink: 0 }}
            >
              0{i + 1}
            </span>
            {tip}
          </div>
        ))}
      </div>

      {user && (routine.AM.length > 0 || routine.PM.length > 0) && (
        <div
          style={{
            padding: "22px",
            background: "white",
            borderRadius: 16,
            border: "1.5px solid #f0ece8",
          }}
        >
          <div className="label" style={{ marginBottom: 14 }}>
            💾 Your Saved Routine
          </div>
          {["AM", "PM"].map(
            (t) =>
              routine[t].length > 0 && (
                <div key={t} style={{ marginBottom: 14 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#9ca3af",
                      marginBottom: 7,
                    }}
                  >
                    {t === "AM" ? "☀️ Morning" : "🌙 Night"}
                  </div>
                  {routine[t].map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 12px",
                        background: "#fafaf9",
                        borderRadius: 8,
                        marginBottom: 4,
                        fontSize: 13,
                      }}
                    >
                      <span style={{ color: "#374151" }}>{item}</span>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#9ca3af",
                          fontSize: 18,
                          lineHeight: 1,
                        }}
                        onClick={() => removeFromRoutine(item, t)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}
