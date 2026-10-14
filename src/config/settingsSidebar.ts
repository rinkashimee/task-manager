import type { SettingsNavItem } from '@/components/layouts/sidebar/settings-sidebar/SettingsSidebar.types';

export const settingsNavItems: SettingsNavItem[] = [
  {
    labelKey: 'sidebar.settings-sidebar.account',
    icon: 'UserIcon',
    path: '/settings/account',
    description: 'sidebar.settings-sidebar.account-desc',
  },
  {
    labelKey: 'sidebar.settings-sidebar.appearance',
    icon: 'PaletteIcon',
    path: '/settings/appearance',
    description: 'sidebar.settings-sidebar.appearance-desc',
  },
  {
    labelKey: 'sidebar.settings-sidebar.about',
    icon: 'InfoIcon',
    path: '/settings/about',
    description: 'sidebar.settings-sidebar.about-desc',
  },
];
