import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState, useEffect, useMemo } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import "../styles/admin.css";

const TABS = {
  BLOGS: "blogs",
  FITNESS: "fitnessGroups",
  SKINCARE: "skincareConcerns",
};

const initialBlog = {
  title: "",
  date: "",
  cat: "Skincare",
  preview: "",
  read: "",
  body: "",
};
const initialFitnessGroup = {
  id: "",
  label: "",
  icon: "",
  color: "",
  bg: "",
  tip: "",
  exercises: [],
};
const initialSkincareConcern = {
  id: "",
  label: "",
  emoji: "",
  color: "",
  bg: "",
  description: "",
  causes: [],
  ingredients: [],
  products: {},
  routine: { AM: [], PM: [], tips: [] },
};

// ─── Admin Navbar ──────────────────────────────────────────────────────────────
function AdminNavbar({ email, onLogout }) {
  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-inner">
        <div className="admin-navbar-brand">
          <span className="admin-navbar-logo">⚙️</span>
          <span className="admin-navbar-title">GlowLab Admin</span>
        </div>
        <div className="admin-navbar-right">
          <span className="admin-navbar-email">{email}</span>
          <button className="admin-navbar-logout" onClick={onLogout}>
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}

function Admin() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(TABS.BLOGS);
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [fitnessGroups, setFitnessGroups] = useState([]);
  const [skincareConcerns, setSkincareConcerns] = useState([]);

  const [subLoading, setSubLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const [blogForm, setBlogForm] = useState(initialBlog);
  const [fitnessForm, setFitnessForm] = useState(initialFitnessGroup);
  const [skincareForm, setSkincareForm] = useState(initialSkincareConcern);

  // Auth + Admin Check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (!user) {
        setIsAdmin(false);
        setAuthLoading(false);
        return;
      }
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        setIsAdmin(snap.exists() ? snap.data()?.isAdmin === true : false);
      } catch {
        setIsAdmin(false);
      } finally {
        setAuthLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authLoading && (!currentUser || !isAdmin))
      navigate("/login", { replace: true });
  }, [authLoading, currentUser, isAdmin, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch {
      setFeedback({ type: "error", message: "Failed to sign out." });
    }
  };

  useEffect(() => {
    if (!currentUser || !isAdmin) return;
    setSubLoading(true);
    const unsubs = [];

    unsubs.push(
      onSnapshot(
        collection(db, "blogs"),
        (s) => setBlogs(s.docs.map((d) => ({ id: d.id, ...d.data() }))),
        () => setFeedback({ type: "error", message: "Failed to load blogs." })
      )
    );
    unsubs.push(
      onSnapshot(
        collection(db, "fitnessGroups"),
        (s) => setFitnessGroups(s.docs.map((d) => ({ id: d.id, ...d.data() }))),
        () =>
          setFeedback({
            type: "error",
            message: "Failed to load fitness groups.",
          })
      )
    );
    unsubs.push(
      onSnapshot(
        collection(db, "skincareConcerns"),
        (s) =>
          setSkincareConcerns(s.docs.map((d) => ({ id: d.id, ...d.data() }))),
        () =>
          setFeedback({
            type: "error",
            message: "Failed to load skincare concerns.",
          })
      )
    );

    setSubLoading(false);
    return () => unsubs.forEach((u) => u && u());
  }, [currentUser, isAdmin]);

  // Modal helpers
  const openAddModal = (type) => {
    setModalType(type);
    setEditingItem(null);
    if (type === TABS.BLOGS) setBlogForm(initialBlog);
    if (type === TABS.FITNESS) setFitnessForm(initialFitnessGroup);
    if (type === TABS.SKINCARE) setSkincareForm(initialSkincareConcern);
    setIsModalOpen(true);
  };

  const openEditModal = (type, item) => {
    setModalType(type);
    setEditingItem(item);
    if (type === TABS.BLOGS)
      setBlogForm({
        title: item.title || "",
        date: item.date || "",
        cat: item.cat || "Skincare",
        preview: item.preview || "",
        read: item.read || "",
        body: item.body || "",
      });
    if (type === TABS.FITNESS)
      setFitnessForm({
        id: item.id || "",
        label: item.label || "",
        icon: item.icon || "",
        color: item.color || "",
        bg: item.bg || "",
        tip: item.tip || "",
        exercises: Array.isArray(item.exercises) ? item.exercises : [],
      });
    if (type === TABS.SKINCARE)
      setSkincareForm({
        id: item.id || "",
        label: item.label || "",
        emoji: item.emoji || "",
        color: item.color || "",
        bg: item.bg || "",
        description: item.description || "",
        causes: Array.isArray(item.causes) ? item.causes : [],
        ingredients: Array.isArray(item.ingredients) ? item.ingredients : [],
        products:
          item.products && typeof item.products === "object"
            ? item.products
            : {},
        routine:
          item.routine && typeof item.routine === "object"
            ? {
                AM: Array.isArray(item.routine.AM) ? item.routine.AM : [],
                PM: Array.isArray(item.routine.PM) ? item.routine.PM : [],
                tips: Array.isArray(item.routine.tips) ? item.routine.tips : [],
              }
            : { AM: [], PM: [], tips: [] },
      });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setEditingItem(null);
  };

  // CRUD
  const handleDelete = async (col, id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await deleteDoc(doc(db, col, id));
      setFeedback({ type: "success", message: "Item deleted." });
    } catch {
      setFeedback({ type: "error", message: "Failed to delete." });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!modalType) return;
    try {
      if (modalType === TABS.BLOGS) {
        const payload = { ...blogForm, updatedAt: new Date().toISOString() };
        if (editingItem) {
          await updateDoc(doc(db, "blogs", editingItem.id), payload);
          setFeedback({ type: "success", message: "Blog updated." });
        } else {
          await addDoc(collection(db, "blogs"), {
            ...payload,
            createdAt: new Date().toISOString(),
          });
          setFeedback({ type: "success", message: "Blog created." });
        }
      }
      if (modalType === TABS.FITNESS) {
        const idToUse = (editingItem?.id || fitnessForm.id || "").trim();
        if (!idToUse) throw new Error("Fitness group id is required.");
        const payload = {
          label: fitnessForm.label || "",
          icon: fitnessForm.icon || "",
          color: fitnessForm.color || "",
          bg: fitnessForm.bg || "",
          tip: fitnessForm.tip || "",
          exercises: Array.isArray(fitnessForm.exercises)
            ? fitnessForm.exercises
            : [],
          updatedAt: new Date().toISOString(),
        };
        if (editingItem) {
          await updateDoc(doc(db, "fitnessGroups", idToUse), payload);
          setFeedback({ type: "success", message: "Fitness group updated." });
        } else {
          await setDoc(doc(db, "fitnessGroups", idToUse), {
            ...payload,
            createdAt: new Date().toISOString(),
          });
          setFeedback({ type: "success", message: "Fitness group created." });
        }
      }
      if (modalType === TABS.SKINCARE) {
        const idToUse = (editingItem?.id || skincareForm.id || "").trim();
        if (!idToUse) throw new Error("Skincare concern id is required.");
        const payload = {
          label: skincareForm.label || "",
          emoji: skincareForm.emoji || "",
          color: skincareForm.color || "",
          bg: skincareForm.bg || "",
          description: skincareForm.description || "",
          causes: Array.isArray(skincareForm.causes) ? skincareForm.causes : [],
          ingredients: Array.isArray(skincareForm.ingredients)
            ? skincareForm.ingredients
            : [],
          products: skincareForm.products || {},
          routine: skincareForm.routine || { AM: [], PM: [], tips: [] },
          updatedAt: new Date().toISOString(),
        };
        if (editingItem) {
          await updateDoc(doc(db, "skincareConcerns", idToUse), payload);
          setFeedback({
            type: "success",
            message: "Skincare concern updated.",
          });
        } else {
          await setDoc(doc(db, "skincareConcerns", idToUse), {
            ...payload,
            createdAt: new Date().toISOString(),
          });
          setFeedback({
            type: "success",
            message: "Skincare concern created.",
          });
        }
      }
      closeModal();
    } catch (err) {
      setFeedback({
        type: "error",
        message: err?.message || "Failed to save.",
      });
    }
  };

  const sortedBlogs = useMemo(
    () =>
      [...blogs].sort((a, b) =>
        String(a.title || "").localeCompare(String(b.title || ""))
      ),
    [blogs]
  );
  const sortedFitnessGroups = useMemo(
    () =>
      [...fitnessGroups].sort((a, b) =>
        String(a.id).localeCompare(String(b.id))
      ),
    [fitnessGroups]
  );
  const sortedSkincareConcerns = useMemo(
    () =>
      [...skincareConcerns].sort((a, b) =>
        String(a.id).localeCompare(String(b.id))
      ),
    [skincareConcerns]
  );

  const renderTable = () => {
    if (activeTab === TABS.BLOGS)
      return (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Preview</th>
                <th className="right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedBlogs.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.cat}</td>
                  <td title={item.preview}>{item.preview}</td>
                  <td className="right">
                    <button
                      className="btn-edit"
                      onClick={() => openEditModal(TABS.BLOGS, item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete("blogs", item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {sortedBlogs.length === 0 && (
                <tr className="empty-row">
                  <td colSpan={4}>No blog posts yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );

    if (activeTab === TABS.FITNESS)
      return (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Label</th>
                <th>Exercises</th>
                <th>Tip</th>
                <th className="right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedFitnessGroups.map((item) => (
                <tr key={item.id}>
                  <td className="mono">{item.id}</td>
                  <td>{item.label}</td>
                  <td>
                    {Array.isArray(item.exercises) ? item.exercises.length : 0}
                  </td>
                  <td title={item.tip}>{item.tip}</td>
                  <td className="right">
                    <button
                      className="btn-edit"
                      onClick={() => openEditModal(TABS.FITNESS, item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete("fitnessGroups", item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {sortedFitnessGroups.length === 0 && (
                <tr className="empty-row">
                  <td colSpan={5}>No fitness groups yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );

    if (activeTab === TABS.SKINCARE)
      return (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Label</th>
                <th>Causes</th>
                <th>Ingredients</th>
                <th className="right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedSkincareConcerns.map((item) => (
                <tr key={item.id}>
                  <td className="mono">{item.id}</td>
                  <td>{item.label}</td>
                  <td>{Array.isArray(item.causes) ? item.causes.length : 0}</td>
                  <td>
                    {Array.isArray(item.ingredients)
                      ? item.ingredients.length
                      : 0}
                  </td>
                  <td className="right">
                    <button
                      className="btn-edit"
                      onClick={() => openEditModal(TABS.SKINCARE, item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete("skincareConcerns", item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {sortedSkincareConcerns.length === 0 && (
                <tr className="empty-row">
                  <td colSpan={5}>No skincare concerns yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );
    return null;
  };

  const renderModalContent = () => {
    if (!modalType) return null;

    if (modalType === TABS.BLOGS)
      return (
        <>
          <h3>{editingItem ? "Edit Blog Post" : "Add Blog Post"}</h3>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label>Title</label>
              <input
                type="text"
                value={blogForm.title}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, title: e.target.value })
                }
                required
              />
            </div>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Date</label>
                <input
                  type="text"
                  value={blogForm.date}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, date: e.target.value })
                  }
                  placeholder="e.g. Feb 12, 2026"
                />
              </div>
              <div className="admin-form-group">
                <label>Category</label>
                <select
                  value={blogForm.cat}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, cat: e.target.value })
                  }
                >
                  <option value="Skincare">Skincare</option>
                  <option value="Fitness">Fitness</option>
                </select>
              </div>
            </div>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Read time</label>
                <input
                  type="text"
                  value={blogForm.read}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, read: e.target.value })
                  }
                  placeholder="e.g. 5 min"
                />
              </div>
              <div className="admin-form-group">
                <label>Preview</label>
                <input
                  type="text"
                  value={blogForm.preview}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, preview: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="admin-form-group">
              <label>Body</label>
              <textarea
                value={blogForm.body}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, body: e.target.value })
                }
                style={{ minHeight: 140 }}
                required
              />
            </div>
            <ModalActions
              onCancel={closeModal}
              isEditing={Boolean(editingItem)}
            />
          </form>
        </>
      );

    if (modalType === TABS.FITNESS)
      return (
        <>
          <h3>{editingItem ? "Edit Fitness Group" : "Add Fitness Group"}</h3>
          <form className="admin-form" onSubmit={handleSubmit}>
            {!editingItem && (
              <div className="admin-form-group">
                <label>ID (document id)</label>
                <input
                  type="text"
                  value={fitnessForm.id}
                  onChange={(e) =>
                    setFitnessForm({ ...fitnessForm, id: e.target.value })
                  }
                  placeholder="e.g. glutes"
                  required
                />
              </div>
            )}
            <div className="admin-form-group">
              <label>Label</label>
              <input
                type="text"
                value={fitnessForm.label}
                onChange={(e) =>
                  setFitnessForm({ ...fitnessForm, label: e.target.value })
                }
                required
              />
            </div>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Icon</label>
                <input
                  type="text"
                  value={fitnessForm.icon}
                  onChange={(e) =>
                    setFitnessForm({ ...fitnessForm, icon: e.target.value })
                  }
                  placeholder="e.g. 🍑"
                />
              </div>
              <div className="admin-form-group">
                <label>Accent color</label>
                <input
                  type="text"
                  value={fitnessForm.color}
                  onChange={(e) =>
                    setFitnessForm({ ...fitnessForm, color: e.target.value })
                  }
                  placeholder="#f97316"
                />
              </div>
            </div>
            <div className="admin-form-group">
              <label>Background</label>
              <input
                type="text"
                value={fitnessForm.bg}
                onChange={(e) =>
                  setFitnessForm({ ...fitnessForm, bg: e.target.value })
                }
                placeholder="#fff7ed"
              />
            </div>
            <div className="admin-form-group">
              <label>Coach tip</label>
              <textarea
                value={fitnessForm.tip}
                onChange={(e) =>
                  setFitnessForm({ ...fitnessForm, tip: e.target.value })
                }
                required
              />
            </div>
            <ExercisesEditor
              exercises={fitnessForm.exercises}
              onChange={(next) =>
                setFitnessForm({ ...fitnessForm, exercises: next })
              }
            />
            <ModalActions
              onCancel={closeModal}
              isEditing={Boolean(editingItem)}
            />
          </form>
        </>
      );

    if (modalType === TABS.SKINCARE)
      return (
        <>
          <h3>
            {editingItem ? "Edit Skincare Concern" : "Add Skincare Concern"}
          </h3>
          <form className="admin-form" onSubmit={handleSubmit}>
            {!editingItem && (
              <div className="admin-form-group">
                <label>ID (document id)</label>
                <input
                  type="text"
                  value={skincareForm.id}
                  onChange={(e) =>
                    setSkincareForm({ ...skincareForm, id: e.target.value })
                  }
                  placeholder="e.g. acne"
                  required
                />
              </div>
            )}
            <div className="admin-form-group">
              <label>Label</label>
              <input
                type="text"
                value={skincareForm.label}
                onChange={(e) =>
                  setSkincareForm({ ...skincareForm, label: e.target.value })
                }
                required
              />
            </div>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Emoji</label>
                <input
                  type="text"
                  value={skincareForm.emoji}
                  onChange={(e) =>
                    setSkincareForm({ ...skincareForm, emoji: e.target.value })
                  }
                  placeholder="e.g. 🫧"
                />
              </div>
              <div className="admin-form-group">
                <label>Accent color</label>
                <input
                  type="text"
                  value={skincareForm.color}
                  onChange={(e) =>
                    setSkincareForm({ ...skincareForm, color: e.target.value })
                  }
                  placeholder="#f43f5e"
                />
              </div>
            </div>
            <div className="admin-form-group">
              <label>Background</label>
              <input
                type="text"
                value={skincareForm.bg}
                onChange={(e) =>
                  setSkincareForm({ ...skincareForm, bg: e.target.value })
                }
                placeholder="#fef2f2"
              />
            </div>
            <div className="admin-form-group">
              <label>Description</label>
              <textarea
                value={skincareForm.description}
                onChange={(e) =>
                  setSkincareForm({
                    ...skincareForm,
                    description: e.target.value,
                  })
                }
                required
              />
            </div>
            <StringListEditor
              label="Causes"
              addLabel="+ Add Cause"
              items={skincareForm.causes}
              onChange={(next) =>
                setSkincareForm({ ...skincareForm, causes: next })
              }
            />
            <StringListEditor
              label="Ingredients"
              addLabel="+ Add Ingredient"
              items={skincareForm.ingredients}
              onChange={(next) =>
                setSkincareForm({ ...skincareForm, ingredients: next })
              }
            />
            <ProductsEditor
              products={skincareForm.products}
              onChange={(next) =>
                setSkincareForm({ ...skincareForm, products: next })
              }
            />
            <RoutineEditor
              routine={skincareForm.routine}
              onChange={(next) =>
                setSkincareForm({ ...skincareForm, routine: next })
              }
            />
            <ModalActions
              onCancel={closeModal}
              isEditing={Boolean(editingItem)}
            />
          </form>
        </>
      );
    return null;
  };

  if (authLoading)
    return (
      <div className="admin-gate">
        <p style={{ color: "#6b7280" }}>Checking admin access...</p>
      </div>
    );

  if (!currentUser || !isAdmin)
    return (
      <div className="admin-gate">
        <div className="admin-gate-card">
          <h2>Access Denied</h2>
          <p>You must be an admin to view this page.</p>
        </div>
      </div>
    );

  return (
    // Wrap in a full-page container that won't inherit customer layout styles
    <div className="admin-root">
      <AdminNavbar email={currentUser?.email} onLogout={handleLogout} />

      <div className="admin-page">
        <div className="admin-container">
          <header className="admin-header">
            <div>
              <h1>GlowLab Admin Dashboard</h1>
              <p>
                Manage blog posts, skincare concerns, and fitness groups in real
                time.
              </p>
            </div>
          </header>

          {feedback && (
            <div className={`admin-feedback ${feedback.type}`}>
              <span>{feedback.message}</span>
              <button onClick={() => setFeedback(null)}>Close</button>
            </div>
          )}

          <section className="admin-section">
            <div className="admin-tab-bar">
              <div className="admin-tabs">
                <button
                  className={`admin-tab${
                    activeTab === TABS.BLOGS ? " active" : ""
                  }`}
                  onClick={() => setActiveTab(TABS.BLOGS)}
                >
                  Blog Posts
                </button>
                <button
                  className={`admin-tab${
                    activeTab === TABS.FITNESS ? " active" : ""
                  }`}
                  onClick={() => setActiveTab(TABS.FITNESS)}
                >
                  Fitness Groups
                </button>
                <button
                  className={`admin-tab${
                    activeTab === TABS.SKINCARE ? " active" : ""
                  }`}
                  onClick={() => setActiveTab(TABS.SKINCARE)}
                >
                  Skincare Concerns
                </button>
              </div>
              <button
                className="admin-add-btn"
                onClick={() => openAddModal(activeTab)}
              >
                + Add New
              </button>
            </div>

            {subLoading ? (
              <div className="admin-loading">Loading data...</div>
            ) : (
              renderTable()
            )}
          </section>
        </div>
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">{renderModalContent()}</div>
        </div>
      )}
    </div>
  );
}

