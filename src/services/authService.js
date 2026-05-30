// Supabase Authentication Service
// Uses Supabase Auth for secure sign up and sign in

import { supabase } from "./supabaseClient";

export async function register({ name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error) throw error;

  // Create user profile
  if (data.user?.id) {
    try {
      await supabase
        .from("profiles")
        .insert([{ id: data.user.id, name, email }]);
    } catch (err) {
      console.warn(
        "Profile creation failed (table may not exist yet):",
        err.message,
      );
    }
  }

  // Return user info
  return {
    id: data.user?.id,
    email: data.user?.email,
    name: data.user?.user_metadata?.name || name,
  };
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Return user info
  return {
    id: data.user?.id,
    email: data.user?.email,
    name: data.user?.user_metadata?.name || "User",
  };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;

  if (data.user) {
    return {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.name || "User",
    };
  }
  return null;
}

export async function resetPasswordForEmail(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
}

export async function updatePassword(password) {
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
}

export async function updateUserProfile({ name }) {
  const { error } = await supabase.auth.updateUser({
    data: { name },
  });
  if (error) throw error;

  // Also update profiles table if it exists
  try {
    const user = await getCurrentUser();
    if (user?.id) {
      await supabase.from("profiles").update({ name }).eq("id", user.id);
    }
  } catch (err) {
    console.warn("Profile update failed:", err.message);
  }
}

export async function getUserProfile() {
  try {
    const user = await getCurrentUser();
    if (!user?.id) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.warn("Failed to fetch profile:", err.message);
    return null;
  }
}
