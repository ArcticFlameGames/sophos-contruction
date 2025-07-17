const { readFileSync } = require('fs');
const { join } = require('path');

exports.handler = async (event, context) => {
  try {
    // Extract the locale from the path
    const path = event.path.split('/').filter(Boolean);
    const locale = path[path.length - 1].replace('.json', '');
    
    // Only allow supported locales
    if (!['en', 'fr'].includes(locale)) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Locale not supported' })
      };
    }

    // Read the messages file
    const messagesPath = join(process.cwd(), 'messages', `${locale}.json`);
    const messages = JSON.parse(readFileSync(messagesPath, 'utf8'));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=0, must-revalidate', // Disable caching
      },
      body: JSON.stringify(messages)
    };
  } catch (error) {
    console.error('Error in i18n function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to load messages' })
    };
  }
};
