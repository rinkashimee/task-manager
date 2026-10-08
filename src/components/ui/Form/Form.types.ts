import type {
  ChangeEvent,
  FormHTMLAttributes,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  SyntheticEvent,
} from 'react';

export type FormLayout = 'vertical' | 'horizontal';

export interface FormRule {
  required?: boolean;
  min?: number;
  max?: number;
  message?: string;
}

export type FormSubmitEvent = SyntheticEvent<HTMLFormElement, SubmitEvent>;

export interface FormProps<
  TValues extends object = Record<string, FormDataEntryValue>,
> extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  layout?: FormLayout;
  onSubmit?: (values: TValues, event: FormSubmitEvent) => void;
}

export interface FormFieldProps {
  name?: string;
  id?: string;
  error?: boolean;
  required?: boolean;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface FormItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  name: string;
  label?: ReactNode;
  children: ReactElement<FormFieldProps>;
  rules?: FormRule[];
  help?: string;
}

export interface FormContextValue {
  errors: Record<string, string>;
  registerField: (name: string, rules: FormRule[]) => () => void;
  clearError: (name: string) => void;
}
