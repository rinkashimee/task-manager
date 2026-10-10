import type { ElementType, HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';

export type TypographyVariant =
  'h1' | 'h2' | 'h3' | 'body-lg' | 'body' | 'body-sm' | 'label' | 'caption';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  children: ReactNode;
  className?: string;
  as?: ElementType;
  htmlFor?: LabelHTMLAttributes<HTMLLabelElement>['htmlFor'];
}
