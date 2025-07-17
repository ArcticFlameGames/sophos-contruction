import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Contact />
    </main>
  );
}
