import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function NavBar() {
  const { user, handleSignOut } = useContext(UserContext);
  const navigate = useNavigate();

  const onSignOut = () => {
    handleSignOut();
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.brand}>Ember</Link>
      </div>

      <div style={styles.right}>
        <Link to="/public" style={styles.link}>Public</Link>


        {user ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/log-entries/new" style={styles.link}>New</Link>
            <button style={styles.btn} onClick={onSignOut}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/sign-in" style={styles.link}>Sign In</Link>
            <Link to="/sign-up" style={styles.btn}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 18px",
    borderBottom: "1px solid #e5e7eb",
    background: "white",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  brand: {
    fontWeight: 800,
    textDecoration: "none",
    color: "#111827",
    fontSize: 18,
  },
  left: { display: "flex", gap: 12, alignItems: "center" },
  right: { display: "flex", gap: 12, alignItems: "center" },
  link: { textDecoration: "none", color: "#111827" },
  btn: {
    border: "1px solid #111827",
    background: "#111827",
    color: "white",
    borderRadius: 10,
    padding: "8px 12px",
    cursor: "pointer",
    textDecoration: "none",
  },
};
