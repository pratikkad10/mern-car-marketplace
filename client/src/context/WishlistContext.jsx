import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { addToWishlist, removeFromWishlist, getWishlist } from "../services/api";
import { toast } from "react-toastify";

export const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn && user) {
      fetchWishlist();
    } else {
      setWishlist([]);
      localStorage.removeItem("wishlist");
    }
  }, [isLoggedIn, user]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await getWishlist();
      setWishlist(response.data.wishlist || []);
      localStorage.setItem("wishlist", JSON.stringify(response.data.wishlist || []));
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      const localWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(localWishlist);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = async (car) => {
    if (!isLoggedIn) {
      toast.error("Please login to add to wishlist");
      return;
    }

    const isInWishlist = wishlist.some((item) => item._id === car._id);

    try {
      if (isInWishlist) {
        await removeFromWishlist(car._id);
        const updated = wishlist.filter((item) => item._id !== car._id);
        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(car._id);
        const updated = [...wishlist, car];
        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update wishlist");
    }
  };

  const isInWishlist = (carId) => {
    return wishlist.some((item) => item._id === carId);
  };

  const value = {
    wishlist,
    loading,
    toggleWishlist,
    isInWishlist,
    fetchWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
