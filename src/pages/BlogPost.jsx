import { useParams, useNavigate } from "react-router-dom";
import { useBlog } from "../hooks/useFirestoreCollections.js";
import { mapBlogDocToPost } from "../utils/dataMapping.js";

export function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { item, loading } = useBlog(id);
  const post = mapBlogDocToPost(item);

  if (loading) {
    return (
      <div style={{ paddingTop: 60 }}>
        <p style={{ fontSize: 14, color: "#9ca3af" }}>Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ paddingTop: 60 }}>
        <p style={{ fontSize: 14, color: "#9ca3af" }}>
          This article could not be found.
        </p>
      </div>
    );
  }

  return (
    <div className="fade-up" style={{ paddingTop: 52, paddingBottom: 80 }}>
      <button
        className="btn btn-outline btn-sm"
        style={{ marginBottom: 30 }}
        onClick={() => navigate("/blog")}
      >
        ← All Articles
      </button>
      <span
        className="tag"
        style={{
          background: post.cat === "Skincare" ? "#fce7f3" : "#fff7ed",
          color: post.cat === "Skincare" ? "#be123c" : "#c2410c",
          marginBottom: 16,
          display: "inline-block"
        }}
      >
        {post.cat}
      </span>
      <h2
        className="serif"
        style={{
          fontSize: "clamp(1.6rem,4vw,2.4rem)",
          color: "#1a1a1a",
          marginBottom: 10,
          letterSpacing: "-0.02em"
        }}
      >
        {post.title}
      </h2>
      <div
        style={{
          fontSize: 12,
          color: "#9ca3af",
          marginBottom: 32
        }}
      >
        {post.date} · {post.read} read
      </div>
      <p
        style={{
          fontSize: 15,
          color: "#374151",
          lineHeight: 1.85,
          maxWidth: 720
        }}
      >
        {post.body}
      </p>
    </div>
  );
}

