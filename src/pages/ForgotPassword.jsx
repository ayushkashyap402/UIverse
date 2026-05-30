import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import "./Auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (err) throw err;

      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err.message || "Failed to send reset email");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={onSubmit}>
        <h2>Reset password</h2>
        {error && <div className="auth-error">{error}</div>}
        {success && (
          <div className="auth-success">
            ✅ Check your email for a password reset link
          </div>
        )}

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={success}
          />
        </label>

        <button className="auth-submit" type="submit" disabled={success}>
          {success ? "Email sent!" : "Send reset link"}
        </button>

        <div className="auth-footer">
          Remember your password? <Link to="/signin">Sign in</Link>
        </div>
      </form>
    </div>
  );
}
