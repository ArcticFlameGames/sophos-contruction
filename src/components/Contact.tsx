"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
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
    // Here you would typically send the form data to your backend
    toast({
      title: "Thank you for your submission!",
      description: "We'll get back to you within 24 hours with a free quote.",
    });
    setFormData({ name: "", email: "", phone: "", projectType: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Your <span className="text-construction-red">Project</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your home? Get a free quote today and let's discuss your vision for your South Shore property.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="bg-gradient-card animate-slide-up">
            <CardHeader>
              <CardTitle className="text-2xl">Get Your Free Quote</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
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
                    <Label htmlFor="email">Email</Label>
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
                    <Label htmlFor="phone">Phone Number</Label>
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
                    <Label htmlFor="projectType">Project Type</Label>
                    <Input
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      placeholder="e.g., Kitchen Renovation"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Project Description</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your project..."
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
                  Get Free Quote
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Card className="bg-gradient-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-construction-red" />
                    <span>(514) 555-0123</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-construction-red" />
                    <span>info@sophosconstruction.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-construction-red" />
                    <span>South Shore of Montreal, QC</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-construction-red" />
                    <span>Mon-Fri: 7AM-6PM, Sat: 8AM-4PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-construction-red text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Emergency Repairs</h3>
                <p className="mb-4">
                  Need urgent repairs in the South Shore area? We offer 24/7 emergency services for critical issues.
                </p>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-construction-red"
                  onClick={() => window.location.href = 'tel:5145550123'}
                >
                  Call Emergency Line
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
