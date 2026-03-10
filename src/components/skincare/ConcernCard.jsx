export function ConcernCard({ concern, onClick }) {
  const isActive = concern.isActive;

  return (
    <div
      className="concern-card"
      style={{
        borderColor: isActive ? concern.color : undefined,
        boxShadow: isActive ? `0 0 0 3px ${concern.color}15` : undefined
      }}
      onClick={onClick}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: concern.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          marginBottom: 12,
          border: `1.5px solid ${concern.color}22`
        }}
      >
        {concern.emoji}
      </div>
      <h3
        className="serif"
        style={{ fontSize: 16, color: "#1a1a1a", marginBottom: 5 }}
      >
        {concern.label}
      </h3>
      <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.5 }}>
        {concern.description.split(".")[0]}.
      </p>
      {isActive && (
        <div
          style={{
            marginTop: 10,
            paddingTop: 10,
            borderTop: `1px solid ${concern.color}20`
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: concern.color,
              fontWeight: 700
            }}
          >
            ✓ Viewing guide below
          </span>
        </div>
      )}
    </div>
  );
}

