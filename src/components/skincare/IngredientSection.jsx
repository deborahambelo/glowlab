export function IngredientSection({ concerns }) {
  return (
    <div
      style={{
        padding: "20px 22px",
        background: "white",
        borderRadius: 16,
        border: "1.5px solid #f0ece8"
      }}
    >
      <div className="label" style={{ marginBottom: 12 }}>
        Hero Ingredients
      </div>
      {concerns.map((ing) => (
        <span
          key={ing}
          className="tag"
          style={{
            background: "#fdf2f8",
            color: "#db2777",
            marginRight: 6,
            marginBottom: 6,
            display: "inline-block"
          }}
        >
          {ing}
        </span>
      ))}
    </div>
  );
}

