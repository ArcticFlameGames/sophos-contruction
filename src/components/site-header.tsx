"use client"

import Link from "next/link"
import { useTranslations } from 'next-intl';
import Image from "next/image"
import { routes } from "@/lib/routes"
import { Locale } from "@/i18n-config"
import { useNavigation } from "@/hooks/use-navigation"

export function SiteHeader() {
  const t = useTranslations('navigation');
  const { createLocalizedUrl, getCurrentLocale, isActivePath } = useNavigation();
  const currentLocale = getCurrentLocale();
  
  const navItems = [
    routes.services,
    routes.projects,
    routes.about,
    routes.contact,
  ];
  
  const handleLocaleChange = (newLocale: Locale) => {
    // Get the current path without the locale
    const pathWithoutLocale = window.location.pathname.replace(/^\/(fr|en)/, '');
    // Navigate to the same path with the new locale
    window.location.href = `/${newLocale}${pathWithoutLocale}`;
  };
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href={createLocalizedUrl(routes.home.href, currentLocale)} className="flex items-center space-x-3">
            <Image 
              src="/images/logotransparent.png" 
              alt="Sophos Construction" 
              width={150} 
              height={50}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>
          <nav className="flex items-center space-x-6 text-sm">
            {navItems.map((item) => {
              const isHome = item.href === routes.home.href;
              const sectionId = item.href.replace(/^\//, '');
              const isActive = isActivePath(item.href);
              
              if (isHome) return null; // Skip home as it's already handled by the logo
              
              return (
                <a
                  key={item.href}
                  href={`#${sectionId}`}
                  className={`transition-colors ${isActive ? 'text-foreground font-medium' : 'text-foreground/60 hover:text-foreground/80'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(sectionId);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                      window.history.pushState(null, '', `#${sectionId}`);
                    }
                  }}
                >
                  {t(item.label.split('.')[1])}
                </a>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleLocaleChange('fr')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                currentLocale === 'fr' 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
              }`}
              aria-label="Français"
            >
              FR
            </button>
            <span className="text-foreground/40">|</span>
            <button
              onClick={() => handleLocaleChange('en')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                currentLocale === 'en' 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
              }`}
              aria-label="English"
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
