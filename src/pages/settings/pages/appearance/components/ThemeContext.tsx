import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { ThemeOptionsType } from '../types/Appearance.types';

type ThemeType = ThemeOptionsType['value'];

interface ThemeContextType {
  selectedTheme: ThemeType;
  setSelectedTheme: (theme: ThemeType) => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider(props: { children: ReactNode }) {
  const { children } = props;

  const [selectedTheme, setSelectedTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('theme');

    return savedTheme === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', selectedTheme === 'dark');

    localStorage.setItem('theme', selectedTheme);
  }, [selectedTheme]);

  return (
    <ThemeContext.Provider value={{ selectedTheme, setSelectedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}
