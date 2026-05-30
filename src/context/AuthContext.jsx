import React, { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/authService";
import { supabase } from "../services/supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Subscribe to Supabase auth state changes on mount
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || "User",
          email_confirmed_at: session.user.email_confirmed_at,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const signUp = async ({ name, email, password }) => {
    const newUser = await authService.register({ name, email, password });
    setUser(newUser);
    return newUser;
  };

  const signIn = async ({ email, password }) => {
    const existing = await authService.login({ email, password });
    setUser(existing);
    return existing;
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
  };

  const resetPassword = async (email) => {
    return await authService.resetPasswordForEmail(email);
  };

  const updatePassword = async (password) => {
    return await authService.updatePassword(password);
  };

  const updateProfile = async ({ name }) => {
    await authService.updateUserProfile({ name });
    setUser((prev) => (prev ? { ...prev, name } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
        updateProfile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
