import { useEffect, useState } from "react";
import * as logEntriesService from "../../services/logEntriesService";

export default function PublicFeed() {
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await logEntriesService.getPublicEntries();
        if (!Array.isArray(data)) {
          setEntries([]);
          setMessage("Public feed unavailable (API did not return an array).");
          return;
        }
        setEntries(data);
        setMessage("");
      } catch (err) {
        setEntries([]);
        setMessage(err?.message || "Failed to fetch public entries.");
      }
    })();
  }, []);

  const toggle = (id) => setExpandedId((prev) => (prev === id ? null : id));

  const pageBg = {
    minHeight: "100vh",
    padding: "28px 16px",
    background: `
      radial-gradient(circle at 20% 0%, rgba(255,180,90,0.28), transparent 45%),
      radial-gradient(circle at 80% 20%, rgba(255,120,60,0.18), transparent 40%),
      radial-gradient(circle at 50% 100%, rgba(120,70,30,0.35), transparent 55%),
      #070607
    `,
  };

  const container = {
    width: "min(980px, 92vw)",
    margin: "0 auto",
  };

  const panel = {
    borderRadius: "18px",
    padding: "22px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.14)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
    backdropFilter: "blur(12px)",
    color: "rgba(255,255,255,0.92)",
  };

  const entryCard = {
    borderRadius: 14,
    padding: 14,
    background: "rgba(255,255,255,0.94)",
    border: "1px solid rgba(0,0,0,0.08)",
    color: "#111827",
    boxShadow: "0 10px 26px rgba(0,0,0,0.18)",
  };

  const tagLine = { fontSize: 13, color: "#6b7280" };

  const btnBase = {
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.18)",
    cursor: "pointer",
    height: "fit-content",
    fontWeight: 700,
  };

  const btnPrimary = {
    ...btnBase,
    background: "linear-gradient(135deg, #ffc878, #ff8c50)",
    color: "#1b0e07",
    border: "none",
  };

  const btnGhost = {
    ...btnBase,
    background: "white",
    color: "#111",
  };

  return (
    <div style={pageBg}>
      <div style={container}>
        <div style={panel}>
          <h1 style={{ marginTop: 0, marginBottom: 6, fontSize: 44, letterSpacing: -0.5 }}>
            Public Feed
          </h1>
          <p style={{ marginTop: 0, marginBottom: 18, color: "rgba(255,255,255,0.72)" }}>
            Click a post to expand/collapse.
          </p>

          {message && (
            <p
              style={{
                marginTop: 0,
                marginBottom: 14,
                padding: "10px 12px",
                borderRadius: 12,
                background: "rgba(255,120,120,0.12)",
                border: "1px solid rgba(255,120,120,0.35)",
                color: "rgba(255,220,220,0.95)",
              }}
            >
              {message}
            </p>
          )}

          <div style={{ display: "grid", gap: 12 }}>
            {entries.map((entry) => {
              const isExpanded = expandedId === entry.id;

              return (
                <div
                  key={entry.id}
                  style={{
                    ...entryCard,
                    border: isExpanded
                      ? "1px solid rgba(255,140,80,0.55)"
                      : entryCard.border,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <div>
                      <div style={{ fontWeight: 900, color: "#111827" }}>
                        @{entry.username || "anonymous"}
                      </div>
                      <div style={tagLine}>
                        Mood: {entry.mood} • Activity: {entry.activity}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggle(entry.id)}
                      style={isExpanded ? btnGhost : btnPrimary}
                    >
                      {isExpanded ? "Collapse" : "Expand"}
                    </button>
                  </div>

                  {!isExpanded && (
                    <p style={{ marginTop: 10, marginBottom: 0, color: "#111827" }}>
                      {entry.note ? entry.note.slice(0, 110) : "No note"}
                      {entry.note && entry.note.length > 110 ? "..." : ""}
                    </p>
                  )}

                  {isExpanded && (
                    <div style={{ marginTop: 10, color: "#111827" }}>
                      <p style={{ margin: 0, whiteSpace: "pre-wrap", color: "#111827" }}>
                        {entry.note || "No note"}
                      </p>

                      <div style={{ marginTop: 10, fontSize: 12, color: "#6b7280" }}>
                        <div>Entry ID: {entry.id}</div>

                        {entry.entry_date && (
                          <div>
                            Entry Date: {new Date(entry.entry_date).toLocaleDateString()}
                          </div>
                        )}

                        {entry.created_at && (
                          <div>
                            {entry.updated_at && entry.updated_at !== entry.created_at
                              ? `Edited At: ${new Date(entry.updated_at).toLocaleString()}`
                              : `Created At: ${new Date(entry.created_at).toLocaleString()}`}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
