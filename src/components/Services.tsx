"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Wrench, Paintbrush, Hammer, Zap, Droplets } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Kitchen Renovations",
    description: "Complete kitchen makeovers with modern appliances, custom cabinets, and beautiful countertops."
  },
  {
    icon: Wrench,
    title: "Basement Finishing",
    description: "Transform your basement into a functional living space with proper insulation and finishing."
  },
  {
    icon: Paintbrush,
    title: "Exterior Improvements",
    description: "Enhance your home's curb appeal with siding, roofing, and landscaping services."
  },
  {
    icon: Hammer,
    title: "General Repairs",
    description: "Professional handyman services for all your home repair and maintenance needs."
  },
  {
    icon: Zap,
    title: "Electrical Work",
    description: "Licensed electrical services including installations, repairs, and upgrades."
  },
  {
    icon: Droplets,
    title: "Plumbing Services",
    description: "Complete plumbing solutions from repairs to full bathroom renovations."
  }
];

export const Services = () => {
  return (
    <section className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-construction-red">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From small repairs to complete renovations, we handle every aspect of your home improvement project across the South Shore of Montreal.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card hover:shadow-card-custom transition-all duration-300 hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-construction-red/10 rounded-full w-fit">
                  <service.icon className="h-8 w-8 text-construction-red" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
