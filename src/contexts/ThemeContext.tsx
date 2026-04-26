import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
    theme: Theme;
    overridden: boolean;
    toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'cb-theme';
const DEFAULT_THEME: Theme = 'light';

const readStored = (): Theme | null => {
    if (typeof window === 'undefined') return null;
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [stored, setStored] = useState<Theme | null>(readStored);

    const theme: Theme = stored ?? DEFAULT_THEME;
    const overridden = stored !== null;

    useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);

    const toggle = () => {
        setStored(prev => {
            const next: Theme = (prev ?? DEFAULT_THEME) === 'dark' ? 'light' : 'dark';
            window.localStorage.setItem(STORAGE_KEY, next);
            return next;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, overridden, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextValue => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
};
