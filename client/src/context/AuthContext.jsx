import React, { createContext, useState, useEffect } from "react";
import { getProfile, loginUser, logoutUser } from "../services/api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate(); 

  // Load user on mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          return;
        }

        const res = await getProfile();
        setUser(res.data.user); 
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
        localStorage.removeItem("token"); 
      } finally {
        setLoading(false); 
      }
    }

    fetchUser();
  }, []);

  const login = async (values) => {
    try {
      setLoading(true)
      const res = await loginUser({
        email: values.username,
        password: values.password,
      });

      const { token, user: loggedInUser } = res.data;

      localStorage.setItem("token", token);
      setUser(loggedInUser);

      toast.success(`Welcome, ${loggedInUser.fullName}`);
      console.log("Login response:", res.data);

      navigate("/user/dashboard"); 
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
        setLoading(false); 
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true)
      await logoutUser();
      localStorage.removeItem("token");
      setUser(null);
      toast.success("User logged out!");
      navigate("/user/login"); 
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong while logging out!");
    } finally{
      setLoading(false)
    }
  };

  const value = {
     user,
    isLoggedIn: !!user,
    loading, // expose loading state
    login,
    logout,
    setLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
