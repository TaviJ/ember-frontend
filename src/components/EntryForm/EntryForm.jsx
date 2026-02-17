import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import * as logEntriesService from "../../services/logEntriesService";

const LogEntryForm = ({ mode }) => {
  const { entryId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    entry_date: "",
    mood: "",
    activity: "",
    note: "",
    is_public: false,
  });

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(mode === "edit");

  useEffect(() => {
    if (mode !== "edit") return;

    const fromState = location.state?.entry;
    if (fromState) {
      setForm({
        entry_date: fromState.entry_date || "",
        mood: fromState.mood || "",
        activity: fromState.activity || "",
        note: fromState.note || "",
        is_public: !!fromState.is_public,
      });
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const all = await logEntriesService.getMyEntries();
        const found = all.find((e) => String(e.id) === String(entryId));
        if (!found) throw new Error("Entry not found");
        setForm({
          entry_date: found.entry_date || "",
          mood: found.mood || "",
          activity: found.activity || "",
          note: found.note || "",
          is_public: !!found.is_public,
        });
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [mode, entryId, location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      if (!form.mood || !form.activity)
        throw new Error("Mood and activity are required.");

      if (mode === "edit") {
        await logEntriesService.updateEntry(entryId, form);
      } else {
        await logEntriesService.createEntry(form);
      }

      navigate("/dashboard");
    } catch (e) {
      setErr(e.message);
    }
  };

 
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

  const formCard = {
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    background: "rgba(255,255,255,0.94)",
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 10px 26px rgba(0,0,0,0.18)",
    display: "grid",
    gap: 12,
    color: "#111827",
  };

  const label = {
    display: "grid",
    gap: 6,
    fontWeight: 700,
    color: "#111827",
  };

  const checkboxLabel = {
    display: "flex",
    gap: 10,
    alignItems: "center",
    fontWeight: 700,
    color: "#111827",
  };

  const input = {
    border: "1px solid rgba(0,0,0,0.14)",
    borderRadius: 12,
    padding: 10,
    fontWeight: 400,
    color: "#111827",
    background: "white",
    outline: "none",
  };

  const textarea = {
    border: "1px solid rgba(0,0,0,0.14)",
    borderRadius: 12,
    padding: 10,
    fontWeight: 400,
    resize: "vertical",
    color: "#111827",
    background: "white",
    outline: "none",
  };

  const btnBase = {
    borderRadius: 12,
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: 700,
  };

  const btnPrimary = {
    ...btnBase,
    border: "none",
    background: "linear-gradient(135deg, #ffc878, #ff8c50)",
    color: "#1b0e07",
  };

  const btnGhost = {
    ...btnBase,
    border: "1px solid rgba(0,0,0,0.18)",
    background: "white",
    color: "#111",
  };

  if (loading) {
    return (
      <div style={pageBg}>
        <div style={container}>
          <div style={panel}>
            <div style={{ padding: 18 }}>Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageBg}>
      <div style={container}>
        <div style={panel}>
          <h1
            style={{
              marginTop: 0,
              marginBottom: 6,
              fontSize: 44,
              letterSpacing: -0.5,
            }}
          >
            {mode === "edit" ? "Edit Entry" : "New Entry"}
          </h1>

          <p style={{ marginTop: 0, color: "rgba(255,255,255,0.72)" }}>
            Log your day.
          </p>

          {err && (
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
              {err}
            </p>
          )}

          <form onSubmit={handleSubmit} style={formCard}>
            <label style={label}>
              Date
              <input
                style={input}
                type="date"
                name="entry_date"
                value={form.entry_date}
                onChange={handleChange}
              />
            </label>

            <label style={label}>
              Mood *
              <input
                style={input}
                name="mood"
                value={form.mood}
                onChange={handleChange}
              />
            </label>

            <label style={label}>
              Activity *
              <input
                style={input}
                name="activity"
                value={form.activity}
                onChange={handleChange}
              />
            </label>

            <label style={label}>
              Note
              <textarea
                style={textarea}
                name="note"
                value={form.note}
                onChange={handleChange}
                rows={5}
              />
            </label>

            <label style={checkboxLabel}>
              <input
                type="checkbox"
                name="is_public"
                checked={form.is_public}
                onChange={handleChange}
              />
              Make this entry public
            </label>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button type="button" style={btnGhost} onClick={() => navigate(-1)}>
                Cancel
              </button>

              <button type="submit" style={btnPrimary}>
                {mode === "edit" ? "Save" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogEntryForm;
