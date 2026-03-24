import { motion } from 'framer-motion';

const ArchedShowcase = () => {
  const images = [
    { url: '/showcase/media__1774327516602.jpg', name: 'Sarika' },
    { url: '/showcase/media__1774327516692.jpg', name: 'Devyani' },
    { url: '/showcase/media__1774327516762.jpg', name: 'Indira' },
    { url: '/showcase/media__1774327516769.jpg', name: 'Mehak' }
  ];

  // Precise Mughal stepped arch path
  const archPath = "M 0 150 L 100 150 L 100 50 C 100 40, 95 35, 85 30 C 75 25, 70 20, 65 15 C 60 10, 55 5, 50 0 C 45 5, 40 10, 35 15 C 30 20, 25 25, 15 30 C 5 35, 0 40, 0 50 Z";
  
  // URL Encoded SVG for CSS Masking
  const archMask = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 150' preserveAspectRatio='none'%3E%3Cpath d='${archPath}' fill='black'/%3E%3C/svg%3E")`;

  return (
    <section className="bg-brand-burgundy py-10 md:py-16 relative overflow-hidden border-t border-brand-terracotta/20 border-b">
      
      {/* Centered Overlay Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
         <h2 className="font-serif text-6xl sm:text-7xl md:text-9xl font-black italic text-brand-cream/90 tracking-tighter drop-shadow-2xl">
           GUDDI
         </h2>
      </div>

      <div className="w-full px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-[1600px] mx-auto">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 1, ease: 'easeOut' }}
              className="group relative cursor-crosshair w-full aspect-[2/3.5] mx-auto"
            >
              {/* Image Container with SVG Mask */}
              <div 
                className="absolute inset-0 bg-[#3a0d10] transition-transform duration-1000 group-hover:scale-[1.02] shadow-2xl"
                style={{ 
                  WebkitMaskImage: archMask,
                  maskImage: archMask,
                  WebkitMaskSize: '100% 100%',
                  maskSize: '100% 100%',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat'
                }}
              >
                <img 
                  src={img.url} 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 transform scale-105 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                  alt={img.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy/90 via-transparent to-transparent opacity-60" />
              </div>

              {/* Exact SVG Border Overlay -> Ensures the arch has a golden outline */}
              <svg 
                viewBox="0 0 100 150" 
                className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-transform duration-1000 group-hover:scale-[1.02]" 
                preserveAspectRatio="none"
              >
                 {/* Main Outer Golden Line */}
                 <path 
                   d={archPath} 
                   fill="none" 
                   stroke="#C8956C" 
                   strokeWidth="0.8" 
                   strokeOpacity="0.8" 
                   vectorEffect="non-scaling-stroke" 
                 />

                 {/* Delicate Inner Decorative Dashed Line */}
                 <path 
                   d="M 4 146 L 96 146 L 96 53 C 96 45, 91 40, 83 35 C 74 30, 69 25, 65 20 C 60 15, 56 10, 50 6 C 44 10, 40 15, 35 20 C 31 25, 26 30, 17 35 C 9 40, 4 45, 4 53 Z" 
                   fill="none" 
                   stroke="#C8956C" 
                   strokeWidth="0.3" 
                   strokeOpacity="0.6" 
                   vectorEffect="non-scaling-stroke" 
                   strokeDasharray="1.5 1.5"
                 />

                 {/* Center Top Arch Jewel Pendant */}
                 <g transform="translate(50, 0)">
                    <circle cx="0" cy="1" r="1.5" fill="#C8956C" />
                    <circle cx="0" cy="4" r="0.8" fill="#C8956C" />
                    <circle cx="0" cy="6" r="0.4" fill="#C8956C" />
                    <path d="M 0 -3 L 2 0 L 0 3 L -2 0 Z" fill="#C8956C" opacity="0.8" transform="translate(0, 10)" />
                 </g>

                 {/* Arch Stepping Stones Ornaments */}
                 <g fill="#C8956C" opacity="0.8">
                    {/* Upper Left & Right Steps */}
                    <circle cx="35" cy="15" r="1" />
                    <circle cx="65" cy="15" r="1" />
                    {/* Lower Left & Right Steps */}
                    <circle cx="15" cy="30" r="1" />
                    <path d="M 0 -1.5 L 1.5 0 L 0 1.5 L -1.5 0 Z" transform="translate(15, 34)" opacity="0.6"/>
                    <circle cx="85" cy="30" r="1" />
                    <path d="M 0 -1.5 L 1.5 0 L 0 1.5 L -1.5 0 Z" transform="translate(85, 34)" opacity="0.6"/>
                 </g>

                 {/* Corner Filigree Flourishes at the Base */}
                 <g fill="none" stroke="#C8956C" strokeWidth="0.5" strokeOpacity="0.7" vectorEffect="non-scaling-stroke">
                    {/* Left Base Corner */}
                    <path d="M 4 135 C 10 135, 12 140, 12 146" />
                    <circle cx="11.5" cy="134.5" r="0.5" fill="#C8956C" />
                    {/* Right Base Corner */}
                    <path d="M 96 135 C 90 135, 88 140, 88 146" />
                    <circle cx="88.5" cy="134.5" r="0.5" fill="#C8956C" />
                 </g>
              </svg>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchedShowcase;
