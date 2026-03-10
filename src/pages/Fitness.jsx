import { useState } from "react";
import { useParams } from "react-router-dom";
import { FITNESS_GROUPS } from "../data/fitnessData.js";
import { useAuth } from "../context/AuthContext.jsx";
import { AuthModal } from "../components/layout/AuthModal.jsx";
import { MuscleGroupCard } from "../components/fitness/MuscleGroupCard.jsx";

export function Fitness() {
  const { muscleId } = useParams();
  const [localActive, setLocalActive] = useState(null);
  const [expandedEx, setExpandedEx] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const { user, workoutPlan, addToWorkout, removeFromWorkout } = useAuth();

  const activeId = muscleId || localActive;
  const activeGroup = activeId ? FITNESS_GROUPS[activeId] : null;

  return (
    <div className="fade-up" style={{ paddingTop: 52, paddingBottom: 80 }}>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

      <div style={{ marginBottom: 46 }}>
        <div className="label" style={{ marginBottom: 12 }}>
          ◈ Fitness
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
          Pick a muscle group
          <br />
          <span className="italic" style={{ color: "#f97316" }}>
            & get to work.
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
          Each page includes beginner and intermediate exercises, coaching
          cues, and space to save your weekly plan.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 10,
          marginBottom: 36
        }}
      >
        {Object.values(FITNESS_GROUPS).map((group) => (
          <MuscleGroupCard
            key={group.id}
            group={group}
            isActive={activeId === group.id}
            onClick={() => {
              setLocalActive(
                localActive === group.id && !muscleId ? null : group.id
              );
              setExpandedEx(null);
            }}
          />
        ))}
      </div>

      {activeGroup && (
        <div className="expand-body" key={activeGroup.id}>
          <div
            style={{
              padding: "18px 22px",
              background: `${activeGroup.color}10`,
              borderRadius: 14,
              border: `1.5px solid ${activeGroup.color}22`,
              marginBottom: 24,
              display: "flex",
              gap: 14,
              alignItems: "flex-start"
            }}
          >
            <span style={{ fontSize: 24, flexShrink: 0 }}>
              {activeGroup.icon}
            </span>
            <div>
              <div
                className="label"
                style={{ color: activeGroup.color, marginBottom: 5 }}
              >
                Coach Tip
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "#374151",
                  lineHeight: 1.65
                }}
              >
                {activeGroup.tip}
              </p>
            </div>
          </div>

          <div className="label" style={{ marginBottom: 12 }}>
            Exercises — {activeGroup.label}
          </div>
          {activeGroup.exercises.map((ex, i) => (
            <div
              key={ex.name}
              className="exercise-row"
              onClick={() =>
                setExpandedEx(expandedEx === i ? null : i)
              }
            >
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#1a1a1a"
                  }}
                >
                  {ex.name}
                </div>
                {expandedEx === i && (
                  <div
                    style={{
                      fontSize: 12,
                      color: "#6b7280",
                      marginTop: 6,
                      lineHeight: 1.6,
                      maxWidth: 340
                    }}
                  >
                    {ex.desc}
                  </div>
                )}
              </div>
              <span
                className="tag"
                style={{
                  background: "#f3f4f6",
                  color: "#6b7280",
                  whiteSpace: "nowrap"
                }}
              >
                {ex.sets} sets
              </span>
              <span
                className="tag"
                style={{
                  background: "#f3f4f6",
                  color: "#6b7280",
                  whiteSpace: "nowrap",
                  fontSize: 11
                }}
              >
                {ex.reps} reps
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7
                }}
              >
                <span
                  className="tag"
                  style={{
                    background:
                      ex.level === "Beginner" ? "#ecfdf5" : "#fef3c7",
                    color:
                      ex.level === "Beginner" ? "#065f46" : "#92400e",
                    whiteSpace: "nowrap",
                    fontSize: 10
                  }}
                >
                  {ex.level}
                </span>
                <button
                  className="btn btn-sm"
                  style={{
                    background: activeGroup.color,
                    color: "white",
                    whiteSpace: "nowrap"
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!user) setShowAuth(true);
                    else addToWorkout(ex.name, activeGroup.label);
                  }}
                >
                  + Plan
                </button>
              </div>
            </div>
          ))}

          {user && workoutPlan.length > 0 && (
            <div
              style={{
                marginTop: 28,
                padding: "22px",
                background: "white",
                borderRadius: 16,
                border: "1.5px solid #f0ece8"
              }}
            >
              <div className="label" style={{ marginBottom: 12 }}>
                📋 Your Workout Plan
              </div>
              {workoutPlan.map((item) => (
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
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

