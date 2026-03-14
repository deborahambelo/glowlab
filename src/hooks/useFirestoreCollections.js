import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

// Generic realtime collection hook with very small API surface.
function useCollection(collectionName, { whereField, whereValue } = {}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let colRef = collection(db, collectionName);

    if (whereField && typeof whereValue !== "undefined") {
      colRef = query(colRef, where(whereField, "==", whereValue));
    }

    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const data = snapshot.docs.map((snap) => ({
          id: snap.id,
          ...snap.data(),
        }));
        setItems(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error(`Error loading collection "${collectionName}"`, err);
        setItems([]);
        setLoading(false);
        setError(err);
      }
    );

    return () => unsubscribe();
  }, [collectionName, whereField, whereValue]);

  return { items, loading, error };
}

// Realtime single document hook.
function useDocument(collectionName, id) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setItem(null);
      setLoading(false);
      return;
    }

    const ref = doc(db, collectionName, id);

    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        if (!snap.exists()) {
          setItem(null);
        } else {
          setItem({ id: snap.id, ...snap.data() });
        }
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error(`Error loading doc "${collectionName}/${id}"`, err);
        setItem(null);
        setLoading(false);
        setError(err);
      }
    );

    return () => unsubscribe();
  }, [collectionName, id]);

  return { item, loading, error };
}

// Domain-specific hooks, matching the Firestore collections you described.

export function useBlogs() {
  // Blogs live under "blogs" collection.
  return useCollection("blogs");
}

export function useBlog(id) {
  return useDocument("blogs", id);
}

export function useFitnessGroups() {
  // Fitness groups live under "fitnessGroups".
  return useCollection("fitnessGroups");
}

export function useFitnessGroup(id) {
  return useDocument("fitnessGroups", id);
}

export function useSkincareConcerns() {
  // Skincare concerns live under "skincareConcerns".
  return useCollection("skincareConcerns");
}

export function useSkincareConcern(id) {
  return useDocument("skincareConcerns", id);
}

export function useAllProductsFromConcerns() {
  const { items, loading, error } = useSkincareConcerns();

  // This hook only flattens; mapping into the exact UI shape
  // is handled in the data-mapping util to keep concerns separate.
  return { concerns: items, loading, error };
}

export { useCollection, useDocument };

