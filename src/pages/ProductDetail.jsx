import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { TrustBadgeRow } from "../components/common/TrustBadge.jsx";
import { AuthModal } from "../components/layout/AuthModal.jsx";
import { useMemo, useState } from "react";
import { useSkincareConcerns } from "../hooks/useFirestoreCollections.js";
import {
  buildAllProductsFromConcerns,
  mapSkincareDocsToConcerns,
} from "../utils/dataMapping.js";

export function ProductDetail() {
  const { id } = useParams();
  const { items, loading } = useSkincareConcerns();

  const { product, concern } = useMemo(() => {
    const concernsObj = mapSkincareDocsToConcerns(items || []);
    const all = buildAllProductsFromConcerns(concernsObj);
    const found = all.find((p) => p.id === id);
    const parent = found ? concernsObj[found.concernId] : null;
    return { product: found || null, concern: parent || null };
  }, [items, id]);

  const { user, addToRoutine } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  if (loading) {
    return (
      <div style={{ paddingTop: 60 }}>
        <p style={{ fontSize: 14, color: "#9ca3af" }}>
          Loading product...
        </p>
      </div>
    );
  }

  if (!product || !concern) {
    return (
      <div style={{ paddingTop: 60 }}>
        <p style={{ fontSize: 14, color: "#9ca3af" }}>
          This product could not be found.
        </p>
      </div>
    );
  }

  const handleAdd = (time) => {
    if (!user) {
      setShowAuth(true);
      return;
    }
    addToRoutine(product, time);
  };

  return (
    <div className="fade-up" style={{ paddingTop: 52, paddingBottom: 80 }}>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

      {/* Hero */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 32,
          marginBottom: 40
        }}
      >
        <div>
          <span
            className="tag"
            style={{
              background: concern.bg,
              color: concern.color,
              marginBottom: 10
            }}
          >
            {concern.label}
          </span>
          <h1
            className="serif"
            style={{
              fontSize: "clamp(1.9rem,3.1vw,2.4rem)",
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
              marginBottom: 6
            }}
          >
            {product.brand} {product.name}
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "#6b7280",
              marginBottom: 10
            }}
          >
            Best for:{" "}
            <span style={{ color: "#111827", fontWeight: 500 }}>
              Oily, acne‑prone skin
            </span>
          </p>
          <TrustBadgeRow />

          <p
            style={{
              fontSize: 14,
              color: "#4b5563",
              lineHeight: 1.7,
              marginTop: 18,
              maxWidth: 540
            }}
          >
            A calm, barrier‑respecting formula designed to work with your
            skin&apos;s natural rhythm. Paired with gentle cleansing and
            consistent SPF, it becomes a quiet powerhouse in your acne and
            hyperpigmentation routine.
          </p>

          <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
            <button
              className="btn btn-dark"
              onClick={() => handleAdd("AM")}
            >
              Add to AM Routine
            </button>
            <button
              className="btn btn-outline"
              onClick={() => handleAdd("PM")}
            >
              Add to PM Routine
            </button>
          </div>
        </div>

        <div
          style={{
            padding: 22,
            borderRadius: 18,
            background: "white",
            border: "1.5px solid #f0ece8",
            boxShadow: "0 18px 40px rgba(0,0,0,0.04)"
          }}
        >
          <div
            style={{
              borderRadius: 14,
              background: `linear-gradient(140deg,${concern.bg},#ffffff)`,
              padding: 18,
              marginBottom: 16
            }}
          >
            <div style={{ fontSize: 34, marginBottom: 8 }}>
              {concern.emoji}
            </div>
            <p
              style={{
                fontSize: 12,
                color: "#6b7280",
                lineHeight: 1.6
              }}
            >
              Designed to sit comfortably in routines focused on{" "}
              {concern.label.toLowerCase()} while respecting a fragile skin
              barrier.
            </p>
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#9ca3af",
              lineHeight: 1.6
            }}
          >
            Always patch test before full‑face use. If irritation persists,
            reduce frequency or stop and consult a professional.
          </div>
        </div>
      </section>

      {/* Why it works / Who should use */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          marginBottom: 36
        }}
      >
        <div
          style={{
            padding: "22px 24px",
            borderRadius: 18,
            background: "white",
            border: "1.5px solid #f0ece8"
          }}
        >
          <div className="label" style={{ marginBottom: 10 }}>
            Why it works
          </div>
          <ul
            style={{
              paddingLeft: 18,
              fontSize: 13,
              color: "#374151",
              lineHeight: 1.7
            }}
          >
            <li>
              Active focus:{" "}
              <strong>{product.key}</strong> targets the root mechanisms
              behind {concern.label.toLowerCase()}.
            </li>
            <li>
              Texture designed for everyday use so you can build consistency
              without overwhelming the skin barrier.
            </li>
            <li>
              Plays well with gentle, hydrating cleansers and non‑comedogenic
              moisturizers for a full, balanced routine.
            </li>
          </ul>
        </div>

        <div
          style={{
            padding: "22px 24px",
            borderRadius: 18,
            background: "white",
            border: "1.5px solid #f0ece8"
          }}
        >
          <div className="label" style={{ marginBottom: 10 }}>
            Who should use it
          </div>
          <p
            style={{
              fontSize: 13,
              color: "#374151",
              lineHeight: 1.7,
              marginBottom: 10
            }}
          >
            Best for:
          </p>
          <ul
            style={{
              paddingLeft: 18,
              fontSize: 13,
              color: "#374151",
              lineHeight: 1.7,
              marginBottom: 10
            }}
          >
            <li>Oily and acne‑prone skin</li>
            <li>Combination skin that congests easily</li>
            <li>Post‑acne marks and uneven tone</li>
          </ul>
          <p
            style={{
              fontSize: 12,
              color: "#9ca3af",
              lineHeight: 1.7
            }}
          >
            Avoid if you have a very compromised skin barrier, active eczema,
            or ongoing prescription treatments unless cleared by a
            dermatologist.
          </p>
        </div>
      </section>

      {/* How to use */}
      <section
        style={{
          padding: "22px 24px",
          borderRadius: 18,
          background: "white",
          border: "1.5px solid #f0ece8",
          marginBottom: 32
        }}
      >
        <div className="label" style={{ marginBottom: 10 }}>
          How to use
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18
          }}
        >
          <div>
            <h4
              className="serif"
              style={{ fontSize: 15, marginBottom: 8, color: "#111827" }}
            >
              Morning (AM)
            </h4>
            <ol
              style={{
                paddingLeft: 18,
                fontSize: 13,
                color: "#374151",
                lineHeight: 1.7
              }}
            >
              <li>Gentle cleanse — no stripping foaming cleansers.</li>
              <li>
                Apply a pea‑sized amount of{" "}
                <strong>{product.name}</strong> to full face, avoiding eye
                area.
              </li>
              <li>Layer a calm, barrier‑supportive moisturizer.</li>
              <li>Finish with broad‑spectrum SPF 50.</li>
            </ol>
          </div>
          <div>
            <h4
              className="serif"
              style={{ fontSize: 15, marginBottom: 8, color: "#111827" }}
            >
              Night (PM)
            </h4>
            <ol
              style={{
                paddingLeft: 18,
                fontSize: 13,
                color: "#374151",
                lineHeight: 1.7
              }}
            >
              <li>Cleanse thoroughly, remove makeup and SPF.</li>
              <li>
                Apply a thin layer of the product to dry skin, 2–3 nights
                per week to start.
              </li>
              <li>Follow with a richer moisturizer to buffer irritation.</li>
            </ol>
          </div>
        </div>
        <div
          style={{
            marginTop: 16,
            paddingTop: 12,
            borderTop: "1px solid #f3f4f6",
            fontSize: 12,
            color: "#b91c1c"
          }}
        >
          <strong>Do not mix with:</strong> other strong acids (AHA/BHA),
          benzoyl peroxide in the same routine, or multiple new actives at
          once. Introduce one active at a time.
        </div>
      </section>

      {/* Ingredient education + video */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 20,
          marginBottom: 40
        }}
      >
        <div
          style={{
            padding: "22px 24px",
            borderRadius: 18,
            background: "white",
            border: "1.5px solid #f0ece8"
          }}
        >
          <div className="label" style={{ marginBottom: 10 }}>
            Ingredient breakdown
          </div>
          <p
            style={{
              fontSize: 13,
              color: "#374151",
              lineHeight: 1.8,
              marginBottom: 12
            }}
          >
            <strong>What is {product.key}?</strong> It&apos;s a clinically
            studied active that helps normalise cell turnover, clear
            congestion inside the pore, and fade post‑inflammatory marks over
            time.
          </p>
          <p
            style={{
              fontSize: 13,
              color: "#374151",
              lineHeight: 1.8,
              marginBottom: 12
            }}
          >
            <strong>How long until results?</strong> Expect texture and
            breakout improvements around weeks 4–8, with pigmentation and
            scarring taking 8–12+ weeks of consistent use alongside daily
            SPF.
          </p>
          <p
            style={{
              fontSize: 13,
              color: "#374151",
              lineHeight: 1.8
            }}
          >
            <strong>Safe ranges.</strong> Most over‑the‑counter formulas are
            designed to sit in well‑studied concentration and pH windows so
            they&apos;re effective without overwhelming most skin types when
            used correctly.
          </p>
        </div>

        <div
          style={{
            padding: "22px 24px",
            borderRadius: 18,
            background: "white",
            border: "1.5px solid #f0ece8"
          }}
        >
          <div className="label" style={{ marginBottom: 10 }}>
            Dermatologist deep‑dive
          </div>
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              overflow: "hidden",
              borderRadius: 14,
              border: "1px solid #e5e7eb",
              background: "#f9fafb"
            }}
          >
            <iframe
              title="Dermatologist explainer"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none"
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p
            style={{
              fontSize: 12,
              color: "#9ca3af",
              marginTop: 8
            }}
          >
            Educational content only — always adapt advice to your own skin
            with professional guidance.
          </p>
        </div>
      </section>
    </div>
  );
}

