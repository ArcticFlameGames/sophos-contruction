const { createRequestHeaders } = require('next/dist/compiled/@vercel/og')

/** @type {import('next-intl').NextConfig} */
const nextIntlConfig = {
  defaultLocale: 'fr', // French as default
  locales: ['fr', 'en'], // French and English supported
  localePrefix: 'as-needed', // Don't show default locale (fr) in URL
  // Optional: Configure domain-based routing if needed
  // domains: [
  //   {domain: 'example.com', defaultLocale: 'en'},
  //   {domain: 'example.fr', defaultLocale: 'fr'}
  // ]
}

module.exports = nextIntlConfig
