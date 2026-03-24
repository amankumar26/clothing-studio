import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, LayoutTemplate as Pinterest, Send, MessageCircle, Clock, Globe } from 'lucide-react';

const ContactSection = ({ settings }) => {
  return (
    <section id="contact" className="py-32 bg-brand-cream overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header - Reference Style */}
        <div className="text-center mb-24 space-y-4">
           <motion.span 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} 
              className="text-brand-moss uppercase tracking-[0.4em] text-[10px] font-black"
           >
              Global Boutique Ready
           </motion.span>
           <motion.h2 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} 
              className="font-serif text-5xl md:text-6xl font-black text-brand-dark leading-tight"
           >
              Let’s Craft Your <span className="italic font-medium text-brand-terracotta/70">Couture Dream.</span>
           </motion.h2>
           <motion.p 
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} 
              className="max-w-xl mx-auto text-gray-400 font-medium leading-relaxed"
           >
              Our global team of designers is ready to bring your vision to life. Reach out—we’re always responsive and moving forward with your design dreams.
           </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-7xl mx-auto">
          
          {/* Left - Large Interaction Panel - Reference Style Card */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
             className="lg:col-span-8 bg-[#F8F6F1] p-12 md:p-20 rounded-[4rem] relative group border border-gray-100 shadow-sm"
          >
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 h-full">
                <div className="space-y-12">
                   <div className="space-y-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-moss shadow-sm"><Mail size={24} /></div>
                      <h4 className="text-2xl font-black font-serif italic text-brand-dark">Direct Channel</h4>
                      <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">Send us your design brief or general inquiries.</p>
                      <a href={`mailto:${settings?.email || 'studio@yourbrand.com'}`} className="block text-lg font-black font-serif italic text-brand-terracotta hover:text-brand-moss transition-colors">{settings?.email || 'studio@yourbrand.com'}</a>
                   </div>

                   <div className="space-y-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-moss shadow-sm"><Phone size={24} /></div>
                      <h4 className="text-2xl font-black font-serif italic text-brand-dark">Design Hotline</h4>
                      <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">Voice or WhatsApp for an immediate couture consultation.</p>
                      <a href={`tel:${settings?.phone || '+1234567890'}`} className="block text-lg font-black font-serif italic text-brand-terracotta hover:text-brand-moss transition-colors">{settings?.phone || '+1 234 567 890'}</a>
                   </div>
                </div>

                <div className="flex flex-col justify-between">
                   <div className="space-y-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-moss shadow-sm"><MapPin size={24} /></div>
                      <h4 className="text-2xl font-black font-serif italic text-brand-dark">Physical Studio</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{settings?.address || '123 Couture Avenue, Fashion District, NY 10001'}</p>
                   </div>
                   
                   <div className="mt-12 space-y-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-moss shadow-sm"><Clock size={24} /></div>
                      <h4 className="text-xl font-black font-serif italic text-brand-dark">Market Hours</h4>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-brand-moss bg-brand-moss/5 px-4 py-1.5 rounded-full w-fit">Open: {settings?.businessHours || 'Mon-Sat: 10am - 8pm'}</p>
                   </div>
                </div>
             </div>
          </motion.div>

          {/* Right - Side Interaction Box - Reference Style Map or Visual */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
             className="lg:col-span-4 space-y-10"
          >
             {/* Map Card */}
             <div className="bg-brand-moss/5 border border-gray-100/50 p-2 rounded-[3.5rem] relative overflow-hidden h-[400px]">
                <iframe 
                  className="w-full h-full rounded-[3.5rem] opacity-70 grayscale contrast-125 saturate-50 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
                  src={settings?.mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.617359061895!2d-73.98782392425983!3d40.748440535384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a145!2sEmpire%20State%20Building!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin'}
                  loading="lazy" 
                  title="Studio Location MAP"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
             </div>

             {/* Live Chat Trigger */}
             <div className="bg-brand-burgundy text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group border border-white/5 h-[calc(100%-440px)] min-h-[250px] flex flex-col justify-end">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-terracotta opacity-10 rotate-45 translate-x-12 -translate-y-12" />
                <MessageCircle size={48} className="text-brand-terracotta mb-6" strokeWidth={1.5} />
                <h4 className="text-sm font-black uppercase tracking-widest mb-2">Live Support</h4>
                <p className="text-white/50 text-xs font-medium leading-relaxed mb-8">Chat directly with a designer via WhatsApp for immediate design feedback.</p>
                <a 
                   href={`https://wa.me/${settings?.whatsapp}`} 
                   target="_blank" rel="noreferrer"
                   className="btn-primary w-fit flex items-center gap-3 bg-brand-terracotta border-0 text-[10px] font-black group h-12 px-8 rounded-full"
                >
                   Let’s Chat Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
             </div>
          </motion.div>
        </div>

        {/* Global Network Section */}
        <div className="pt-24 text-center border-t border-gray-100/50 mt-24">
           <div className="flex justify-center gap-12 font-black uppercase tracking-[0.6em] text-[9px] text-gray-300 pointer-events-none">
              <span>MANHATTAN</span>
              <span>◈</span>
              <span>LONDON</span>
              <span>◈</span>
              <span>PARIS</span>
              <span>◈</span>
              <span>MILAN</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
