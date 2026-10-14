import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/i18n';
import '@/styles/global.css';
import { App } from './App';
import ToastProvider from './components/ui/Toast/ToastProvider';
import { SpinnerProvider } from './components/ui/Spinner/SpinnerContext';
import { ThemeProvider } from './pages/settings/pages/appearance/components/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <SpinnerProvider>
          <App />
        </SpinnerProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>
);
