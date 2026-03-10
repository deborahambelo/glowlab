import { useNavigate } from "react-router-dom";

export function ProductCard({ product, accentColor, onAddAM, onAddPM }) {
  const navigate = useNavigate();

  return (
    <div className="product-card-inner">
      <div
        style={{
          fontSize: 10,
          color: "#9ca3af",
          fontWeight: 700,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          marginBottom: 2
        }}
      >
        {product.brand}
      </div>
      <button
        onClick={() => navigate(`/product/${product.id}`)}
        style={{
          all: "unset",
          cursor: "pointer",
          display: "block",
          marginBottom: 6
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#1a1a1a"
          }}
        >
          {product.name}
        </div>
      </button>
      <span
        className="tag"
        style={{
          background: `${accentColor}12`,
          color: accentColor,
          fontSize: 10,
          marginBottom: 8,
          display: "inline-block"
        }}
      >
        {product.key}
      </span>
      <p
        style={{
          fontSize: 12,
          color: "#6b7280",
          lineHeight: 1.5,
          marginBottom: 12
        }}
      >
        {product.benefit}
      </p>
      <div style={{ display: "flex", gap: 7 }}>
        <button
          className="btn btn-sm btn-outline"
          onClick={onAddAM}
        >
          + AM
        </button>
        <button
          className="btn btn-sm btn-outline"
          onClick={onAddPM}
        >
          + PM
        </button>
      </div>
    </div>
  );
}

