import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="fade-up">
      <div
        className="home-hero-grid"
        style={{
          padding: "80px 0 64px",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: 60,
          alignItems: "center"
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#fef2f2",
              borderRadius: 100,
              padding: "5px 14px",
              marginBottom: 26
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#f43f5e",
                display: "inline-block"
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#be123c"
              }}
            >
              Health & Wellness Platform
            </span>
          </div>
          <h1
            className="serif"
            style={{
              fontSize: "clamp(2.4rem,5.5vw,3.8rem)",
              lineHeight: 1.08,
              color: "#1a1a1a",
              letterSpacing: "-0.025em",
              marginBottom: 22
            }}
          >
            Your skin.
            <br />
            Your{" "}
            <span className="italic" style={{ color: "#f43f5e" }}>
              strength.
            </span>
            <br />
            Your routine.
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "#6b7280",
              lineHeight: 1.75,
              maxWidth: 420,
              marginBottom: 34
            }}
          >
            A calm, focused space to understand your skin concerns and build a
            training routine grounded in real science.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              className="btn btn-dark"
              onClick={() => navigate("/skincare")}
            >
              Explore Skincare ✦
            </button>
            <button
              className="btn btn-outline"
              onClick={() => navigate("/fitness")}
            >
              Start Training ◈
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12
          }}
        >
          {[
            {
              bg: "linear-gradient(145deg,#fce7f3,#fdf5f7)",
              e: "🫧",
              t: "Clear Skin",
              s: "Acne & Congestion"
            },
            {
              bg: "linear-gradient(145deg,#fef9c3,#fffde7)",
              e: "☀️",
              t: "Sun Protection",
              s: "SPF Essentials"
            },
            {
              bg: "linear-gradient(145deg,#ccfbf1,#f0fdfa)",
              e: "🌿",
              t: "Hydration",
              s: "Barrier Care"
            },
            {
              bg: "linear-gradient(145deg,#fae8ff,#f3e8ff)",
              e: "💪",
              t: "Get Strong",
              s: "Guided Training"
            }
          ].map((c, i) => (
            <div
              key={c.t}
              style={{
                background: c.bg,
                borderRadius: 20,
                padding: "20px 16px",
                border: "1.5px solid rgba(0,0,0,0.04)",
                animation: `fadeUp 0.5s ${i * 0.1}s both`
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 8 }}>{c.e}</div>
              <div
                className="serif"
                style={{ fontSize: 14, color: "#1a1a1a", marginBottom: 2 }}
              >
                {c.t}
              </div>
              <div style={{ fontSize: 11, color: "#b0a8a2" }}>{c.s}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="home-stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid #f0ece8",
          marginBottom: 64
        }}
      >
        {[
          { n: "3", l: "Core Skin Concerns", c: "#fef2f2" },
          { n: "20+", l: "Products Curated", c: "#f0fdf4" },
          { n: "6", l: "Muscle Groups", c: "#fff7ed" },
          { n: "30+", l: "Exercises", c: "#faf5ff" }
        ].map((s, i) => (
          <div
            key={s.l}
            style={{
              background: s.c,
              padding: "28px 16px",
              textAlign: "center",
              borderRight: i < 3 ? "1px solid #f0ece8" : "none"
            }}
          >
            <div
              className="serif"
              style={{ fontSize: 36, color: "#1a1a1a" }}
            >
              {s.n}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#9ca3af",
                fontWeight: 500,
                marginTop: 4
              }}
            >
              {s.l}
            </div>
          </div>
        ))}
      </div>

      <div
        className="home-cta-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          marginBottom: 72
        }}
      >
        <div
          style={{
            background: "linear-gradient(145deg,#fce7f3,#fdfafa)",
            borderRadius: 24,
            padding: "34px 30px",
            cursor: "pointer",
            border: "1.5px solid #fce7f3"
          }}
          onClick={() => navigate("/skincare")}
        >
          <div style={{ fontSize: 34, marginBottom: 14 }}>🌸</div>
          <h3
            className="serif"
            style={{ fontSize: 22, color: "#1a1a1a", marginBottom: 8 }}
          >
            Skincare Library
          </h3>
          <p
            style={{
              fontSize: 13,
              color: "#9ca3af",
              lineHeight: 1.65,
              marginBottom: 18
            }}
          >
            Acne, hyperpigmentation, and hydration guides with ingredients,
            curated products, and AM/PM routines.
          </p>
          <span
            style={{
              fontSize: 13,
              color: "#f43f5e",
              fontWeight: 600
            }}
          >
            Explore →
          </span>
        </div>
        <div
          style={{
            background: "linear-gradient(145deg,#fff7ed,#fffbf5)",
            borderRadius: 24,
            padding: "34px 30px",
            cursor: "pointer",
            border: "1.5px solid #fed7aa"
          }}
          onClick={() => navigate("/fitness")}
        >
          <div style={{ fontSize: 34, marginBottom: 14 }}>🏋️</div>
          <h3
            className="serif"
            style={{ fontSize: 22, color: "#1a1a1a", marginBottom: 8 }}
          >
            Training Hub
          </h3>
          <p
            style={{
              fontSize: 13,
              color: "#9ca3af",
              lineHeight: 1.65,
              marginBottom: 18
            }}
          >
            6 muscle groups, 30+ exercises with sets, reps, levels, and coaching
            cues.
          </p>
          <span
            style={{
              fontSize: 13,
              color: "#f97316",
              fontWeight: 600
            }}
          >
            Start Training →
          </span>
        </div>
      </div>
    </div>
  );
}

