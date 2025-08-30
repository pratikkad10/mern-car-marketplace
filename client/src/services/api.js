import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true, // send cookies automatically
});

export const loginUser = (data) => api.post("/user/login", data);
export const signupUser = (data) => api.post("/user/signup", data);
export const getProfile = () => api.get("/user/profile");
export async function logoutUser() {
  const res = await fetch('http://localhost:8000/user/logout', {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Logout failed');
  }
  return res.json();
}

export default api;
