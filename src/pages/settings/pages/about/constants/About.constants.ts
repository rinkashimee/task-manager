import type { FeatureItemsTypes, InformationTypes } from '../types/About.types';

export const featureItems: FeatureItemsTypes[] = [
  {
    title: 'settings.about.features.organize',
    description: 'settings.about.features.organize-desc',
    icon: 'CheckSquareIcon',
  },
  {
    title: 'settings.about.features.manage-project',
    description: 'settings.about.features.manage-project-desc',
    icon: 'FolderIcon',
  },
  {
    title: 'settings.about.features.track-progress',
    description: 'settings.about.features.track-progress-desc',
    icon: 'ChartBarIcon',
  },
  {
    title: 'settings.about.features.personalize',
    description: 'settings.about.features.personalize-desc',
    icon: 'PaletteIcon',
  },
];

export const informationItems: InformationTypes[] = [
  { label: 'settings.about.information.version', value: 'settings.about.information.version-val' },
  {
    label: 'settings.about.information.platform',
    value: 'settings.about.information.platform-val',
  },
  {
    label: 'settings.about.information.developer',
    value: 'settings.about.information.developer-val',
  },
];