function ModalActions({ onCancel, isEditing }) {
  return (
    <div className="admin-modal-actions">
      <button type="button" className="btn-cancel" onClick={onCancel}>
        Cancel
      </button>
      <button type="submit" className="btn-submit">
        {isEditing ? "Save Changes" : "Create"}
      </button>
    </div>
  );
}

function StringListEditor({ label, items, onChange, addLabel }) {
  const list = Array.isArray(items) ? items : [];
  return (
    <div className="admin-sub-editor">
      <div className="admin-sub-editor-header">
        <span className="title">{label}</span>
        <button
          type="button"
          className="btn-add-item"
          onClick={() => onChange([...list, ""])}
        >
          {addLabel}
        </button>
      </div>
      {list.map((val, idx) => (
        <div key={idx} className="item-row">
          <input
            type="text"
            value={val}
            onChange={(e) => {
              const n = [...list];
              n[idx] = e.target.value;
              onChange(n);
            }}
            placeholder={`${label} item`}
          />
          <button
            type="button"
            className="btn-remove"
            onClick={() => onChange(list.filter((_, i) => i !== idx))}
          >
            Remove
          </button>
        </div>
      ))}
      {list.length === 0 && <div className="empty-hint">No items yet.</div>}
    </div>
  );
}

function ExercisesEditor({ exercises, onChange }) {
  const list = Array.isArray(exercises) ? exercises : [];
  return (
    <div className="admin-sub-editor">
      <div className="admin-sub-editor-header">
        <span className="title">Exercises</span>
        <button
          type="button"
          className="btn-add-item"
          onClick={() =>
            onChange([
              ...list,
              { name: "", sets: "", reps: "", level: "", desc: "" },
            ])
          }
        >
          + Add Exercise
        </button>
      </div>
      {list.map((ex, idx) => (
        <div key={idx} className="exercise-card">
          <div className="grid-2">
            <input
              type="text"
              value={ex?.name || ""}
              onChange={(e) => {
                const n = [...list];
                n[idx] = { ...n[idx], name: e.target.value };
                onChange(n);
              }}
              placeholder="Name"
            />
            <input
              type="text"
              value={ex?.level || ""}
              onChange={(e) => {
                const n = [...list];
                n[idx] = { ...n[idx], level: e.target.value };
                onChange(n);
              }}
              placeholder="Level"
            />
            <input
              type="text"
              value={ex?.sets || ""}
              onChange={(e) => {
                const n = [...list];
                n[idx] = { ...n[idx], sets: e.target.value };
                onChange(n);
              }}
              placeholder="Sets (e.g. 4)"
            />
            <input
              type="text"
              value={ex?.reps || ""}
              onChange={(e) => {
                const n = [...list];
                n[idx] = { ...n[idx], reps: e.target.value };
                onChange(n);
              }}
              placeholder="Reps (e.g. 8–12)"
            />
          </div>
          <textarea
            value={ex?.desc || ""}
            onChange={(e) => {
              const n = [...list];
              n[idx] = { ...n[idx], desc: e.target.value };
              onChange(n);
            }}
            placeholder="Description"
            style={{ minHeight: 80, width: "100%", boxSizing: "border-box" }}
          />
          <div className="remove-row">
            <button
              type="button"
              className="btn-remove"
              onClick={() => onChange(list.filter((_, i) => i !== idx))}
            >
              Remove exercise
            </button>
          </div>
        </div>
      ))}
      {list.length === 0 && <div className="empty-hint">No exercises yet.</div>}
    </div>
  );
}

