import { Link } from 'react-router-dom';
import { ArrowUpRight, Copyright, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-burgundy text-brand-cream pt-24 pb-12 font-sans relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-white/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20 border-b border-white/5 pb-20">
          {/* Logo & Info */}
          <div className="md:col-span-5">
            <Link to="/" className="flex flex-col mb-8 inline-block group">
              <span className="font-serif text-3xl font-bold tracking-tighter leading-none italic group-hover:text-brand-terracotta transition-colors">Guddi</span>
              <span className="text-[10px] tracking-[0.4em] uppercase text-brand-terracotta font-bold mt-1">Couture Excellence</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-10 border-l-2 border-brand-terracotta/30 pl-6 italic">
              Empowering individuals through bespoke fashion. We believe every piece of clothing should be as unique as the person wearing it. Our artisans combine traditional techniques with modern silhouettes to deliver timeless elegance.
            </p>
            <div className="flex items-center gap-2 group cursor-pointer" onClick={handleScrollToTop}>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-white group-hover:text-brand-terracotta transition-all">Back to Top</span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-terracotta group-hover:bg-brand-terracotta transition-all">
                <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
              </div>
            </div>
          </div>

          {/* Site Links */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-[10px] uppercase tracking-widest text-brand-terracotta mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm font-medium">
              {['Home', 'Collections', 'How It Works', 'Testimonials', 'Contact'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="text-white hover:text-brand-terracotta hover:translate-x-2 transition-all inline-block flex items-center gap-2 group decoration-brand-terracotta underline-offset-8">
                    {link} <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4">
            <h4 className="font-bold text-[10px] uppercase tracking-widest text-brand-terracotta mb-8">Studio Hours</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Monday - Friday</span>
                <span className="text-white font-bold">10:00 - 19:00</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Saturday</span>
                <span className="text-white font-bold">11:00 - 18:00</span>
              </li>
              <li className="flex justify-between pb-2 text-brand-terracotta italic">
                <span>Sunday</span>
                <span>By Appointment Only</span>
              </li>
            </ul>

            <div className="mt-10 pt-10 border-t border-white/5 flex flex-col gap-4">
              <button className="flex flex-col group cursor-pointer">
                <span className="text-[10px] uppercase tracking-widest text-white/40">Inquiries</span>
                <span className="font-serif text-lg group-hover:text-brand-terracotta transition-colors">hello@guddi.com</span>
              </button>
              <div className="w-1/4 h-[1px] bg-brand-terracotta/20" />
              <a href="/admin/login" target="_blank" rel="noopener noreferrer" className="text-[9px] uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors">Admin Login</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:row items-center justify-between text-[10px] tracking-[0.1em] uppercase text-white/30 font-bold border-t border-white/5 pt-12">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Copyright size={12} /> {currentYear} Guddi. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1">
            Crafted with <Heart size={10} className="text-brand-terracotta fill-brand-terracotta animate-pulse" /> by Sitecraftdevai
          </div>
          <ul className="flex gap-8 mt-4 md:mt-0">
            <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
