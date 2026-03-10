import { useAuth } from "../context/AuthContext.jsx";

export function RoutineBuilder() {
  const { user, routine, workoutPlan } = useAuth();

  if (!user) {
    return (
      <div style={{ paddingTop: 80, textAlign: "center" }}>
        <div style={{ fontSize: 44, marginBottom: 14 }}>🔒</div>
        <h2
          className="serif"
          style={{ fontSize: 24, color: "#1a1a1a", marginBottom: 8 }}
        >
          Sign in to build your routine
        </h2>
        <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 10 }}>
          Your skincare steps and training blocks will appear here once you
          start saving them.
        </p>
      </div>
    );
  }

  return (
    <div className="fade-up" style={{ paddingTop: 52, paddingBottom: 80 }}>
      <div style={{ marginBottom: 32 }}>
        <div className="label" style={{ marginBottom: 10 }}>
          Routine Builder
        </div>
        <h2
          className="serif"
          style={{ fontSize: 26, color: "#1a1a1a" }}
        >
          Your calm, repeatable routine.
        </h2>
        <p
          style={{
            fontSize: 13,
            color: "#9ca3af",
            marginTop: 6,
            maxWidth: 460,
            lineHeight: 1.6
          }}
        >
          Combine your saved skincare products and workout blocks into one
          weekly view you can actually follow.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 18
        }}
      >
        <div
          style={{
            padding: "22px 24px",
            background: "white",
            borderRadius: 18,
            border: "1.5px solid #f0ece8"
          }}
        >
          <div className="label" style={{ marginBottom: 12 }}>
            🌸 Daily Skincare Flow
          </div>
          {["AM", "PM"].map((t) => (
            <div key={t} style={{ marginBottom: 18 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#9ca3af",
                  marginBottom: 8
                }}
              >
                {t === "AM" ? "☀️ Morning" : "🌙 Night"}
              </div>
              {routine[t].length === 0 ? (
                <p
                  style={{
                    fontSize: 12,
                    color: "#d1d5db",
                    marginBottom: 4
                  }}
                >
                  No steps saved yet.
                </p>
              ) : (
                routine[t].map((item) => (
                  <div
                    key={item}
                    className="routine-step"
                    style={{ marginBottom: 6 }}
                  >
                    {item}
                  </div>
                ))
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            padding: "22px 24px",
            background: "white",
            borderRadius: 18,
            border: "1.5px solid #f0ece8"
          }}
        >
          <div className="label" style={{ marginBottom: 12 }}>
            💪 Weekly Training Blocks
          </div>
          {workoutPlan.length === 0 ? (
            <p
              style={{
                fontSize: 12,
                color: "#d1d5db",
                marginBottom: 4
              }}
            >
              No exercises saved yet.
            </p>
          ) : (
            workoutPlan.map((item) => (
              <div
                key={item}
                style={{
                  padding: "9px 14px",
                  borderRadius: 10,
                  background: "#fafaf9",
                  border: "1px solid #f0ece8",
                  fontSize: 13,
                  color: "#374151",
                  marginBottom: 6
                }}
              >
                {item}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

