'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { useTranslations } from 'next-intl';

export const Hero = () => {
  const t = useTranslations('home.hero');
  const tCommon = useTranslations('home');

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-section">
      <div className="absolute inset-0 bg-black/60" />
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat mix-blend-overlay"
        style={{ backgroundImage: 'url(/images/hero-construction.jpg)' }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-construction-red">Sophos</span> Construction
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-100 max-w-2xl mx-auto">
            {t('tagline')}
            <br />
            <span className="text-lg">{t('subtitle')}</span>
          </p>
          <p className="text-lg mb-8 text-gray-200 max-w-2xl mx-auto">
            {t('location')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="#contact" className="w-full sm:w-auto">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4 w-full">
                {tCommon('getQuote')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <a href="#portfolio" className="w-full sm:w-auto">
              <Button 
                variant="outline-construction" 
                size="lg" 
                className="text-lg px-8 py-4 w-full bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-construction-red"
              >
                {tCommon('viewWork')}
              </Button>
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm">
            <a href="tel:5146067332" className="flex items-center gap-2 hover:underline">
              <Phone className="h-4 w-4" />
              <span>(514) 606-7332</span>
            </a>
            <a href="mailto:construction.sophos@gmail.com" className="flex items-center gap-2 hover:underline">
              <Mail className="h-4 w-4" />
              <span>construction.sophos@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
