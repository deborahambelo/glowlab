import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, addDoc, collection } from "firebase/firestore";
import {
  seedBlogs,
  seedFitnessGroups,
  seedSkincareConcerns,
} from "../src/seed/firestoreSeedData.js";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

function requireConfig(config) {
  const missing = Object.entries(config)
    .filter(([, v]) => !v)
    .map(([k]) => k);
  if (missing.length) {
    throw new Error(
      `Missing env vars: ${missing.join(
        ", "
      )}. Provide them (same ones used by Vite).`
    );
  }
}

requireConfig(firebaseConfig);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  console.log("Seeding fitnessGroups...");
  for (const group of seedFitnessGroups) {
    const id = group.id;
    if (!id) continue;
    const { id: _, ...payload } = group;
    await setDoc(doc(db, "fitnessGroups", id), payload, { merge: true });
  }

  console.log("Seeding skincareConcerns...");
  for (const concern of seedSkincareConcerns) {
    const id = concern.id;
    if (!id) continue;
    const { id: _, ...payload } = concern;
    await setDoc(doc(db, "skincareConcerns", id), payload, { merge: true });
  }

  console.log("Seeding blogs...");
  for (const blog of seedBlogs) {
    await addDoc(collection(db, "blogs"), {
      ...blog,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

