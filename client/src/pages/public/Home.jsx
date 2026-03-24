import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Hero from '../../components/public/Hero';
import CollectionsGrid from '../../components/public/CollectionsGrid';
import Testimonials from '../../components/public/Testimonials';
import ContactSection from '../../components/public/ContactSection';
import CustomOrderForm from '../../components/public/CustomOrderForm';
import ArchedShowcase from '../../components/public/ArchedShowcase';
import { motion, useScroll, useSpring } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => axios.get(`${API_URL}/settings`).then(res => res.data)
  });

  const { data: collections } = useQuery({
    queryKey: ['publicCollections'],
    queryFn: () => axios.get(`${API_URL}/collections`).then(res => res.data)
  });

  const { data: testimonials } = useQuery({
    queryKey: ['publicTestimonials'],
    queryFn: () => axios.get(`${API_URL}/testimonials`).then(res => res.data)
  });

  return (
    <main className="relative bg-brand-cream">
      {/* Premium Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-moss origin-left z-[100]"
        style={{ scaleX }}
      />

      <Hero settings={settings} />

      <ArchedShowcase />

      <CollectionsGrid collections={collections?.collections} />

      {/* Transitional Experience Block */}
      <section className="py-20 px-6 bg-brand-burgundy text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-brand-moss opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
         <div className="container mx-auto max-w-7xl flex flex-col md:row items-center justify-between gap-12">
            <div className="max-w-2xl space-y-6">
               <h3 className="font-serif text-4xl md:text-5xl font-black italic">Designing for the <span className="text-brand-moss">Unmatched.</span></h3>
               <p className="text-white/40 font-medium text-lg leading-relaxed">Every piece in our couture collection is a testimony to the unique journey of our clients. We don't just dress; we define silhouettes for a global stage.</p>
            </div>
            <button className="btn-primary h-16 px-12 bg-brand-moss border-brand-moss hover:bg-white hover:text-brand-dark transition-all rounded-full flex items-center justify-center font-black group">
               Start Your Order <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
            </button>
         </div>
      </section>

      <CustomOrderForm />

      <Testimonials testimonials={testimonials} />

      <ContactSection settings={settings} />

      {/* Final Visual Seal */}
      <div className="py-24 flex flex-col items-center justify-center space-y-8 bg-brand-cream border-t border-gray-100/50">
         <div className="font-serif text-8xl font-black text-brand-dark italic opacity-[0.03] select-none">
            {settings?.businessName || 'GUDDI'}
         </div>
         <p className="text-[10px] items uppercase font-black tracking-[1em] text-gray-300">ESTD 2010 DELHI</p>
      </div>

    </main>
  );
};

export default Home;
