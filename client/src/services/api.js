import axios from "axios";

const api = axios.create({
  baseURL: "https://car-marketplace-backend-6kpu.onrender.com/",
  withCredentials: true,
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

// Wishlist APIs
export const addToWishlist = (carId) => api.post("/wishlist/add", { carId });
export const removeFromWishlist = (carId) => api.delete(`/wishlist/remove/${carId}`);
export const getWishlist = () => api.get("/wishlist");

export default api;
