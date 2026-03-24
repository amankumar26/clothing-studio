import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowLeft, ShoppingBag, Heart, Check, Star } from 'lucide-react';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CollectionDetails = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  // Fallback mock data if the API doesn't find it (since they might be clicking my hardcoded mocks!)
  const mockProduct = {
    title: 'Couture Masterpiece',
    label: 'Guddi Exclusives',
    category: 'Bridal',
    price: 8990,
    compareAtPrice: 12500,
    description: 'A stunning representation of intricate craftsmanship and deep heritage roots. Woven with the finest threads to present an aesthetic like no other. Perfect for momentous occasions.',
    images: [
       { url: 'https://images.unsplash.com/photo-1594235412402-bbaaec2df157?q=80&w=800' },
       { url: 'https://images.unsplash.com/photo-1594751439417-df7a69ca4711?q=80&w=800' }
    ]
  };

  const { data: product, isLoading } = useQuery({
    queryKey: ['collection', id],
    queryFn: async () => {
      // If the ID starts with 'mock', just return the mock product
      if (id.startsWith('mock')) return mockProduct;
      const res = await axios.get(`${API_URL}/collections/${id}`);
      return res.data;
    }
  });

  if (isLoading) return <div className="h-screen flex items-center justify-center font-serif text-2xl italic">Curating piece...</div>;

  const currentProduct = product || mockProduct;
  const discount = currentProduct.compareAtPrice && currentProduct.price < currentProduct.compareAtPrice 
    ? Math.round(((currentProduct.compareAtPrice - currentProduct.price) / currentProduct.compareAtPrice) * 100) 
    : 0;

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-brand-cream min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <Link to="/" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-brand-terracotta transition-colors mb-12">
          <ArrowLeft size={16} className="mr-2" /> Back to Exhibit
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
           {/* Image Gallery */}
           <div className="flex flex-col gap-4">
              <div className="relative aspect-[3/4] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
                 {discount > 0 && (
                   <div className="absolute top-0 left-0 bg-red-500 text-white text-[10px] font-bold px-4 py-2 rounded-tl-3xl shadow-sm z-10">
                      SALE! {discount}% OFF
                   </div>
                 )}
                 <img 
                    src={currentProduct.images[activeImage]?.url || mockProduct.images[0].url} 
                    className="w-full h-full object-cover"
                    alt={currentProduct.title}
                 />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4">
                 {currentProduct.images?.map((img, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setActiveImage(idx)}
                      className={`relative w-24 aspect-[3/4] rounded-xl overflow-hidden flex-shrink-0 transition-all ${activeImage === idx ? 'ring-2 ring-brand-burgundy scale-105' : 'opacity-60 hover:opacity-100'}`}
                    >
                       <img src={img.url} className="w-full h-full object-cover" />
                    </button>
                 ))}
              </div>
           </div>

           {/* Product Info */}
           <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                 <p className="text-xs font-black tracking-[0.2em] text-brand-terracotta uppercase">{currentProduct.label || currentProduct.category}</p>
                 <h1 className="font-serif text-4xl lg:text-5xl font-black italic text-brand-dark leading-tight">{currentProduct.title}</h1>
                 
                 <div className="flex items-center gap-1 text-yellow-500 mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                    <span className="text-gray-400 text-xs ml-2 font-medium">(128 Reviews)</span>
                 </div>

                 <div className="flex items-end gap-4 border-b border-gray-200 pb-8">
                    <span className="text-4xl font-bold text-gray-900">₹{(currentProduct.price || 8990).toLocaleString('en-IN')}</span>
                    {currentProduct.compareAtPrice && (
                       <span className="text-xl text-red-400 line-through mb-1 font-medium">₹{currentProduct.compareAtPrice.toLocaleString('en-IN')}</span>
                    )}
                 </div>
              </div>

              <div className="space-y-6">
                 <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Product Story</h3>
                    <p className="text-gray-600 leading-relaxed">{currentProduct.description || "A masterfully crafted piece bringing traditional heritage into contemporary flair. Unveil the rich textures and premium threading perfect for exclusive occasions."}</p>
                 </div>

                 <div className="flex gap-4 pt-6">
                    <button 
                       onClick={handleAdd}
                       className="flex-grow h-16 bg-brand-burgundy text-white hover:bg-brand-dark transition-all rounded-full flex items-center justify-center font-black uppercase text-xs tracking-widest gap-3 shadow-2xl hover:shadow-brand-burgundy/30"
                    >
                       {added ? <Check size={20} /> : <ShoppingBag size={20} />}
                       {added ? "Added to Cart" : "Add to Shopping Bag"}
                    </button>
                    <button className="h-16 w-16 border-2 border-brand-burgundy/20 text-brand-burgundy hover:bg-brand-burgundy hover:text-white flex items-center justify-center rounded-full transition-colors flex-shrink-0">
                       <Heart size={24} />
                    </button>
                 </div>

                 <div className="bg-brand-burgundy/5 p-6 rounded-2xl flex flex-col gap-2 border border-brand-burgundy/10 mt-8">
                    <p className="text-xs font-bold text-brand-burgundy flex items-center gap-2"><Check size={14}/> Secure Online Payment</p>
                    <p className="text-xs font-bold text-brand-burgundy flex items-center gap-2"><Check size={14}/> 7-Day Free Returns</p>
                    <p className="text-xs font-bold text-brand-burgundy flex items-center gap-2"><Check size={14}/> Authenticity Guaranteed</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetails;
