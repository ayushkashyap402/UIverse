import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const { user, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h3>Not signed in</h3>
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await updateProfile({ name });
      setSuccess(true);
      setEditMode(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>Your Profile</h2>

        {error && <div className="profile-error">{error}</div>}
        {success && <div className="profile-success">✅ Profile updated</div>}

        {!editMode ? (
          <div className="profile-view">
            <div className="profile-field">
              <label>Name</label>
              <p>{user.name}</p>
            </div>

            <div className="profile-field">
              <label>Email</label>
              <p>{user.email}</p>
            </div>

            {user.email_confirmed_at && (
              <div className="profile-field">
                <label>Email Status</label>
                <p>✅ Verified</p>
              </div>
            )}

            <div className="profile-field">
              <label>User ID</label>
              <p style={{ fontSize: "12px", color: "#666" }}>{user.id}</p>
            </div>

            <div className="profile-actions">
              <button className="btn-edit" onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
              <button className="btn-danger" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <form className="profile-edit" onSubmit={handleUpdateProfile}>
            <div className="profile-field">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="profile-field">
              <label>Email</label>
              <input type="email" value={user.email} disabled />
              <small>Email cannot be changed here</small>
            </div>

            <div className="profile-actions">
              <button className="btn-primary" type="submit">
                Save Changes
              </button>
              <button
                className="btn-secondary"
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setName(user.name);
                  setError(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
