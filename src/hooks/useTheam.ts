import { useCallback, useEffect, useState } from "react";


type Theme = "light" | "dark";
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme")as Theme) || "light";
    setTheme(savedTheme);

    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, [])

  const toggleTheme = useCallback(() => {
    const newTheme :Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    document.documentElement.classList.toggle("dark", newTheme === "dark");

    localStorage.setItem("theme", newTheme);

  }, [theme]);

  return {theme, toggleTheme}
};


