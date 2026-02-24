import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Welcome from '@/components/Welcome';
import Amenities from '@/components/Amenities';
import Villas from '@/components/Villas';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Welcome />
      <Amenities />
      <Villas />
      <Contact />
      <Footer />
    </main>
  );
}
