import { FC, ReactNode, createContext, useState, useEffect } from "react";

type ThemeContextType = {
    isDarkMode: boolean;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<"light" | "dark">("light");

    const toggleTheme = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        document.body.className = `theme ${mode}`;
    }, [mode]);

    return (
        <ThemeContext.Provider value={{ toggleTheme, isDarkMode: mode === "dark"  }}>
            <div className={`theme ${mode}`}>{children}</div>
        </ThemeContext.Provider>
    )
};
