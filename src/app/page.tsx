import { redirect } from 'next/navigation';

export default function Home() {
  // Default to French
  redirect('/fr');
  
  // This won't be reached, but keeps TypeScript happy
  return null;
}