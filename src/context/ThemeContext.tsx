import React, { createContext, useContext, useEffect } from 'react';

type Theme = 'light';

interface ThemeContextType {
    theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Enforce light mode only - dark mode is disabled
    const theme: Theme = 'light';

    useEffect(() => {
        const root = document.documentElement;
        // Always remove dark class to enforce light mode
        root.classList.remove('dark');
        // Set light mode in localStorage
        localStorage.setItem('siera_theme', 'light');
    }, []);

    return (
        <ThemeContext.Provider value={{ theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
