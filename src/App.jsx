import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar.jsx";
import { Footer } from "./components/layout/Footer.jsx";
import { AuthModal } from "./components/layout/AuthModal.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { Home } from "./pages/Home.jsx";
import { Skincare } from "./pages/Skincare.jsx";
import { ConcernDetail } from "./pages/ConcernDetail.jsx";
import { ProductDetail } from "./pages/ProductDetail.jsx";
import { Fitness } from "./pages/Fitness.jsx";
import { Blog } from "./pages/Blog.jsx";
import { BlogPost } from "./pages/BlogPost.jsx";
import { RoutineBuilder } from "./pages/RoutineBuilder.jsx";
import { Login } from "./pages/Login.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppShell() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      <Navbar onAuthClick={() => setShowAuth(true)} />
      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px"
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skincare" element={<Skincare />} />
          <Route path="/skincare/:id" element={<ConcernDetail />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/fitness" element={<Fitness />} />
          <Route path="/fitness/:muscleId" element={<Fitness />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route
            path="/routine-builder"
            element={
              <PrivateRoute>
                <RoutineBuilder />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}

