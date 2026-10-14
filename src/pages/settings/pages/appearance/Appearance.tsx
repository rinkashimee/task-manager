import { useTranslation } from 'react-i18next';
import Typography from '@/components/ui/Typography/Typography';
import type { AppearanceSettingsProps } from './types/Appearance.types';
import { languageOptions, themes } from './constants/Appearance.constant';
import SettingsCard from '@/components/ui/Cards/SettingsCard';
import ThemeOption from './components/ThemeOption';
import ThemePreview from './components/ThemePreview';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import useTheme from './components/ThemeContext';

export default function Appearance(props: AppearanceSettingsProps) {
  const { variant = 'full' } = props;

  const { i18n, t } = useTranslation();
  const { selectedTheme, setSelectedTheme } = useTheme();

  const isFull = variant === 'full';

  const handleLanguageChange = (language: string) => {
    void i18n.changeLanguage(language);
  };

  return (
    <SettingsCard
      title={t('settings.appearance.title')}
      caption={t('settings.appearance.desc')}
      className="flex w-full flex-1 flex-col"
    >
      {isFull && <div className="border-border mb-5 border-t" />}

      <div>
        <div className="flex flex-1 flex-col gap-1">
          <Typography variant="caption" className="text-text font-semibold">
            {t('settings.appearance.theme')}
          </Typography>

          {isFull && (
            <Typography variant="caption" className="text-text-muted">
              {t('settings.appearance.theme-desc')}
            </Typography>
          )}
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {themes.map((item) => {
            return (
              <ThemeOption
                key={item.value}
                item={item}
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
              />
            );
          })}
        </div>
      </div>

      {isFull && <ThemePreview selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} />}

      <div className="border-border mt-5 border-t pt-4">
        <div className="flex flex-1 flex-col gap-1">
          <Typography variant="caption" className="text-text font-semibold">
            {t('settings.appearance.language')}
          </Typography>

          {isFull && (
            <Typography variant="caption" className="text-text-muted">
              {t('settings.appearance.language-desc')}
            </Typography>
          )}
        </div>

        <div className="relative mt-3 max-w-sm">
          <Dropdown
            value={i18n.resolvedLanguage ?? i18n.language}
            onChange={handleLanguageChange}
            icon="GlobeIcon"
            options={languageOptions}
          />
        </div>
      </div>
    </SettingsCard>
  );
}
