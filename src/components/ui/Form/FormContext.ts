import { createContext, useContext } from 'react';
import type { FormContextValue } from './Form.types';

export const FormContext = createContext<FormContextValue | null>(null);

export function useFormContext() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('Form.Item must be used inside Form');
  }

  return context;
}
