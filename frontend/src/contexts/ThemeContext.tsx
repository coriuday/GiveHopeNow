"use client"

import { createContext, useState, useContext, useEffect, ReactNode } from "react"

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.body.classList.add("dark-mode");
    }
  }, [])

  const toggleTheme = (): void => {
    setIsDarkMode((prev) => {
      const newMode = !prev
      localStorage.setItem("theme", newMode ? "dark" : "light")

      if (newMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }

      return newMode
    })
  }

  return <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>
} 