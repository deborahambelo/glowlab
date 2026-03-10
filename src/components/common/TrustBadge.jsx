export function TrustBadgeRow() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
      <span
        className="tag"
        style={{ background: "#eff6ff", color: "#1d4ed8", fontSize: 11 }}
      >
        ⭐ Highly Rated
      </span>
      <span
        className="tag"
        style={{ background: "#ecfdf5", color: "#047857", fontSize: 11 }}
      >
        🧪 Clinically studied ingredients
      </span>
      <span
        className="tag"
        style={{ background: "#fdf2f8", color: "#be185d", fontSize: 11 }}
      >
        👩‍⚕️ Dermatologist‑recommended formula
      </span>
    </div>
  );
}

