export default function EntryCard({ entry, showActions = false, onEdit, onDelete }) {
  return (
    <div style={styles.card}>
      <div style={styles.topRow}>
        <div>
          <div style={styles.date}>{entry.entry_date || "No date"}</div>
          <div style={styles.meta}>
            <span style={styles.badge}>Mood: {entry.mood}</span>
            <span style={styles.badge}>Activity: {entry.activity}</span>
            {entry.is_public !== undefined && (
              <span style={styles.badge}>{entry.is_public ? "Public" : "Private"}</span>
            )}
          </div>
        </div>

        {showActions && (
          <div style={styles.actions}>
            <button style={styles.btn} onClick={() => onEdit(entry)}>Edit</button>
            <button style={styles.btnDanger} onClick={() => onDelete(entry.id)}>Delete</button>
          </div>
        )}
      </div>

      {entry.note && <p style={styles.note}>{entry.note}</p>}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: 16,
    background: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    marginBottom: 12,
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start",
  },
  date: { fontWeight: 700, fontSize: 16, marginBottom: 8 },
  meta: { display: "flex", gap: 8, flexWrap: "wrap" },
  badge: {
    fontSize: 12,
    padding: "4px 8px",
    borderRadius: 999,
    background: "#3a3a3aff",
  },
  note: { marginTop: 12, marginBottom: 0, color: "#374151" },
  actions: { display: "flex", gap: 8 },
  btn: {
    border: "1px solid #d1d5db",
    background: "white",
    borderRadius: 10,
    padding: "8px 10px",
    cursor: "pointer",
  },
  btnDanger: {
    border: "1px solid #ef4444",
    background: "#ef4444",
    color: "white",
    borderRadius: 10,
    padding: "8px 10px",
    cursor: "pointer",
  },
};
