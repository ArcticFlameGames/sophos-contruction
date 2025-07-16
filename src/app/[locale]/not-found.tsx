import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useNavigation } from '@/hooks/use-navigation';

export default function NotFound() {
  const t = useTranslations('errors');
  const { getCurrentLocale, createLocalizedUrl } = useNavigation();
  const locale = getCurrentLocale();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        <div className="text-6xl font-bold text-primary mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {t('pageNotFound')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {t('pageNotFoundMessage')}
        </p>
        <Link 
          href={createLocalizedUrl('/', locale)}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          {t('goBackHome')}
        </Link>
      </div>
    </div>
  );
}
