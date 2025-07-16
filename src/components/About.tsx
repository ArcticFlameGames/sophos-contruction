"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Shield, Users } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Quality Craftsmanship",
    description: "We take pride in delivering exceptional workmanship on every project."
  },
  {
    icon: Clock,
    title: "Minimal Touch Points",
    description: "We handle everything with minimal disruption to your daily routine."
  },
  {
    icon: Shield,
    title: "Fully Licensed & Insured",
    description: "Complete peace of mind with our licensed, bonded, and insured team."
  },
  {
    icon: Users,
    title: "Experienced Team",
    description: "Our skilled professionals bring years of experience to every project."
  }
];

export const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="text-construction-red">Sophos Construction</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're not just contractors – we're your partners in creating the home of your dreams across the South Shore of Montreal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card hover:shadow-card-custom transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-construction-red/10 rounded-full flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-construction-red" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in">
          <Card className="bg-gradient-card max-w-3xl mx-auto">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-4">Our Promise</h3>
              <p className="text-lg text-muted-foreground">
                At Sophos Construction, we believe in making home renovations stress-free. 
                Our hands-off approach means you can focus on your life while we handle every 
                detail of your project. From initial consultation to final cleanup, we've got you covered.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
