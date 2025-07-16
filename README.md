# Sophos Construction

A modern, responsive, and internationalized website for Sophos Construction, built with Next.js and Tailwind CSS.

## Features

- 🌐 **Internationalization (i18n)** with French (default) and English support
- 🌓 **Dark/Light Mode** with system preference detection
- 🚀 **Optimized Performance** with Next.js 14 App Router
- 📱 **Fully Responsive** design for all devices
- 🔍 **SEO Optimized** with metadata, sitemap, and robots.txt
- 🛠 **Modern Development** with TypeScript and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sophos-construction.git
   cd sophos-construction
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Internationalization (i18n)

This project uses Next.js internationalized routing with the following features:

- Default language: French (`fr`)
- Supported languages: French (`fr`), English (`en`)
- Automatic locale detection based on browser settings
- Language switcher in the navigation
- SEO-friendly URLs (e.g., `/fr/accueil`, `/en/home`)

### Adding a New Language

1. Add the new locale to the `locales` array in `src/i18n-config.ts`
2. Create a new JSON file in the `messages` directory (e.g., `es.json`)
3. Add translations for all keys in the new language file
4. Update the `localeNames` object in `src/i18n-config.ts`

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # Localized routes
│   │   ├── home/           # Home page
│   │   ├── services/       # Services page
│   │   ├── projects/       # Projects page
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── layout.tsx      # Layout for all pages
│   │   ├── page.tsx        # Root page (redirects to /home)
│   │   ├── error.tsx       # Error boundary
│   │   └── loading.tsx     # Loading state
│   ├── sitemap.ts          # Sitemap generator
│   └── robots.ts           # Robots.txt generator
├── components/             # Reusable components
├── lib/                    # Utility functions
└── messages/               # Translation files
    ├── en.json            # English translations
    └── fr.json            # French translations
```

## Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
NEXT_PUBLIC_SITE_URL=https://sophos-construction.vercel.app
```

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to a GitHub repository
2. Import the repository on Vercel
3. Vercel will automatically detect the Next.js project and configure the build settings
4. Deploy!

## Built With

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [next-intl](https://next-intl-docs.vercel.app/) - Internationalization for Next.js
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icons

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
