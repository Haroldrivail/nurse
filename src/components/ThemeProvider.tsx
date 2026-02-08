"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { ToastContainer } from "react-toastify";
import { ThemeContext } from "../contexts/ThemeContext";

const THEME_KEY = "theme";
const DEFAULT_THEME = "prefers-color-scheme";

let listeners: Array<() => void> = [];
function subscribe(cb: () => void) {
  listeners = [...listeners, cb];
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}
function getSnapshot() {
  return localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
}
function getServerSnapshot() {
  return DEFAULT_THEME;
}
function emitChange() {
  for (const l of listeners) l();
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback((next: string) => {
    localStorage.setItem(THEME_KEY, next);
    emitChange();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme={theme === "dark" ? "dark" : "light"}
      />
    </ThemeContext.Provider>
  );
};
