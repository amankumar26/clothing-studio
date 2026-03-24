import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Heart, Maximize2 } from 'lucide-react';

const CollectionsGrid = ({ collections }) => {
  // Use collections from the database.
  // Because the database is now synced, managing them in the Admin Panel affects this natively.
  const displayCollections = (collections && collections.length > 0) ? collections : [];

  const getDiscount = (price, compare) => {
    if (!compare || !price || compare <= price) return null;
    return Math.round(((compare - price) / compare) * 100);
  };

  const tabs = ["ALL PRODUCTS", "FEATURED", "BEST SELLERS", "TOP RATED", "ON SALE", "IN STOCK"];
  const [activeTab, setActiveTab] = useState("ALL PRODUCTS");

  return (
    <section id="collections" className="bg-brand-cream py-16">
      <div className="container mx-auto px-4 max-w-[1500px]">
        
        {/* Section Header */}
        <div className="flex flex-col xl:flex-row items-center justify-between mb-8 border-b border-gray-200 pb-4 gap-6">
           <h3 className="font-sans font-bold text-2xl text-brand-dark tracking-tight">Trending Best Selling Products</h3>
           
           {/* Center Tabs */}
           <div className="flex flex-wrap justify-center gap-4 text-[10px] font-bold uppercase text-gray-400 tracking-wider">
              {tabs.map((tab) => (
                 <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`hover:text-brand-dark transition-colors ${activeTab === tab ? 'text-brand-dark' : ''}`}
                 >
                   {tab}
                 </button>
              ))}
           </div>

           {/* View All */}
           <button className="text-[11px] font-bold tracking-widest text-gray-500 hover:text-brand-dark uppercase flex flex-row items-center gap-2">
             All Products <ArrowRight size={14} className="font-normal"/>
           </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {displayCollections.map((product, idx) => {
             const discount = getDiscount(product.price, product.compareAtPrice);
             return (
              <motion.div 
                key={product._id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx % 3) * 0.1 }}
                className="group flex flex-col relative w-full"
              >
                {/* Image Box */}
                <Link to={`/collection/${product._id}`} className="relative aspect-[3/4.2] overflow-hidden bg-gray-100 rounded-3xl mb-4 cursor-pointer shadow-md group-hover:shadow-xl transition-all duration-300 block">
                  {/* Sale Badge */}
                  {discount && (
                    <div className="absolute top-0 left-0 rounded-tl-3xl z-10 bg-red-500 text-white text-[9px] font-bold px-3 py-2 text-center shadow-sm">
                      SALE!<br/>{discount}%
                    </div>
                  )}

                  <img 
                    src={product.images[0]?.url} 
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />

                  {/* Hover Actions */}
                  <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-20" onClick={e => e.preventDefault()}>
                     <button className="bg-white text-brand-dark hover:bg-brand-burgundy hover:text-white p-2.5 rounded shadow-lg transition-colors">
                        <ShoppingBag size={14} />
                     </button>
                     <button className="bg-white text-brand-dark hover:bg-brand-burgundy hover:text-white p-2.5 rounded shadow-lg transition-colors">
                        <Eye size={14} />
                     </button>
                     <button className="bg-white text-brand-dark hover:bg-brand-burgundy hover:text-white p-2.5 rounded shadow-lg transition-colors">
                        <Heart size={14} />
                     </button>
                     <button className="bg-white text-brand-dark hover:bg-brand-burgundy hover:text-white p-2.5 rounded shadow-lg transition-colors">
                        <Maximize2 size={14} />
                     </button>
                  </div>
                </Link>

                {/* Info Text */}
                <div className="flex flex-col space-y-1">
                   <Link to={`/collection/${product._id}`}>
                     <h4 className="text-[13px] font-bold text-gray-800 tracking-tight leading-snug cursor-pointer group-hover:text-brand-burgundy transition-colors truncate">
                       {product.label || product.title}
                     </h4>
                   </Link>
                   <p className="text-[11px] text-gray-500 truncate">
                     {product.label ? product.title : product.category}
                   </p>
                   
                   <div className="flex items-center gap-3 text-[12px] pt-1">
                     {product.compareAtPrice && (
                        <span className="text-red-500 line-through font-medium">
                           ₹{product.compareAtPrice.toLocaleString('en-IN')}
                        </span>
                     )}
                     <span className="text-gray-900 font-bold">
                        ₹{(product.price || 8990).toLocaleString('en-IN')}
                     </span>
                   </div>
                </div>
              </motion.div>
             );
          })}
        </div>

      </div>
    </section>
  );
};

// Add lucide-react ArrowRight since it isn't listed in imports directly above
const ArrowRight = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
     <line x1="5" y1="12" x2="19" y2="12"></line>
     <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default CollectionsGrid;
