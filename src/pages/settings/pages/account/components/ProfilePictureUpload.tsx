import TaskIcon from '@/components/icons/TaskIcon';
import Button from '@/components/ui/Button/Button';
import Typography from '@/components/ui/Typography/Typography';
import { cn } from '@/lib/utils/utils';
import type { RefObject } from 'react';
import { useTranslation } from 'react-i18next';

interface ProfilePictureUploadProps {
  avatar: string | null;
  name: string | undefined;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onRemove: () => Promise<void>;
  isUploading: boolean;
  isDeleting: boolean;
}

export default function ProfilePictureUpload(props: ProfilePictureUploadProps) {
  const { avatar, fileInputRef, name, onRemove, isUploading, isDeleting } = props;

  const { t } = useTranslation();

  const initial = name?.charAt(0)?.toUpperCase();
  const isProcessing = isUploading || isDeleting;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative h-20 w-20 shrink-0">
        <div
          className={cn(
            'bg-primary flex h-20 w-20 cursor-default items-center justify-center',
            'overflow-hidden rounded-full',
            'ring-canvas ring-1'
          )}
        >
          {avatar ? (
            <img src={avatar} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <Typography variant="h3" className="text-text-inverse">
              {initial}
            </Typography>
          )}
        </div>

        <Button
          type="button"
          variant="ghost"
          disabled={isProcessing}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'bg-card border-border text-primary',
            'absolute right-0 bottom-0',
            'flex h-7 w-7 items-center justify-center',
            'rounded-full border p-0 shadow-sm'
          )}
          aria-label={t('settings.account-setting.change-pic')}
        >
          <TaskIcon icon="CameraIcon" size={14} />
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <Typography variant="body-sm" className="text-text font-semibold">
            {t('settings.account-setting.change-pic')}
          </Typography>

          <Typography variant="caption" className="text-text-muted">
            {t('settings.account-setting.recommended')}
          </Typography>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            disabled={isProcessing}
            onClick={() => fileInputRef.current?.click()}
            className="bg-card text-primary border-primary hover:bg-primary/10 h-8 gap-1 border px-2.5"
          >
            <TaskIcon icon="UploadIcon" size={14} weight="bold" />

            <Typography as="p" variant="caption" className="truncate font-semibold">
              {t('common.upload-image')}
            </Typography>
          </Button>

          <Button
            type="button"
            variant="secondary"
            disabled={!avatar || isProcessing}
            onClick={onRemove}
            className="bg-card text-text-muted border-border hover:bg-background h-8 gap-1 border px-2.5"
          >
            <TaskIcon icon="TrashIcon" size={14} weight="bold" />

            <Typography as="p" variant="caption" className="truncate font-semibold">
              {t('common.remove')}
            </Typography>
          </Button>
        </div>

        <Typography variant="caption" className="text-text-muted">
          {t('settings.account-setting.pic-type')}
        </Typography>
      </div>
    </div>
  );
}
