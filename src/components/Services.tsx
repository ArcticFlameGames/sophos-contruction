"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Wrench, Paintbrush, Hammer, Zap, Droplets } from "lucide-react";
import { useTranslations } from 'next-intl';

const serviceIcons = {
  kitchen: Home,
  basement: Wrench,
  exterior: Paintbrush,
  repairs: Hammer,
  electrical: Zap,
  plumbing: Droplets
} as const;

type ServiceKey = keyof typeof serviceIcons;

export const Services = () => {
  const t = useTranslations('services');
  
  const serviceKeys: ServiceKey[] = [
    'kitchen',
    'basement',
    'exterior',
    'repairs',
    'electrical',
    'plumbing'
  ];

  // Get the raw title string and split it to extract the highlighted part
  const titleParts = t.raw('title').split('<span');
  const beforeSpan = titleParts[0];
  const spanContent = titleParts[1] ? `<span${titleParts[1]}` : '';

  return (
    <section id="services" className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {beforeSpan}
            <span dangerouslySetInnerHTML={{ __html: spanContent }} />
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceKeys.map((key, index) => {
            const Icon = serviceIcons[key];
            return (
              <Card 
                key={key} 
                className="bg-gradient-card hover:shadow-card-custom transition-all duration-300 hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-construction-red/10 rounded-full w-fit">
                    <Icon className="h-8 w-8 text-construction-red" />
                  </div>
                  <CardTitle className="text-xl">{t(`${key}.title`)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {t(`${key}.description`)}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
