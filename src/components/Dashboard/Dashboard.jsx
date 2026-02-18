import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as logEntriesService from "../../services/logEntriesService";
import EntryCard from "../EntryCard/EntryCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await logEntriesService.getMyEntries();
        setEntries(Array.isArray(data) ? data : []);
      } catch (e) {
        setErr(e.message);
      }
    };
    fetchEntries();
  }, []);

  const handleDelete = async (id) => {
    try {
      await logEntriesService.deleteEntry(id);
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (e) {
      setErr(e.message);
    }
  };

  const handleEdit = (entry) => {
    navigate(`/log-entries/${entry.id}/edit`, { state: { entry } });
  };

  return (
    <main style={page}>
      <section style={hero}>
        <div style={heroTop}>
          <h1 style={title}>Your Dashboard</h1>
          <button style={newBtn} onClick={() => navigate("/log-entries/new")}>
            + New Entry
          </button>
        </div>

        <p style={subtitle}>Create, edit, and manage your life logs.</p>
        {err && <p style={errorText}>{err}</p>}
      </section>

       <div style={grid}>
  {entries.length === 0 ? (
    <div style={emptyCard}>
      <p style={{ margin: 0, fontWeight: 700, color: "#111827" }}>
        No entries yet.
      </p>
      <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
        Start your first log entry and build your streak.
      </p>

      <button
        style={{ ...newBtn, marginTop: 14, width: "fit-content" }}
        onClick={() => navigate("/log-entries/new")}
      >
        + Create Your First Entry
      </button>
    </div>
  ) : (
   entries.map((entry) => (
  <EntryCard
    key={entry.id}
    entry={entry}
    showActions={true}
    onEdit={handleEdit}
    onDelete={handleDelete}
  />
))

  )}
</div>
    </main>
  );
}
const page = {
  minHeight: "calc(100vh - 72px)",
  padding: 24,
  maxWidth: 900,
  margin: "0 auto",
};

const hero = {
  borderRadius: 24,
  padding: 24,
  marginBottom: 18,
  border: "1px solid rgba(255,255,255,0.10)",
  background:
    "radial-gradient(900px 420px at 20% 0%, rgba(255,122,24,0.35), transparent 60%), radial-gradient(700px 420px at 85% 10%, rgba(255,209,102,0.18), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
  boxShadow: "0 18px 50px rgba(0, 0, 0, 0.35)",
  color: "white",
};

const heroTop = {
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
};

const title = {
  fontSize: 44,
  margin: 0,
  letterSpacing: -1,
};

const subtitle = {
  marginTop: 10,
  marginBottom: 0,
  color: "rgba(255,255,255,0.80)",
};

const errorText = {
  marginTop: 12,
  marginBottom: 0,
  color: "#fecaca",
};

const newBtn = {
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(0, 0, 0, 0.36)",
  color: "white",
  borderRadius: 12,
  padding: "10px 14px",
  cursor: "pointer",
  backdropFilter: "blur(8px)",
};

const grid = {
  display: "grid",
  gap: 12,
};

const card = {
  background: "rgba(255, 255, 255, 0.92)",
  borderRadius: 18,
  padding: 18,
  color: "#111827",
  border: "1px solid rgba(17, 24, 39, 0.10)",
  boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
};

const emptyCard = {
  ...card,
  padding: 22,
};

