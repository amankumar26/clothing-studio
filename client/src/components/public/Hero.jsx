import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const Hero = ({ settings }) => {
  const images = settings?.heroImages?.length > 0 ? settings.heroImages : [
    { url: '/showcase/media__1774327516602.jpg' },
    { url: '/showcase/media__1774327516692.jpg' },
    { url: '/showcase/media__1774327516762.jpg' },
    { url: '/showcase/media__1774327516769.jpg' },
    { url: '/showcase/media__1774328873433.jpg' },
    { url: '/showcase/media__1774328873468.jpg' },
    { url: '/showcase/media__1774328873627.jpg' },
    { url: '/showcase/media__1774328873651.jpg' },
    { url: '/showcase/media__1774328873658.jpg' }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Automatically swipe right to left every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative min-h-[95vh] pt-32 pb-20 overflow-hidden bg-brand-cream border-b border-gray-100/50">

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top_right,#C8956C20,transparent)]" />

      <div className="container mx-auto px-6 text-center space-y-12 relative z-20">

        {/* Headline System */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <span className="text-[10px] uppercase font-black tracking-[0.4em] text-brand-moss bg-brand-moss/5 px-6 py-2 rounded-full inline-block mb-2">
            Luxury Couture & Bespoke Tailoring
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-black text-brand-dark leading-[0.95] tracking-tight">
            {settings?.businessName || 'Guddi'}, <br />
            <span className="italic font-serif text-brand-terracotta/70 font-medium">Redefined Couture.</span>
          </h1>
          <p className="text-gray-400 font-medium max-w-xl mx-auto text-lg leading-relaxed pt-2">
            {settings?.tagline || 'Experience the fusion of traditional craftsmanship and modern silhouette in every stitch.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 mb-12 sm:mb-20">
            <button className="btn-primary w-full sm:w-auto flex items-center justify-center gap-3 h-14 bg-brand-burgundy border-brand-burgundy text-white px-10 rounded-full group transition-all">
              Get Started <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* AUTOMATIC 3D COVERFLOW SLIDER */}
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[650px] flex items-center justify-center overflow-hidden mt-10 perspective-[1500px]">
        {images.map((img, i) => {
          let diff = i - activeIndex;
          const half = Math.floor(images.length / 2); // Handles wrapping smoothly
          if (diff > half) diff -= images.length;
          if (diff < -half) diff += images.length;

          const absDiff = Math.abs(diff);
          const isCenter = diff === 0;

          return (
            <motion.div
              key={i}
              className={`absolute w-[220px] h-[320px] sm:w-[300px] sm:h-[420px] md:w-[380px] md:h-[540px] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border-[6px] border-white cursor-pointer origin-center will-change-transform ${absDiff > 2 ? 'pointer-events-none' : ''}`}
              animate={{
                x: `${diff * 65}%`, // Space out elements relative to their width
                scale: isCenter ? 1 : Math.max(0.65, 1 - absDiff * 0.15),
                zIndex: 50 - absDiff,
                opacity: absDiff > 2 ? 0 : 1, // Only show 5 elements at a time
                rotateY: -diff * 15 // Deep 3D tilt inwards towards the center
              }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              onClick={() => !isCenter && setActiveIndex(i)}
            >
              {/* Darken non-center images optimized via pure CSS */}
              <div
                className={`absolute inset-0 bg-brand-dark/40 z-10 pointer-events-none transition-opacity duration-700 ${isCenter ? 'opacity-0' : 'opacity-100'}`}
              />

              <img
                src={img.url}
                className={`w-full h-full object-cover transition-transform duration-700 ${isCenter ? 'scale-100' : 'scale-105'}`}
                alt="Guddi Couture"
                loading="lazy"
              />

              {/* Text overlay optimized via pure CSS */}
              <div
                className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-brand-burgundy/95 via-brand-burgundy/40 to-transparent p-6 sm:p-10 z-20 flex flex-col justify-end pointer-events-none transition-all duration-700 ease-out ${isCenter ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-8'}`}
              >
                <p className="text-[10px] uppercase font-black tracking-[0.3em] text-brand-moss mb-1">Featured</p>
                <p className="font-serif text-3xl sm:text-4xl font-black italic text-white drop-shadow-md">Exclusive Look</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="container mx-auto px-6 text-center mt-20">
        {/* Feature Toggles below Hero */}
        <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto border-t border-gray-100">
          {[
            { title: 'Real-Time Consultation', desc: 'Secure live chat with expert designers for bespoke tailoring.', icon: <span className="text-brand-moss">◈</span> },
            { title: 'Artisanal Tracking', desc: 'Watch your design evolve from sketch to silk in real-time.', icon: <span className="text-brand-moss">◈</span> },
            { title: 'Global Distinction', desc: 'Uniquely crafted patterns tailored to your global presence.', icon: <span className="text-brand-moss">◈</span> }
          ].map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + (i * 0.2) }}
              className="text-center space-y-3"
            >
              <div className="text-2xl mb-4">{feat.icon}</div>
              <h3 className="font-sans text-sm font-black uppercase tracking-widest text-brand-dark">{feat.title}</h3>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
