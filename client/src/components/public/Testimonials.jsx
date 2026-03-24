import { motion } from 'framer-motion';
import { Star, Quote, Heart, Calendar } from 'lucide-react';

const Testimonials = ({ testimonials }) => {
  const displayTestimonials = (testimonials && testimonials.length > 0) ? testimonials.filter(t => t.approved) : [
    {
      _id: '1',
      name: 'Sarah Mitchell',
      review: 'The attention to detail in my bridal couture was breathtaking. Every stitch tells a story of elegance and artisanal craft. A truly world-class bespoke experience.',
      rating: 5,
      createdAt: new Date()
    },
    {
      _id: '2',
      name: 'Elena Rossi',
      review: 'A fusion of modern edge and traditional tailoring that I couldn’t find anywhere else. The consultation process made me feel like the center of the design world.',
      rating: 5,
      createdAt: new Date()
    },
    {
      _id: '3',
      name: 'Sophia Thorne',
      review: 'From initial sketch to final presentation, the studio delivered nothing short of perfection. My red-carpet look was the talk of the evening.',
      rating: 5,
      createdAt: new Date()
    }
  ];

  if (!displayTestimonials.length) return null;

  return (
    <section id="testimonials" className="py-32 bg-brand-cream border-t border-gray-100/50">
      <div className="container mx-auto px-6">
        
        {/* Header - Reference Style */}
        <div className="text-center mb-24 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-brand-dark leading-tight"
          >
            Proven Results, <span className="italic font-medium text-brand-terracotta/70">Real Impact.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-gray-400 font-medium leading-relaxed"
          >
            See how our tailored approach to design and craftsmanship has helped our clients transform their wardrobe into a statement of distinction.
          </motion.p>
        </div>

        {/* The Grid - Reference Style Clean Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {displayTestimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#F8F6F1] p-8 sm:p-16 rounded-[2.5rem] sm:rounded-[3rem] space-y-6 sm:space-y-8 relative overflow-hidden group hover:bg-brand-moss hover:text-white transition-all duration-700 shadow-sm border border-gray-100/50"
            >
              {/* Star Rating */}
              <div className="flex gap-1 text-brand-terracotta group-hover:text-white transition-colors">
                 {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < testimonial.rating ? "currentColor" : "none"} strokeWidth={1} />
                 ))}
              </div>

              {/* Review Text */}
              <p className="font-serif text-xl font-bold italic text-brand-dark group-hover:text-white leading-relaxed transition-colors">
                "{testimonial.review}"
              </p>

              {/* User Bio */}
              <div className="pt-8 border-t border-gray-200 group-hover:border-white/20 transition-colors flex items-center justify-between">
                 <div className="space-y-1">
                    <h4 className="text-sm font-black uppercase tracking-widest text-brand-dark group-hover:text-white transition-colors">
                      {testimonial.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 group-hover:text-white/60 uppercase font-bold tracking-widest transition-colors">
                      Elite Private Client
                    </p>
                 </div>
                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-moss shadow-sm group-hover:bg-brand-cream group-hover:text-brand-dark transition-all">
                    <Heart size={16} fill="currentColor" strokeWidth={0} />
                 </div>
              </div>

              {/* Floating Decoration */}
              <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-10 transition-opacity">
                <Quote size={80} strokeWidth={1} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof CTA */}
        <div className="mt-24 text-center">
           <p className="text-[10px] uppercase font-black tracking-[0.4em] text-gray-400 mb-8">Trusted by over 500+ Luxury Clients Globally</p>
           <div className="flex justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all cursor-crosshair">
              {/* Partner Logos or High-End Symbols */}
              {[...Array(4)].map((_, i) => (
                <div key={i} className="font-serif text-2xl italic font-black whitespace-nowrap">COUTURE L'ELITE</div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
