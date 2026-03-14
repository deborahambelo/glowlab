import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useBlogs } from "../hooks/useFirestoreCollections.js";
import { mapBlogDocToPost } from "../utils/dataMapping.js";

export function Blog() {
  const navigate = useNavigate();
  const { items, loading } = useBlogs();

  const posts = useMemo(() => {
    const mapped = (items || [])
      .map(mapBlogDocToPost)
      .filter(Boolean);

    // Keep behavior stable even if createdAt is missing.
    mapped.sort((a, b) => {
      const aCreated = items?.find((x) => x.id === a.id)?.createdAt;
      const bCreated = items?.find((x) => x.id === b.id)?.createdAt;
      const aMs =
        typeof aCreated === "number"
          ? aCreated
          : typeof aCreated === "string"
          ? Date.parse(aCreated)
          : aCreated?.toMillis
          ? aCreated.toMillis()
          : 0;
      const bMs =
        typeof bCreated === "number"
          ? bCreated
          : typeof bCreated === "string"
          ? Date.parse(bCreated)
          : bCreated?.toMillis
          ? bCreated.toMillis()
          : 0;
      return bMs - aMs;
    });

    return mapped;
  }, [items]);

  return (
    <div className="fade-up" style={{ paddingTop: 52, paddingBottom: 80 }}>
      <div style={{ marginBottom: 44 }}>
        <div className="label" style={{ marginBottom: 12 }}>
          ✦ Blog
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
          Skin, science &
          <br />
          <span className="italic" style={{ color: "#f43f5e" }}>
            strong bodies.
          </span>
        </h2>
        <p
          style={{
            fontSize: 14,
            color: "#9ca3af",
            marginTop: 12,
            maxWidth: 440,
            lineHeight: 1.7
          }}
        >
          Evidence-based reads on skincare ingredients, routines, and training
          principles.
        </p>
      </div>

      {loading ? (
        <div style={{ fontSize: 13, color: "#9ca3af" }}>Loading posts...</div>
      ) : posts.length === 0 ? (
        <div style={{ fontSize: 13, color: "#9ca3af" }}>No blog posts yet.</div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16
          }}
        >
          {posts.map((post) => (
            <div
              key={post.id}
              className="blog-card"
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              <span
                className="tag"
                style={{
                  background: post.cat === "Skincare" ? "#fce7f3" : "#fff7ed",
                  color: post.cat === "Skincare" ? "#be123c" : "#c2410c",
                  marginBottom: 14,
                  display: "inline-block"
                }}
              >
                {post.cat}
              </span>
              <h3
                className="serif"
                style={{
                  fontSize: 19,
                  color: "#1a1a1a",
                  marginBottom: 8,
                  lineHeight: 1.25
                }}
              >
                {post.title}
              </h3>
              <p
                style={{
                  fontSize: 12,
                  color: "#9ca3af",
                  lineHeight: 1.6,
                  marginBottom: 16
                }}
              >
                {post.preview}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <span style={{ fontSize: 11, color: "#c4bdb8" }}>
                  {post.date}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: "#f43f5e",
                    fontWeight: 600
                  }}
                >
                  Read · {post.read} →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

