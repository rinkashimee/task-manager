import TaskIcon, { type IconType } from '@/components/icons/TaskIcon';
import Typography from '@/components/ui/Typography/Typography';
import type { ParseKeys } from 'i18next';
import { useTranslation } from 'react-i18next';

interface AboutFeatureItemProps {
  title: ParseKeys;
  description: ParseKeys;
  icon: IconType;
}

export default function AboutFeatureItem(props: AboutFeatureItemProps) {
  const { title, description, icon } = props;

  const { t } = useTranslation();

  return (
    <div className="flex items-start gap-3">
      <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
        <TaskIcon icon={icon} size={20} className="text-primary" />
      </div>

      <div className="flex flex-col gap-1">
        <Typography variant="caption" className="text-text font-semibold">
          {t(title)}
        </Typography>

        <Typography variant="caption" className="text-text-muted">
          {t(description)}
        </Typography>
      </div>
    </div>
  );
}
