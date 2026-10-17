import { cn } from '@/lib/utils/utils';

import FormItem from './FormItem';
import type { FormProps, FormRule, FormSubmitEvent } from './Form.types';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useRef, useState } from 'react';
import { FormContext } from './FormContext';

function validateField(
  value: FormDataEntryValue | boolean | null | undefined,
  rules: FormRule[],
  t: TFunction
): string | undefined {
  const text = typeof value === 'string' ? value.trim() : '';

  for (const rule of rules) {
    if (rule.required && !text) {
      return rule.message ?? t('common.validation.field-required');
    }

    if (text && rule.min !== undefined && text.length < rule.min) {
      return rule.message ?? t('common.validation.minimum-char', { min: rule.min });
    }

    if (text && rule.max !== undefined && text.length > rule.max) {
      return rule.message ?? t('common.validation.maximum-char', { max: rule.max });
    }

    if (text && rule.pattern && !rule.pattern.test(text)) {
      return rule.message ?? t('common.validation.invalid-format');
    }
  }

  return undefined;
}

function Form<TValues extends object = Record<string, FormDataEntryValue>>(
  props: FormProps<TValues>
) {
  const { children, layout = 'vertical', initialValues, onSubmit, className, ...restProps } = props;

  const { t } = useTranslation();

  const fieldsRef = useRef(new Map<string, FormRule[]>());
  const [errors, setErrors] = useState<Record<string, string>>({});

  const registerField = useCallback((name: string, rules: FormRule[]) => {
    fieldsRef.current.set(name, rules);

    return () => {
      fieldsRef.current.delete(name);
    };
  }, []);

  const clearError = useCallback((name: string) => {
    setErrors((previous) => {
      if (!previous[name]) return previous;

      const next = { ...previous };
      delete next[name];

      return next;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      errors,
      registerField,
      clearError,
      initialValues: initialValues as Record<string, unknown> | undefined,
    }),
    [errors, registerField, clearError]
  );

  const handleSubmit = (event: FormSubmitEvent) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const values = Object.fromEntries(formData.entries()) as Record<string, unknown>;

    form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach((checkbox) => {
      if (!checkbox.name) return;

      values[checkbox.name] = checkbox.checked;
    });

    const nextErrors: Record<string, string> = {};

    for (const [name, rules] of fieldsRef.current) {
      const error = validateField(formData.get(name), rules, t);

      if (error) {
        nextErrors[name] = error;
      }
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit?.(values as TValues, event);
  };

  return (
    <FormContext.Provider value={contextValue}>
      <form
        {...restProps}
        noValidate
        onSubmit={handleSubmit}
        className={cn('w-full', layout === 'vertical' && 'space-y-4', className)}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

Form.Item = FormItem;

export default Form;
