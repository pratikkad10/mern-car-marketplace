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
export const resetPassword = (data) => api.post("/user/reset-password", data);

export const CreateCar = (data) => api.post("/cars/car", data);
export const getAllCars = () => api.get("/cars/");
export const deleteCar = (data)=> api.delete('/cars/car',{ data});

export const createTestDrive = (data) => api.post("/cars/test-drive", data);
export const getTestDrives = () => api.get("/cars/test-drive");
export const getAllTestDrives = () => api.get("/cars/allTestDrive");
export const createIntrestedUser = (data) => api.post("/cars/interestedUser", data);
export const getIntrestedUser = () => api.get("/cars/interestedUser");


export default api;
