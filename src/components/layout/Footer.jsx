export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #f0ece8",
        padding: "22px",
        textAlign: "center",
        fontSize: 13, // slightly bigger
        color: "#4b5563", // darker gray for better readability
        fontFamily: "'DM Sans',sans-serif",
        marginTop: 40,
      }}
    >
      🌷 glowlab — designed by{" "}
      <a
        href="https://deborah-portfolio.onrender.com/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#1f2937", // dark gray / almost black for the link
          textDecoration: "underline",
          fontWeight: 500,
        }}
      >
        Deborah Ketema
      </a>
    </footer>
  );
}
