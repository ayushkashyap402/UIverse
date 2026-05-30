import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Auth.css";

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signIn(form);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to sign in");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={onSubmit}>
        <h2>Sign in</h2>
        {error && <div className="auth-error">{error}</div>}

        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
          />
        </label>

        <button className="auth-submit" type="submit">
          Sign in
        </button>

        <div
          style={{ marginTop: "8px", fontSize: "12px", textAlign: "center" }}
        >
          <Link to="/forgot-password">Forgot password?</Link>
        </div>

        <div className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
