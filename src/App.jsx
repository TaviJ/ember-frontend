import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import PublicFeed from "./components/PublicFeed/PublicFeed";
import Dashboard from "./components/Dashboard/Dashboard";
import LogEntryForm from "./components/EntryForm/EntryForm";

import { UserContext } from "./contexts/UserContext";

export default function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />

      <Routes>
        {/* Landing page (home) */}
        <Route path="/" element={<Landing />} />

        {/* Public feed */}
        <Route path="/public" element={<PublicFeed />} />

        {/* Auth */}
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />

        {/* Authed */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/log-entries/new"
          element={user ? <LogEntryForm mode="new" /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/log-entries/:entryId/edit"
          element={user ? <LogEntryForm mode="edit" /> : <Navigate to="/dashboard" replace />}
        />
      </Routes>
    </>
  );
}
