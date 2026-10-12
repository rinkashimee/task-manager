import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

import Spinner from '@/components/ui/Spinner/Spinner';
import { cn } from '@/lib/utils/utils';
import type { SpinnerContextValue } from './Spinner.types';
import { useTranslation } from 'react-i18next';

export const SprinnerContext = createContext<SpinnerContextValue | null>(null);

export function SpinnerProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  const loading = t('common.loading');

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(loading);

  const showLoading = useCallback((message = loading) => {
    setMessage(message);
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <SprinnerContext.Provider value={{ showLoading, hideLoading }}>
      {children}

      {isLoading && (
        <div
          className={cn(
            'fixed inset-0 z-[9999]',
            'grid h-dvh w-screen place-items-center',
            'bg-white/30 backdrop-blur-[2px]'
          )}
        >
          <Spinner message={message} />
        </div>
      )}
    </SprinnerContext.Provider>
  );
}

export function useSpinner() {
  const context = useContext(SprinnerContext);

  if (!context) {
    throw new Error('useSpinner must be used inside SpinnerProvider');
  }

  return context;
}
