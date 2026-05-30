import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Auth.css";

export default function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signUp(form);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to sign up");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={onSubmit}>
        <h2>Create account</h2>
        {error && <div className="auth-error">{error}</div>}

        <label>
          Name
          <input name="name" value={form.name} onChange={onChange} required />
        </label>

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
          Sign up
        </button>

        <div className="auth-footer">
          Already have an account? <Link to="/signin">Sign in</Link>
        </div>
      </form>
    </div>
  );
}
