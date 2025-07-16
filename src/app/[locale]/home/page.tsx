import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function HomePage() {
  const t = useTranslations('home');
  
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/construction-hero.jpg"
            alt="Construction Site"
            fill
            className="object-cover opacity-20 dark:opacity-10"
            priority
          />
        </div>
        
        <div className="container relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            {t('welcome')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            {t('professionalServices')}
          </p>
          
          <div className="mt-10">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              {t('getQuote')}
            </a>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {t('ourServices')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t('construction.title'),
                description: t('construction.description'),
                icon: '🏗️',
              },
              {
                title: t('renovation.title'),
                description: t('renovation.description'),
                icon: '🔨',
              },
              {
                title: t('consulting.title'),
                description: t('consulting.description'),
                icon: '📋',
              },
            ].map((service, index) => (
              <div 
                key={index}
                className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t('readyToStart')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {t('contactUsToday')}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-primary transition-colors md:py-4 md:text-lg md:px-10"
          >
            {t('contactUs')}
          </a>
        </div>
      </section>
    </main>
  );
}
