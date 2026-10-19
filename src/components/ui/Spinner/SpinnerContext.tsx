import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

import Spinner from '@/components/ui/Spinner/Spinner';
import { cn } from '@/lib/utils/utils';
import type { SpinnerContextValue } from './Spinner.types';
import { useTranslation } from 'react-i18next';
import type { ParseKeys } from 'i18next';

export const SprinnerContext = createContext<SpinnerContextValue | null>(null);

export function SpinnerProvider(props: { children: ReactNode }) {
  const { children } = props;

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageKey, setMessageKey] = useState<ParseKeys>('common.loading');

  const showLoading = useCallback((key: ParseKeys = 'common.loading') => {
    setMessageKey(key);
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
            'grid h-dvh w-full place-items-center p-4',
            'bg-white/30 backdrop-blur-[2px]'
          )}
        >
          <Spinner message={t(messageKey)} />
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
