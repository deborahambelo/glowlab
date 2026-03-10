import { useAuth } from "../context/AuthContext.jsx";

export function Dashboard() {
  const { user, logout, routine, workoutPlan, removeFromRoutine, removeFromWorkout } =
    useAuth();

  if (!user) {
    return (
      <div style={{ paddingTop: 80, textAlign: "center" }}>
        <div style={{ fontSize: 44, marginBottom: 14 }}>🔒</div>
        <h2
          className="serif"
          style={{ fontSize: 24, color: "#1a1a1a", marginBottom: 8 }}
        >
          Sign in to view your dashboard
        </h2>
        <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 10 }}>
          Save routines and track your workout plan.
        </p>
      </div>
    );
  }

  return (
    <div className="fade-up" style={{ paddingTop: 52, paddingBottom: 80 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 36
        }}
      >
        <div>
          <div className="label" style={{ marginBottom: 8 }}>
            Dashboard
          </div>
          <h2
            className="serif"
            style={{ fontSize: 26, color: "#1a1a1a" }}
          >
            Hey, {user.name} 🌷
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "#9ca3af",
              marginTop: 3
            }}
          >
            {user.email}
          </p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={logout}>
          Sign Out
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18
        }}
      >
        <div
          style={{
            padding: "24px",
            background: "white",
            borderRadius: 20,
            border: "1.5px solid #f0ece8"
          }}
        >
          <div className="label" style={{ marginBottom: 14 }}>
            🌸 Skincare Routine
          </div>
          {routine.AM.length === 0 && routine.PM.length === 0 ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>🫧</div>
              <p style={{ fontSize: 13, color: "#9ca3af" }}>
                No products saved yet.
              </p>
            </div>
          ) : (
            ["AM", "PM"].map(
              (t) =>
                routine[t].length > 0 && (
                  <div key={t} style={{ marginBottom: 14 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#9ca3af",
                        marginBottom: 7
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
                          fontSize: 13
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
                            lineHeight: 1
                          }}
                          onClick={() => removeFromRoutine(item, t)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )
            )
          )}
        </div>

        <div
          style={{
            padding: "24px",
            background: "white",
            borderRadius: 20,
            border: "1.5px solid #f0ece8"
          }}
        >
          <div className="label" style={{ marginBottom: 14 }}>
            💪 Workout Plan
          </div>
          {workoutPlan.length === 0 ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>🏋️</div>
              <p style={{ fontSize: 13, color: "#9ca3af" }}>
                No exercises saved yet.
              </p>
            </div>
          ) : (
            workoutPlan.map((item) => (
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
                  fontSize: 13
                }}
              >
                <span
                  style={{ color: "#374151", fontWeight: 500 }}
                >
                  {item}
                </span>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#9ca3af",
                    fontSize: 18,
                    lineHeight: 1
                  }}
                  onClick={() => removeFromWorkout(item)}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

