// src/components/RequireAdmin.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function RequireAdmin({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (!u) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      try {
        const userRef = doc(db, "users", u.uid);
        const snap = await getDoc(userRef);
        const data = snap.exists() ? snap.data() : null;
        setIsAdmin(data?.isAdmin === true);
      } catch (err) {
        console.error("Error checking admin:", err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">Checking admin access...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RequireAdmin;
