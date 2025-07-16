import { Locale } from '../i18n-config';

type Route = {
  [key: string]: {
    href: string;
    label: string;
  };
};

export const routes: Route = {
  home: {
    href: '/',
    label: 'navigation.home',
  },
  services: {
    href: '/services',
    label: 'navigation.services',
  },
  projects: {
    href: '/projects',
    label: 'navigation.projects',
  },
  about: {
    href: '/about',
    label: 'navigation.about',
  },
  contact: {
    href: '/contact',
    label: 'navigation.contact',
  },
};

export function getLocalizedRoute(route: string, locale: Locale): string {
  return `/${locale}${route}`;
}
