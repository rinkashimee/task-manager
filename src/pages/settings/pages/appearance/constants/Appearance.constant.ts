import type { DropdownOption } from '@/components/ui/Dropdown/Dropdown.types';
import type { ThemeOptionsType } from '../types/Appearance.types';

export const themes: ThemeOptionsType[] = [
  {
    value: 'light',
    label: 'settings.appearance.option.light',
    description: 'settings.appearance.option.light-desc',
    icon: 'SunIcon',
  },
  {
    value: 'dark',
    label: 'settings.appearance.option.dark',
    description: 'settings.appearance.option.dark-desc',
    icon: 'MoonIcon',
  },
];

export const languageOptions: DropdownOption[] = [
  { labels: 'common.language-dropdown.en', value: 'en' },
  { labels: 'common.language-dropdown.fil', value: 'fil' },
  { labels: 'common.language-dropdown.ja', value: 'ja' },
];
