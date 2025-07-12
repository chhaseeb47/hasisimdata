import React from 'react';
import { Palette } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export const ThemeSwitch: React.FC = () => {
  const { theme, switchTheme } = useTheme();

  return (
    <button
      onClick={switchTheme}
      className="fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      style={{
        backgroundColor: theme.primary,
        color: 'white'
      }}
      title={`Switch to next theme (Current: ${theme.name})`}
    >
      <Palette size={20} />
    </button>
  );
};