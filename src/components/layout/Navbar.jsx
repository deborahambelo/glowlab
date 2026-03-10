import { useAuth } from "../../context/AuthContext.jsx";
import { Link, NavLink } from "react-router-dom";

export function Navbar({ onAuthClick }) {
  const { user } = useAuth();

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(250,248,245,0.92)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid #f0ece8"
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Link
          to="/"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none"
          }}
        >
          <span style={{ fontSize: 18 }}>🌷</span>
          <span
            className="serif"
            style={{
              fontSize: 18,
              color: "#1a1a1a",
              letterSpacing: "-0.02em"
            }}
          >
            glow<span className="italic" style={{ color: "#f43f5e" }}>lab</span>
          </span>
        </Link>

        <div style={{ display: "flex", gap: 4 }}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/skincare"
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
          >
            ✦ Skincare
          </NavLink>
          <NavLink
            to="/fitness"
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
          >
            ◈ Fitness
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
          >
            Blog
          </NavLink>
        </div>

        <div>
          {user ? (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
            >
              {user.name.split(" ")[0]} ✦
            </NavLink>
          ) : (
            <button className="btn btn-dark btn-sm" onClick={onAuthClick}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

