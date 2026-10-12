import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/i18n';
import '@/styles/global.css';
import { App } from './App';
import ToastProvider from './components/ui/Toast/ToastProvider';
import { SpinnerProvider } from './components/ui/Spinner/SpinnerContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <SpinnerProvider>
        <App />
      </SpinnerProvider>
    </ToastProvider>
  </StrictMode>
);
