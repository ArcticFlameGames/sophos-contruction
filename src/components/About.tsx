"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Shield, Users } from "lucide-react";
import { useTranslations } from 'next-intl';

const featureIcons = {
  quality: CheckCircle,
  minimal: Clock,
  licensed: Shield,
  team: Users
} as const;

type FeatureKey = keyof typeof featureIcons;

export const About = () => {
  const t = useTranslations('about');
  
  const featureKeys: FeatureKey[] = ['quality', 'minimal', 'licensed', 'team'];
  
  // Get the raw title string and split it to extract the highlighted part
  const titleParts = t.raw('title').split('<span');
  const beforeSpan = titleParts[0];
  const spanContent = titleParts[1] ? `<span${titleParts[1]}` : '';

  return (
    <section id="about" className="py-20 bg-gradient-section">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {featureKeys.map((key, index) => {
            const Icon = featureIcons[key];
            return (
              <Card 
                key={key} 
                className="bg-gradient-card hover:shadow-card-custom transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-construction-red/10 rounded-full flex-shrink-0">
                      <Icon className="h-6 w-6 text-construction-red" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{t(`features.${key}.title`)}</h3>
                      <p className="text-muted-foreground">{t(`features.${key}.description`)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center animate-fade-in">
          <Card className="bg-gradient-card max-w-3xl mx-auto">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-4">{t('promise.title')}</h3>
              <p className="text-lg text-muted-foreground">
                {t('promise.description')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
