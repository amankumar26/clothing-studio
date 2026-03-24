import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'Features', href: '/#features' },
    { name: 'Blog', href: '/blog' },
    { name: 'Collections', href: '/#collections' },
    { name: 'Contact', href: '/#custom-order' },
  ];

  return (
    <nav className={`fixed top-0 inset-x-0 z-[100] transition-all duration-700 px-4 sm:px-6 ${
      scrolled ? 'py-4' : 'py-6'
    }`}>
      <div className={`mx-auto transition-all duration-700 h-14 sm:h-16 rounded-full px-6 sm:px-10 flex items-center justify-between border select-none ${
        scrolled 
        ? 'bg-white/80 backdrop-blur-xl border-white/40 shadow-lg max-w-5xl' 
        : 'bg-white/40 backdrop-blur-md border-white/20 max-w-7xl'
      }`}>
        
        {/* Left Links */}
        <div className="hidden lg:flex items-center justify-start gap-4 xl:gap-8 lg:w-1/3">
          {navLinks.slice(0, 3).map((link) => (
            link.href.includes('#') ? (
              <a 
                key={link.name} 
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark/80 hover:text-brand-moss hover:tracking-[0.4em] transition-all duration-500"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark/80 hover:text-brand-moss hover:tracking-[0.4em] transition-all duration-500"
              >
                {link.name}
              </Link>
            )
          ))}
        </div>

        {/* Brand Identity / Center - Responsive Thirds */}
        <div className="flex justify-center lg:justify-center transition-transform duration-500 lg:w-1/3">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="font-serif text-3xl font-black italic tracking-tighter text-brand-dark group flex items-center gap-1"
          >
            {settings?.businessName || 'Guddi'}
            <span className="w-1.5 h-1.5 rounded-full bg-brand-moss scale-0 group-hover:scale-100 transition-transform duration-500" />
          </Link>
        </div>

        {/* Right Links & CTA */}
        <div className="flex items-center justify-end gap-6 sm:gap-8 lg:w-1/3">
           {/* Desktop Links */}
           <div className="hidden lg:flex items-center gap-4 xl:gap-8">
              {navLinks.slice(3).map((link) => (
                link.href.includes('#') ? (
                  <a 
                    key={link.name} 
                    href={link.href}
                    className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark hover:text-brand-moss transition-colors"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark hover:text-brand-moss transition-colors"
                  >
                    {link.name}
                  </Link>
                )
              ))}
           </div>
           
           {/* Desktop Get Started */}
           <button className="hidden lg:flex bg-brand-burgundy text-white h-10 px-8 rounded-full text-[10px] font-bold uppercase tracking-widest items-center gap-3 hover:bg-brand-moss hover:shadow-lg hover:shadow-brand-moss/20 transition-all duration-500 group">
              Get Started <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
           </button>

           {/* Mobile Trigger */}
           <div className="lg:hidden flex items-center">
             <button 
               className="p-2 sm:p-2.5 bg-brand-burgundy text-white rounded-full shadow-lg"
               onClick={() => setIsOpen(!isOpen)}
             >
               {isOpen ? <X size={18} /> : <Menu size={18} />}
             </button>
           </div>
        </div>
      </div>

      {/* Mobile Drawer Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-4 sm:inset-10 z-[70] bg-white rounded-3xl shadow-2xl flex flex-col p-8 sm:p-12 overflow-hidden border border-gray-100"
          >
            <div className="flex justify-between items-center mb-16">
              <Link to="/" onClick={() => setIsOpen(false)} className="font-serif text-3xl font-black italic text-brand-dark">GUDDI</Link>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-3 bg-brand-burgundy text-white rounded-full shadow-lg hover:bg-brand-dark transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.href.includes('#') ? (
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl sm:text-5xl font-serif italic font-black text-brand-dark hover:text-brand-terracotta transition-colors flex items-center gap-4"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl sm:text-5xl font-serif italic font-black text-brand-dark hover:text-brand-terracotta transition-colors flex items-center gap-4"
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-auto border-t border-brand-cream pt-10 grid grid-cols-2 gap-8">
               <div className="space-y-4">
                  <p className="text-[10px] uppercase font-black tracking-widest text-brand-moss">Socials</p>
                  <div className="flex flex-col gap-2 font-black uppercase text-xs tracking-widest text-brand-dark/80">
                     <a href="#">Instagram</a>
                     <a href="#">Pinterest</a>
                  </div>
               </div>
               <div className="space-y-4">
                  <p className="text-[10px] uppercase font-black tracking-widest text-brand-moss">Connect</p>
                  <p className="font-bold text-sm text-brand-dark">studio@guddi.com</p>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
