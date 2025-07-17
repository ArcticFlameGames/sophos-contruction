import { useTranslations } from 'next-intl';

export default function TestPage() {
  const t = useTranslations('test');
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">i18n Test Page</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Translation Test</h2>
        
        <div className="space-y-4">
          <div className="p-4 border rounded">
            <h3 className="font-medium mb-2">Basic Translation:</h3>
            <p>{t('welcome')}</p>
          </div>
          
          <div className="p-4 border rounded">
            <h3 className="font-medium mb-2">With Variables:</h3>
            <p>{t('greeting', { name: 'John' })}</p>
          </div>
          
          <div className="p-4 border rounded">
            <h3 className="font-medium mb-2">Pluralization:</h3>
            <p>{t('messages', { count: 1 })}</p>
            <p>{t('messages', { count: 5 })}</p>
          </div>
          
          <div className="p-4 border rounded">
            <h3 className="font-medium mb-2">Date Formatting:</h3>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="p-4 border rounded">
            <h3 className="font-medium mb-2">Number Formatting:</h3>
            <p>{1234.56.toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Test Links</h2>
        <div className="space-x-4">
          <a href="/en/test" className="text-blue-600 hover:underline">English Version</a>
          <span>|</span>
          <a href="/fr/test" className="text-blue-600 hover:underline">French Version</a>
        </div>
      </div>
    </div>
  );
}
