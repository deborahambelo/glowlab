import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { Link, NavLink } from "react-router-dom";

export function Navbar({ onAuthClick }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav
      className={`main-nav${open ? " nav-mobile-open" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(250,248,245,0.92)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid #f0ece8"
      }}
    >
      <div
        className="main-nav-inner"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12
        }}
      >
        <Link
          to="/"
          onClick={closeMenu}
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

        <button
          className="nav-hamburger"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>

        <div className="main-nav-links" style={{ display: "flex", gap: 4 }}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/skincare"
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
            onClick={closeMenu}
          >
            ✦ Skincare
          </NavLink>
          <NavLink
            to="/fitness"
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
            onClick={closeMenu}
          >
            ◈ Fitness
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
            onClick={closeMenu}
          >
            Blog
          </NavLink>
        </div>

        <div className="main-nav-right">
          {user ? (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
              onClick={closeMenu}
            >
              {user.name.split(" ")[0]} ✦
            </NavLink>
          ) : (
            <button
              className="btn btn-dark btn-sm"
              onClick={() => {
                onAuthClick();
                closeMenu();
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

