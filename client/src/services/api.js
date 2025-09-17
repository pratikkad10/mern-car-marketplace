import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true, // send cookies automatically
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const loginUser = (data) => api.post("/user/login", data);
export const signupUser = (data) => api.post("/user/signup", data);
export const getProfile = () => api.get("/user/profile");
export const logoutUser = () => api.post("/user/logout");

export const CreateCar = (data) => api.post("/cars/car", data);
export const getAllCars = () => api.get("/cars/");

export default api;
