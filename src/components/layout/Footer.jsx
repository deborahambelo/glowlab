export function Footer() {
  return (
    <footer
  style={{
    borderTop: "1px solid #f0ece8",
    padding: "22px",
    textAlign: "center",
    fontSize: 13,
    color: "#4b5563",
    fontFamily: "'DM Sans',sans-serif",
  }}
>
  © {new Date().getFullYear()} Glowlab. All rights reserved.
</footer>
  );
}
