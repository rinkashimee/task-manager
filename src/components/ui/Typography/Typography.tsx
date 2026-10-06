import type { ElementType, ReactNode } from 'react';

export type TypographyVariant =
  'h1' | 'h2' | 'h3' | 'body-lg' | 'body' | 'body-sm' | 'label' | 'caption';

interface TypographyProps {
  variant?: TypographyVariant;
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'font-heading text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight',

  h2: 'font-heading text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight',

  h3: 'text-lg md:text-xl lg:text-2xl font-semibold',

  'body-lg': 'text-base md:text-lg lg:text-xl font-semibold',

  body: 'font-sans text-sm md:text-base font-normal',

  'body-sm': 'text-xs md:text-sm font-normal',

  label: 'font-sans text-sm font-medium',

  caption: 'text-xs font-normal',
};

const defaultElements: Record<TypographyVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  'body-lg': 'p',
  body: 'p',
  'body-sm': 'p',
  label: 'span',
  caption: 'span',
};

export default function Typography(props: TypographyProps) {
  const { variant = 'body', children, className = '', as } = props;

  const Component = as ?? defaultElements[variant];

  return <Component className={`${variantStyles[variant]} ${className}`}>{children}</Component>;
}
