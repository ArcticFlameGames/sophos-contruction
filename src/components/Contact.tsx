"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from 'next-intl';

export const Contact = () => {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email subject and body
    const subject = `New Contact Form Submission from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0A` +
                 `Email: ${formData.email}%0D%0A` +
                 `Phone: ${formData.phone}%0D%0A` +
                 `Project Type: ${formData.projectType}%0D%0A%0D%0A` +
                 `Message:%0D%0A${formData.message}`;
    
    // Open default email client with pre-filled email
    window.location.href = `mailto:construction.sophos@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    // Show success toast
    toast({
      title: t('toast.title'),
      description: t('toast.description'),
    });
    
    // Reset form
    setFormData({ name: "", email: "", phone: "", projectType: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Get the raw title string and split it to extract the highlighted part
  const titleParts = t.raw('title').split('<span');
  const beforeSpan = titleParts[0];
  const spanContent = titleParts[1] ? `<span${titleParts[1]}` : '';

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="bg-gradient-card animate-slide-up">
            <CardHeader>
              <CardTitle className="text-2xl">{t('form.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t('form.fields.name')}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{t('form.fields.email')}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">{t('form.fields.phone')}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectType">{t('form.fields.projectType')}</Label>
                    <Input
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      placeholder={t('form.placeholders.projectType')}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">{t('form.fields.message')}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={t('form.placeholders.message')}
                    required
                    className="mt-1"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="default" 
                  size="lg" 
                  className="w-full bg-construction-red hover:bg-construction-red/90"
                >
                  {t('form.submit')}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Card className="bg-gradient-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">{t('contactInfo.title')}</h3>
                <div className="space-y-4">
                  <a href={`tel:${t('contactInfo.phone').replace(/[^0-9+]/g, '')}`} className="flex items-center gap-3 hover:underline">
                    <Phone className="h-5 w-5 text-construction-red" />
                    <span>{t('contactInfo.phone')}</span>
                  </a>
                  <a href={`mailto:${t('contactInfo.email')}`} className="flex items-center gap-3 hover:underline">
                    <Mail className="h-5 w-5 text-construction-red" />
                    <span>{t('contactInfo.email')}</span>
                  </a>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-construction-red" />
                    <span>{t('contactInfo.address')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-construction-red" />
                    <span>{t('contactInfo.hours')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-construction-red text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">{t('emergency.title')}</h3>
                <p className="mb-4">
                  {t('emergency.description')}
                </p>
                <Button 
                  variant="outline" 
                  className="border-white bg-construction-red text-white hover:bg-construction-red/90 hover:text-white"
                  onClick={() => window.location.href = `tel:${t('contactInfo.phone').replace(/[^0-9+]/g, '')}`}
                >
                  {t('emergency.button')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
