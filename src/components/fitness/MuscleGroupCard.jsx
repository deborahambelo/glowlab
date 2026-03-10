export function MuscleGroupCard({ group, isActive, onClick }) {
  return (
    <button
      className={`muscle-btn${isActive ? " active" : ""}`}
      onClick={onClick}
    >
      <span style={{ fontSize: 20 }}>{group.icon}</span>
      {group.label}
      {isActive && (
        <span style={{ marginLeft: "auto", fontSize: 10 }}>▲</span>
      )}
    </button>
  );
}

