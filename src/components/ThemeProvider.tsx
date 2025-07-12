import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  gradient: string;
}

const themes: Theme[] = [
  {
    name: 'Blue',
    primary: '#3B82F6',
    secondary: '#1E40AF',
    accent: '#60A5FA',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Green',
    primary: '#10B981',
    secondary: '#059669',
    accent: '#34D399',
    background: '#F0FDF4',
    surface: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#D1FAE5',
    gradient: 'from-green-500 to-green-600'
  },
  {
    name: 'Purple',
    primary: '#8B5CF6',
    secondary: '#7C3AED',
    accent: '#A78BFA',
    background: '#FAF5FF',
    surface: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E9D5FF',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    name: 'Orange',
    primary: '#F97316',
    secondary: '#EA580C',
    accent: '#FB923C',
    background: '#FFF7ED',
    surface: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#FED7AA',
    gradient: 'from-orange-500 to-orange-600'
  },
  {
    name: 'Red',
    primary: '#EF4444',
    secondary: '#DC2626',
    accent: '#F87171',
    background: '#FEF2F2',
    surface: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#FECACA',
    gradient: 'from-red-500 to-red-600'
  }
];

interface ThemeContextType {
  theme: Theme;
  themeIndex: number;
  switchTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeIndex, setThemeIndex] = useState(0);

  const switchTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  const theme = themes[themeIndex];

  useEffect(() => {
    document.documentElement.style.setProperty('--theme-primary', theme.primary);
    document.documentElement.style.setProperty('--theme-secondary', theme.secondary);
    document.documentElement.style.setProperty('--theme-accent', theme.accent);
    document.documentElement.style.setProperty('--theme-background', theme.background);
    document.documentElement.style.setProperty('--theme-surface', theme.surface);
    document.documentElement.style.setProperty('--theme-text', theme.text);
    document.documentElement.style.setProperty('--theme-text-secondary', theme.textSecondary);
    document.documentElement.style.setProperty('--theme-border', theme.border);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeIndex, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};