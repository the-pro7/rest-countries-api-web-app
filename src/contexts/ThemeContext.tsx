import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { log } from "../../helpers/helpers";

interface ThemeContextProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextProps>({
  darkMode: true,
  setDarkMode: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Safe localStorage read, only in browser
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  log("From context",darkMode)

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

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
