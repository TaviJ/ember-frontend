import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { signIn } from "../../services/authService";

const SignInForm = () => {
  const navigate = useNavigate();
  const { handleSetUser } = useContext(UserContext);

  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const token = await signIn(formData);
      handleSetUser(token);

      navigate("/dashboard");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "48px 16px",
        background: `
          radial-gradient(circle at 20% 0%, rgba(255,180,90,0.28), transparent 45%),
          radial-gradient(circle at 80% 20%, rgba(255,120,60,0.18), transparent 40%),
          radial-gradient(circle at 50% 100%, rgba(120,70,30,0.35), transparent 55%),
          #070607
        `,
      }}
    >
      <div
        style={{
          width: "min(420px, 100%)",
          borderRadius: "18px",
          padding: "28px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
          backdropFilter: "blur(12px)",
          color: "white",
        }}
      >
        <h1 style={{ margin: "0 0 16px" }}>Sign In</h1>

        {message && (
          <p style={{ color: "#ffb4b4", margin: "0 0 12px" }}>{message}</p>
        )}

        <form autoComplete="off" onSubmit={handleSubmit}>
          <div style={{ marginBottom: "14px" }}>
            <label htmlFor="username" style={{ display: "block", marginBottom: "6px" }}>
              Username
            </label>
            <input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(0,0,0,0.4)",
                color: "white",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label htmlFor="password" style={{ display: "block", marginBottom: "6px" }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(0,0,0,0.4)",
                color: "white",
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                background: "linear-gradient(135deg, #ffc878, #ff8c50)",
                color: "#1b0e07",
              }}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "transparent",
                color: "white",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
