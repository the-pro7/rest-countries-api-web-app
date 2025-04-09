import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

export default function MainLayout() {
  // State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Safe localStorage read, only in browser
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  // Sync `dark` class on <html> whenever darkMode changes
  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const storedTheme = localStorage.getItem("theme");

    const isDark = storedTheme === "dark" || (!storedTheme && prefersDark);

    setDarkMode(isDark); // update state
    root.classList.toggle("dark", isDark);
  }, []);

  // When darkMode state changes
  useEffect(() => {
    const root = document.documentElement;
    // Toggle dark class on <html> when based on darkMode state
    root.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // const LIMIT = 12;
  // End State

  return (
    <div>
      <header>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      </header>
      <Outlet />
    </div>
  );
}
