"use client";

import { useEffect, useMemo, useState } from "react";

const emptyItem = {
  type: "project",
  slug: "",
  title: "",
  excerpt: "",
  body: "",
  metadata: {},
  status: "draft",
  sort_order: 100
};

export function AdminApp({ backendReady }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState({ ...emptyItem });
  const [metaText, setMetaText] = useState("{}");
  const [filter, setFilter] = useState("all");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    if (!backendReady) return;
    setLoading(true);
    try {
      const response = await fetch("/api/admin/content", { cache: "no-store" });
      const data = await response.json().catch(() => []);
      if (!response.ok) throw new Error(data.error || "Could not load content");
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not load content");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (backendReady) void load();
  }, [backendReady]);

  const visibleItems = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.type === filter)),
    [items, filter]
  );

  const types = Array.from(new Set(items.map((item) => item.type))).sort();

  function choose(item) {
    setEditing({ ...item });
    setMetaText(JSON.stringify(item.metadata || {}, null, 2));
    setNotice("");
  }

  function fresh() {
    setEditing({ ...emptyItem });
    setMetaText("{}");
    setNotice("");
  }

  async function save(event) {
    event.preventDefault();
    setNotice("");

    try {
      const metadata = JSON.parse(metaText || "{}");
      const payload = { ...editing, metadata };
      const method = editing.id ? "PATCH" : "POST";
      const endpoint = editing.id ? `/api/admin/content/${editing.id}` : "/api/admin/content";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Save failed");

      setNotice("Saved.");
      await load();
      choose(result);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Save failed");
    }
  }

  async function remove() {
    if (!editing.id || !window.confirm("Delete this item?")) return;

    const response = await fetch(`/api/admin/content/${editing.id}`, { method: "DELETE" });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      setNotice(result.error || "Delete failed");
      return;
    }

    fresh();
    await load();
  }

  if (!backendReady) {
    return (
      <div className="admin-empty">
        <h2>Backend not connected yet.</h2>
        <p>
          The public website is already usable. To unlock browser-based editing, create a Supabase project,
          run <code>supabase/schema.sql</code>, and add the environment variables from <code>.env.example</code> in Vercel.
        </p>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <aside className="admin-list">
        <div className="admin-list-head">
          <strong>Content</strong>
          <button type="button" onClick={fresh}>+ New</button>
        </div>

        <select value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option value="all">All types</option>
          {types.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>

        <div className="admin-items">
          {loading ? <p className="muted">Loading…</p> : null}
          {visibleItems.map((item) => (
            <button
              type="button"
              key={item.id || `${item.type}-${item.slug}`}
              className={editing.id === item.id ? "selected" : ""}
              onClick={() => choose(item)}
            >
              <span>{item.title}</span>
              <small>{item.type} · {item.status}</small>
            </button>
          ))}
        </div>
      </aside>

      <form className="admin-editor" onSubmit={save}>
        <div className="admin-editor-head">
          <div>
            <div className="eyebrow">Editor</div>
            <h2>{editing.id ? "Edit content" : "New content"}</h2>
          </div>
          <div className="admin-actions">
            {editing.id ? <button type="button" className="button" onClick={remove}>Delete</button> : null}
            <button className="button button-primary">Save</button>
          </div>
        </div>

        {notice ? <div className="admin-notice">{notice}</div> : null}

        <div className="form-grid">
          <label>
            Type
            <input value={editing.type} onChange={(event) => setEditing({ ...editing, type: event.target.value })} required />
          </label>
          <label>
            Status
            <select value={editing.status} onChange={(event) => setEditing({ ...editing, status: event.target.value })}>
              {["private", "draft", "public", "unlisted", "archived"].map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>
        </div>

        <label>
          Title
          <input value={editing.title} onChange={(event) => setEditing({ ...editing, title: event.target.value })} required />
        </label>

        <label>
          Slug
          <input value={editing.slug} onChange={(event) => setEditing({ ...editing, slug: event.target.value })} required placeholder="lowercase-with-dashes" />
        </label>

        <label>
          Excerpt
          <textarea value={editing.excerpt || ""} onChange={(event) => setEditing({ ...editing, excerpt: event.target.value })} rows={3} />
        </label>

        <label>
          Body
          <textarea value={editing.body || ""} onChange={(event) => setEditing({ ...editing, body: event.target.value })} rows={12} />
        </label>

        <div className="form-grid">
          <label>
            Sort order
            <input type="number" value={editing.sort_order || 0} onChange={(event) => setEditing({ ...editing, sort_order: Number(event.target.value) })} />
          </label>
          <label>
            Metadata JSON
            <textarea className="code-input" value={metaText} onChange={(event) => setMetaText(event.target.value)} rows={5} />
          </label>
        </div>
      </form>
    </div>
  );
}
