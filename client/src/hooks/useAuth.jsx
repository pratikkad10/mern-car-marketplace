import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext);
}