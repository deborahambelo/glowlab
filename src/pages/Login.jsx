import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export function Login() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const submit = async () => {
    setError("");
    if (!email.includes("@") || !pw) return;
    try {
      if (mode === "login") {
        await signIn(email, pw);
      } else {
        await signUp(name, email, pw);
      }
      navigate(from, { replace: true });
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="fade-up"
      style={{
        minHeight: "calc(100vh - 120px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          background: "#faf8f5",
          borderRadius: 24,
          padding: 40,
          width: 420,
          maxWidth: "94vw",
          boxShadow: "0 24px 60px rgba(0,0,0,0.14)",
          border: "1px solid #f0ece8"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🌷</div>
          <h2
            className="serif"
            style={{ fontSize: 26, color: "#1a1a1a" }}
          >
            {mode === "login" ? "Welcome back" : "Join glowlab"}
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "#9ca3af",
              marginTop: 6
            }}
          >
            {mode === "login"
              ? "Sign in to access your saved routines"
              : "Create a free account to save your routines & workouts"}
          </p>
        </div>
        {mode === "signup" && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          type="email"
        />
        <input
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
          type="password"
          style={{ marginBottom: 24 }}
        />
        <button
          className="btn btn-rose"
          style={{ width: "100%", padding: "14px" }}
          onClick={submit}
        >
          {mode === "login" ? "Sign In" : "Create Account"}
        </button>
        {error && (
          <p
            style={{
              marginTop: 10,
              fontSize: 12,
              color: "#b91c1c"
            }}
          >
            {error}
          </p>
        )}
        <div className="divider" />
        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "#9ca3af"
          }}
        >
          {mode === "login" ? "New here? " : "Already have an account? "}
          <span
            style={{
              color: "#f43f5e",
              cursor: "pointer",
              fontWeight: 600
            }}
            onClick={() =>
              setMode(mode === "login" ? "signup" : "login")
            }
          >
            {mode === "login" ? "Create account" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
}

