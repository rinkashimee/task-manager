import { cloneElement, useEffect, useId } from 'react';

import { cn } from '@/lib/utils/utils';

import Typography from '../Typography/Typography';

import type { FormItemProps } from './Form.types';
import { useFormContext } from './FormContext';
import TaskIcon from '@/components/icons/TaskIcon';

export default function FormItem(props: FormItemProps) {
  const { name, label, children, rules, help, className, ...restProps } = props;

  const generatedId = useId();

  const fieldId = `${generatedId}-field`;
  const messageId = `${generatedId}-message`;

  const { errors, registerField, clearError } = useFormContext();

  const error = errors[name];
  const required = rules?.some((rule) => rule.required) ?? false;

  useEffect(() => {
    return registerField(name, rules ?? []);
  }, [name, rules, registerField]);

  const field = cloneElement(children, {
    name,
    id: children.props.id ?? fieldId,
    error: Boolean(error),
    'aria-invalid': Boolean(error),
    'aria-describedby': error || help ? messageId : undefined,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      clearError(name);

      const originalOnChange = (
        children.props as {
          onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
        }
      ).onChange;

      originalOnChange?.(event);
    },
  });

  return (
    <div {...restProps} className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <Typography
          as="label"
          htmlFor={field.props.id}
          variant="caption"
          className="text-text font-sans font-medium"
        >
          {label}

          {required && <span className="text-danger ml-1">*</span>}
        </Typography>
      )}

      {field}

      {(error || help) && (
        <Typography
          as="p"
          id={messageId}
          variant="caption"
          className={cn(
            'flex items-center gap-1 truncate',
            error ? 'text-danger' : 'text-text-muted'
          )}
        >
          <TaskIcon size={14} icon="InfoIcon" />

          {error || help}
        </Typography>
      )}
    </div>
  );
}