function ProductsEditor({ products, onChange }) {
  const value = products && typeof products === "object" ? products : {};
  const categories = Object.keys(value);

  const addCategory = () => {
    const name = window.prompt("New category name");
    if (!name || value[name]) return;
    onChange({ ...value, [name]: [] });
  };
  const removeCategory = (cat) => {
    const n = { ...value };
    delete n[cat];
    onChange(n);
  };
  const renameCategory = (old) => {
    const next = window.prompt("Rename category", old);
    if (!next || next === old || value[next]) return;
    const n = { ...value, [next]: value[old] || [] };
    delete n[old];
    onChange(n);
  };
  const updateProducts = (cat, list) => onChange({ ...value, [cat]: list });

  return (
    <div className="admin-sub-editor">
      <div className="admin-sub-editor-header">
        <span className="title">Products</span>
        <button type="button" className="btn-add-item" onClick={addCategory}>
          + Add Category
        </button>
      </div>
      {categories.map((cat) => {
        const list = Array.isArray(value[cat]) ? value[cat] : [];
        return (
          <div key={cat} className="product-category">
            <div className="product-category-header">
              <span className="cat-title">{cat}</span>
              <div className="cat-actions">
                <button
                  type="button"
                  className="btn-rename"
                  onClick={() => renameCategory(cat)}
                >
                  Rename
                </button>
                <button
                  type="button"
                  className="btn-add-item"
                  onClick={() =>
                    updateProducts(cat, [
                      ...list,
                      { id: "", brand: "", name: "", key: "", benefit: "" },
                    ])
                  }
                >
                  + Add Product
                </button>
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => removeCategory(cat)}
                >
                  Remove
                </button>
              </div>
            </div>
            {list.map((p, idx) => (
              <div key={idx} className="product-item">
                <div className="grid-2">
                  <input
                    type="text"
                    value={p?.id || ""}
                    onChange={(e) => {
                      const n = [...list];
                      n[idx] = { ...n[idx], id: e.target.value };
                      updateProducts(cat, n);
                    }}
                    placeholder="Product id"
                  />
                  <input
                    type="text"
                    value={p?.brand || ""}
                    onChange={(e) => {
                      const n = [...list];
                      n[idx] = { ...n[idx], brand: e.target.value };
                      updateProducts(cat, n);
                    }}
                    placeholder="Brand"
                  />
                  <input
                    type="text"
                    value={p?.name || ""}
                    onChange={(e) => {
                      const n = [...list];
                      n[idx] = { ...n[idx], name: e.target.value };
                      updateProducts(cat, n);
                    }}
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={p?.key || ""}
                    onChange={(e) => {
                      const n = [...list];
                      n[idx] = { ...n[idx], key: e.target.value };
                      updateProducts(cat, n);
                    }}
                    placeholder="Key ingredient"
                  />
                </div>
                <textarea
                  value={p?.benefit || ""}
                  onChange={(e) => {
                    const n = [...list];
                    n[idx] = { ...n[idx], benefit: e.target.value };
                    updateProducts(cat, n);
                  }}
                  placeholder="Benefit"
                  style={{
                    minHeight: 80,
                    width: "100%",
                    boxSizing: "border-box",
                    marginTop: 8,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 8,
                  }}
                >
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() =>
                      updateProducts(
                        cat,
                        list.filter((_, i) => i !== idx)
                      )
                    }
                  >
                    Remove product
                  </button>
                </div>
              </div>
            ))}
            {list.length === 0 && (
              <div className="empty-hint">No products yet.</div>
            )}
          </div>
        );
      })}
      {categories.length === 0 && (
        <div className="empty-hint">No product categories yet.</div>
      )}
    </div>
  );
}

function RoutineEditor({ routine, onChange }) {
  const value =
    routine && typeof routine === "object"
      ? routine
      : { AM: [], PM: [], tips: [] };
  return (
    <div className="admin-sub-editor">
      <div className="admin-sub-editor-header">
        <span className="title">Routine</span>
      </div>
      <div className="routine-grid">
        <StringListEditor
          label="AM"
          addLabel="+ Add AM Step"
          items={value.AM}
          onChange={(next) => onChange({ ...value, AM: next })}
        />
        <StringListEditor
          label="PM"
          addLabel="+ Add PM Step"
          items={value.PM}
          onChange={(next) => onChange({ ...value, PM: next })}
        />
        <StringListEditor
          label="Tips"
          addLabel="+ Add Tip"
          items={value.tips}
          onChange={(next) => onChange({ ...value, tips: next })}
        />
      </div>
    </div>
  );
}

export default Admin;
