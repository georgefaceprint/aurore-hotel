
import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';
import LocalHub from '@/components/home/LocalHub';
import QuickActions from '@/components/home/QuickActions';
import NewsFeed from '@/components/home/NewsFeed';

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <QuickActions />
      <LocalHub />
      <NewsFeed />
      <div style={{ height: '100px' }}></div>
    </main>
  );
}
