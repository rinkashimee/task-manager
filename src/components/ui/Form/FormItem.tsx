import { cloneElement, useEffect, useId } from 'react';

import { cn } from '@/lib/utils/utils';

import Typography from '../Typography/Typography';

import type { FormItemProps } from './Form.types';
import { useFormContext } from './FormContext';
import TaskIcon from '@/components/icons/TaskIcon';

export default function FormItem(props: FormItemProps) {
  const {
    name,
    label,
    children,
    rules,
    help,
    className,
    layout = 'vertical',
    ...restProps
  } = props;

  const generatedId = useId();

  const fieldId = `${generatedId}-field`;
  const messageId = `${generatedId}-message`;

  const { errors, registerField, clearError, initialValues } = useFormContext();

  const initialValue = initialValues?.[name];

  const error = errors[name];
  const required = rules?.some((rule) => rule.required) ?? false;

  const isCheckbox = children.props.type === 'checkbox';

  useEffect(() => {
    return registerField(name, rules ?? []);
  }, [name, rules, registerField]);

  const field = cloneElement(children, {
    name,
    id: children.props.id ?? fieldId,
    ...(isCheckbox
      ? {
          defaultChecked:
            initialValue != null ? initialValue === true : children.props.defaultChecked,
        }
      : {
          defaultValue: initialValue != null ? String(initialValue) : children.props.defaultValue,
        }),

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
    <div
      {...restProps}
      className={cn(
        'flex gap-1.5',
        layout === 'horizontal' ? 'flex-row items-center gap-2' : 'flex-col',
        className
      )}
    >
      {layout === 'horizontal' ? (
        <>
          {field}

          {label && (
            <Typography
              as="label"
              htmlFor={field.props.id}
              variant="caption"
              className="text-text cursor-pointer font-sans leading-none font-medium"
            >
              {label}
              {required && <span className="text-danger ml-1">*</span>}
            </Typography>
          )}
        </>
      ) : (
        <>
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
        </>
      )}

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
