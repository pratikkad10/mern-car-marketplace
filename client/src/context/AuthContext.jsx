import React, { createContext, useState, useEffect } from "react";
import getUser, { logoutUser } from "../services/api.js"; 
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await getUser();  
        setUser(currentUser);
      } catch (error) {
        setUser(null);
        console.error("Failed to fetch user:", error);
      }
    }
    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

 const logout = async () => {
  try {
    await logoutUser(); 
    localStorage.removeItem("token");  
    toast.success("User logged out!");
    setUser(null);  // Reset user state in React context
  } catch (error) {
    toast.error("Something went wrong!");
    console.error("Logout error:", error);
  }
};


  const value = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
