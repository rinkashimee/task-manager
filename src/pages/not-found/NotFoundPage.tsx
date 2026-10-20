import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button/Button';
import Typography from '@/components/ui/Typography/Typography';
import { tokenManager } from '@/pages/auth/services/tokenManager';
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = Boolean(tokenManager.getToken());

  const homePath = isAuthenticated ? '/dashboard' : '/login';

  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
      <div className="bg-primary/10 pointer-events-none absolute h-[280px] w-[280px] rounded-full blur-[110px] sm:h-[380px] sm:w-[380px]" />

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center text-center">
        <Typography
          as="h1"
          variant="h1"
          className="text-primary !text-[100px] !leading-none !font-bold tracking-tight sm:!text-[140px]"
        >
          {t('common.not-found-page.404')}
        </Typography>

        <div className="mt-5 flex flex-col items-center gap-3">
          <Typography as="h2" variant="h2" className="text-text !text-2xl !font-semibold">
            {t('common.not-found-page.not-found')}
          </Typography>

          <Typography as="p" variant="label" className="text-text-muted max-w-sm leading-relaxed">
            {t('common.not-found-page.desc')}
          </Typography>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to={homePath}>
            <Button type="button" variant="primary" className="h-10 gap-2 px-5">
              <Typography as="span" variant="caption" className="font-semibold">
                {isAuthenticated
                  ? t('common.not-found-page.go-dashboard')
                  : t('common.not-found-page.go-login')}
              </Typography>
            </Button>
          </Link>

          <Button
            type="button"
            variant="secondary"
            className="h-10 gap-2 px-5"
            onClick={() => navigate(-1)}
          >
            <Typography as="span" variant="caption" className="font-semibold">
              {t('common.not-found-page.go-back')}
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}
