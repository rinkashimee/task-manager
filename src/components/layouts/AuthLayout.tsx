import { cn } from '@/lib/utils/utils';
import AuthBranding from '@/pages/auth/components/AuthBranding';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="bg-background relative isolate flex min-h-screen items-center justify-center p-0 lg:p-6">
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
        <div
          className={cn(
            'bg-primary/15 absolute -top-32 -left-32',
            'h-[500px] w-[500px] rounded-full blur-[150px]'
          )}
        />

        <div
          className={cn(
            'bg-primary/10 absolute -right-32 -bottom-32',
            'h-[500px] w-[500px] rounded-full blur-[150px]'
          )}
        />
      </div>

      <div
        className={cn(
          'border-border bg-card relative z-10 grid min-h-screen w-full overflow-hidden',
          'lg:min-h-[580px] lg:max-w-5xl lg:grid-cols-2 lg:rounded-xl lg:border lg:shadow-2xl'
        )}
      >
        <AuthBranding />

        <main className="bg-card flex items-center justify-center px-6 py-12 sm:px-10 lg:px-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
