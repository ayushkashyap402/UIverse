import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import "./Auth.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  // Extract token from URL hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.slice(1));
      const token = params.get("access_token");
      if (token) {
        setAccessToken(token);
      }
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const { error: err } = await supabase.auth.updateUser({
        password,
      });

      if (err) throw err;

      // Success - redirect to sign in
      navigate("/signin", {
        replace: true,
        state: { message: "Password reset successfully. Please sign in." },
      });
    } catch (err) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (!accessToken) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h2>Invalid link</h2>
          <p>This password reset link is invalid or expired.</p>
          <p>
            Please <a href="/forgot-password">request a new one</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={onSubmit}>
        <h2>Create new password</h2>
        {error && <div className="auth-error">{error}</div>}

        <label>
          New password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </label>

        <label>
          Confirm password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />
        </label>

        <button className="auth-submit" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Reset password"}
        </button>
      </form>
    </div>
  );
}
