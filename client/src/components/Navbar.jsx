import React, { useContext, useEffect, useState } from "react";
import { LogOut, User, User2, Menu, X, Sun, Moon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  return (
    <nav className={`fixed top-0 w-full z-10 border-b transition-shadow ${scrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-background/60 backdrop-blur"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img src="/src/assets/logo.png" alt="AutoMarket" className="w-10 h-10 rounded-full object-cover" />
          <span className="[font-family:var(--font-logo)] text-gray-800 dark:text-white/90 text-xl">
            AutoMarket
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 font-medium items-center">
          <NavLink to="/" className={({isActive}) => `transition hover:text-blue-500 ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`}>
            Home
          </NavLink>
          <NavLink to="/cars/buy" className={({isActive}) => `transition hover:text-blue-500 ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`}>
            Buy Car
          </NavLink>
          <NavLink to="/car/sell" className={({isActive}) => `transition hover:text-blue-500 ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`}>
            Sell Car
          </NavLink>
          <NavLink to="/about" className={({isActive}) => `transition hover:text-blue-500 ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`}>
            About
          </NavLink>
          <NavLink to="/contact" className={({isActive}) => `transition hover:text-blue-500 ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`}>
            Contact
          </NavLink>
        </div>

        {/* User/Profile Section */}
        <div className="hidden md:flex gap-4 items-center">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md hover:bg-muted transition"
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          {isLoggedIn ? (
            <NavLink
              to="/user/profile"
              className="flex items-center gap-2 hover:text-red-700 transition"
            >
              <User2 />
              <span>{user?.fullName || "Profile"}</span>
            </NavLink>
          ) : (
            <NavLink
              to="/user/login"
              className="flex items-center gap-1 px-4 py-1 rounded-full hover:text-blue-600 transition"
            >
              <User /> Sign In
            </NavLink>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center gap-2">
          {/* Theme Toggle (mobile) */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md hover:bg-muted transition"
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-gray-200 transition"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-background shadow-inner border-t">
          <div className="flex flex-col px-4 py-4 gap-4">
            <NavLink
              to="/"
              className="hover:text-blue-500 transition"
              onClick={toggleMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/cars/buy"
              className="hover:text-blue-500 transition"
              onClick={toggleMenu}
            >
              Buy Car
            </NavLink>
            <NavLink
              to="/car/sell"
              className="hover:text-blue-500 transition"
              onClick={toggleMenu}
            >
              Sell Car
            </NavLink>
            <NavLink
              to="/about"
              className="hover:text-blue-500 transition"
              onClick={toggleMenu}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="hover:text-blue-500 transition"
              onClick={toggleMenu}
            >
              Contact
            </NavLink>

            {/* User Section Mobile */}
            {isLoggedIn ? (
              <NavLink
                to="/user/profile"
                className="flex items-center gap-2 hover:text-red-700 transition"
                onClick={toggleMenu}
              >
                <User2 />
                <span>{user?.fullName || "Profile"}</span>
              </NavLink>
            ) : (
              <NavLink
                to="/user/login"
                className="flex items-center gap-1 px-4 py-1 rounded-full hover:text-blue-600 transition"
                onClick={toggleMenu}
              >
                <User /> Sign In
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
