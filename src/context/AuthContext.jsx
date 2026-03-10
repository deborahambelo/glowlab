import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase.js";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [routine, setRoutine] = useState({ AM: [], PM: [] });
  const [workoutPlan, setWorkoutPlan] = useState([]);

  useEffect(() => {
    try {
      const r = localStorage.getItem("gl_routine");
      const w = localStorage.getItem("gl_workout");
      if (r) setRoutine(JSON.parse(r));
      if (w) setWorkoutPlan(JSON.parse(w));
    } catch (e) {
      // ignore
    }
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setUser({
          uid: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split("@")[0] || "GlowLab user",
          email: fbUser.email
        });
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  const signUp = async (name, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name && cred.user) {
      await updateProfile(cred.user, { displayName: name });
    }
  };

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const addToRoutine = (product, time) => {
    setRoutine((prev) => {
      const item = `${product.brand} ${product.name}`;
      if (prev[time].includes(item)) return prev;
      const updated = { ...prev, [time]: [...prev[time], item] };
      try {
        localStorage.setItem("gl_routine", JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  const removeFromRoutine = (item, time) => {
    setRoutine((prev) => {
      const updated = {
        ...prev,
        [time]: prev[time].filter((i) => i !== item)
      };
      try {
        localStorage.setItem("gl_routine", JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  const addToWorkout = (exercise, muscle) => {
    setWorkoutPlan((prev) => {
      const item = `${muscle}: ${exercise}`;
      if (prev.includes(item)) return prev;
      const updated = [...prev, item];
      try {
        localStorage.setItem("gl_workout", JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  const removeFromWorkout = (item) => {
    setWorkoutPlan((prev) => {
      const updated = prev.filter((i) => i !== item);
      try {
        localStorage.setItem("gl_workout", JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  const value = {
    user,
    signUp,
    signIn,
    logout,
    routine,
    addToRoutine,
    removeFromRoutine,
    workoutPlan,
    addToWorkout,
    removeFromWorkout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

