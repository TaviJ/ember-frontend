import { Link } from "react-router-dom";
import candleBg from "../../assets/candle_cinematic_embers.gif";

export default function Landing() {
  return (
    <main style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginTop: 0 }}>Ember</h1>
      <h2 style={{  color: "#ffdfa9a6" }}>
        Small moments that add up 
      </h2>
      <p style={{ color: "#6b7280", marginTop: 8 }}>
        Track your mood, activities, and reflections — privately or publicly.
      </p>

      <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
        <Link
          to="/sign-in"
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #111",
            textDecoration: "none",
            color: "#111",
            background: "white",
          }}
        >
          Sign In
        </Link>

        <Link
          to="/sign-up"
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #111",
            textDecoration: "none",
            color: "white",
            background: "#111",
          }}
        >
          Sign Up
        </Link>

        <Link
          to="/public"
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #111",
            textDecoration: "none",
            color: "#111",
            background: "white",
          }}
        >
          View Public Feed
        </Link>
      </div>

      <div
        style={{
          marginTop: 40,
          padding: 12,
          borderRadius: 12,
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <img
          src={candleBg}
          alt="Candle background"
          style={{
            width: "100%",
            borderRadius: 12,
            filter: "brightness(0.8)",
          }}
        />
      </div>
    </main>
  );
}
