
import React, { createContext, useState, useContext, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // First check display settings in localStorage
    const displaySettings = localStorage.getItem('displaySettings');
    if (displaySettings) {
      const { darkMode } = JSON.parse(displaySettings);
      return darkMode ? 'dark' : 'light';
    }
    
    // If no display settings, fall back to theme setting
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'dark'; // Default to dark theme
  });

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem('theme', theme);
    
    // Update document class for Tailwind dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Also update the darkMode in displaySettings if it exists
    const displaySettings = localStorage.getItem('displaySettings');
    if (displaySettings) {
      const settings = JSON.parse(displaySettings);
      settings.darkMode = theme === 'dark';
      localStorage.setItem('displaySettings', JSON.stringify(settings));
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
