import { Locale } from '@/i18n-config';

// This is a type-safe way to import messages
const getMessages = async (locale: Locale) => {
  try {
    switch (locale) {
      case 'en':
        return (await import('@/messages/en.json')).default;
      case 'fr':
        return (await import('@/messages/fr.json')).default;
      default:
        return (await import('@/messages/fr.json')).default; // Fallback to French
    }
  } catch (error) {
    console.error('Failed to load messages for locale:', locale, error);
    return {};
  }
};

export default getMessages;
