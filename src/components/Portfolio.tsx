"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

// Placeholder images - replace these with your actual images
const kitchenBefore = "/images/kitchen-before.jpg";
const kitchenAfter = "/images/kitchen-after.jpg";
const basementBefore = "/images/basement-before.jpg";
const basementAfter = "/images/basement-after.jpg";
const exteriorBefore = "/images/exterior-before.jpg";
const exteriorAfter = "/images/exterior-after.jpg";

const portfolioItems = [
  {
    category: "kitchen",
    title: "Modern Kitchen Transformation",
    before: kitchenBefore,
    after: kitchenAfter,
    description: "Complete kitchen renovation with new cabinets, countertops, and appliances.",
    duration: "3 weeks",
    type: "Kitchen Renovation"
  },
  {
    category: "basement",
    title: "Basement Family Room",
    before: basementBefore,
    after: basementAfter,
    description: "Unfinished basement converted into a cozy family entertainment space.",
    duration: "4 weeks",
    type: "Basement Finishing"
  },
  {
    category: "exterior",
    title: "Exterior Makeover",
    before: exteriorBefore,
    after: exteriorAfter,
    description: "Complete exterior renovation with new siding, windows, and landscaping.",
    duration: "2 weeks",
    type: "Exterior Renovation"
  }
];

const BeforeAfterCard = ({ item, index }: { item: typeof portfolioItems[0], index: number }) => (
  <Card 
    className="overflow-hidden hover:shadow-card-custom transition-all duration-300 animate-fade-in"
    style={{ animationDelay: `${index * 200}ms` }}
  >
    <CardHeader>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <CardTitle className="text-xl">{item.title}</CardTitle>
        <Badge variant="secondary" className="w-fit">{item.type}</Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="relative group">
          <Image
            src={item.before}
            alt="Before renovation"
            width={500}
            height={300}
            className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
            Before
          </div>
        </div>
        <div className="relative group">
          <Image
            src={item.after}
            alt="After renovation"
            width={500}
            height={300}
            className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
            After
          </div>
        </div>
      </div>
      <p className="text-muted-foreground mb-2">{item.description}</p>
      <div className="flex justify-between items-center text-sm">
        <span className="text-construction-red font-medium">Duration: {item.duration}</span>
      </div>
    </CardContent>
  </Card>
);

export const Portfolio = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-construction-red">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See the transformations we've delivered for our satisfied clients.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 max-w-md mx-auto mb-12">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="kitchen">Kitchen</TabsTrigger>
            <TabsTrigger value="basement">Basement</TabsTrigger>
            <TabsTrigger value="exterior">Exterior</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {portfolioItems.map((item, index) => (
              <BeforeAfterCard key={index} item={item} index={index} />
            ))}
          </TabsContent>

          <TabsContent value="kitchen" className="space-y-8">
            {portfolioItems
              .filter(item => item.category === "kitchen")
              .map((item, index) => (
                <BeforeAfterCard key={index} item={item} index={index} />
              ))}
          </TabsContent>

          <TabsContent value="basement" className="space-y-8">
            {portfolioItems
              .filter(item => item.category === "basement")
              .map((item, index) => (
                <BeforeAfterCard key={index} item={item} index={index} />
              ))}
          </TabsContent>

          <TabsContent value="exterior" className="space-y-8">
            {portfolioItems
              .filter(item => item.category === "exterior")
              .map((item, index) => (
                <BeforeAfterCard key={index} item={item} index={index} />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Portfolio;
