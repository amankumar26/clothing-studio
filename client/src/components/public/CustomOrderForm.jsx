import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Camera, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CustomOrderForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const mutation = useMutation({
    mutationFn: (formData) => {
      return axios.post(`${API_URL}/inquiries`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    onSuccess: () => {
      toast.success('Your inquiry has been submitted! We will contact you soon.', {
        duration: 6000,
        className: 'font-sans font-medium',
      });
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Submission failed. Please try again.');
    }
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'images') {
        Array.from(data[key]).forEach(file => formData.append('images', file));
      } else {
        formData.append(key, data[key]);
      }
    });
    mutation.mutate(formData);
  };

  return (
    <section id="custom-order" className="py-20 sm:py-24 bg-brand-cream/30">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
        {/* Left Info Column */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <span className="section-subheading">Personalized Couture</span>
          <h2 className="section-heading">Your Vision, <br /> Our Craft</h2>
          <p className="text-lg text-brand-dark/70 mb-10 italic font-serif">
            "Every garment tells a story. Let us help you write yours with a silhouette that fits your soul."
          </p>
          
          <ul className="space-y-6 mb-12">
            {[
              { title: 'Personal Consultation', desc: 'Discuss your style, silhouette, and occasion with our lead designer.' },
              { title: 'Fabric Selection', desc: 'Handpick from our curated collection of silk, chiffon, lace, and more.' },
              { title: 'Perfect Fit', desc: 'Detailed measurements and two-stage fittings to ensure flawless results.' },
            ].map((item, idx) => (
              <li key={idx} className="flex gap-4">
                <span className="w-10 h-10 flex-shrink-0 bg-brand-terracotta/10 text-brand-terracotta flex items-center justify-center font-bold font-serif text-lg">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="font-bold text-brand-dark uppercase tracking-widest text-sm">{item.title}</h4>
                  <p className="text-brand-dark/60 text-sm mt-1">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Form Column */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white shadow-2xl p-6 sm:p-12 relative overflow-hidden rounded-[2.5rem] sm:rounded-none"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-terracotta/5 -rotate-45 translate-x-16 -translate-y-16" />
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-brand-dark/60 ml-1">Full Name</label>
                <input 
                  type="text" 
                  {...register('name', { required: 'Name is required' })}
                  className="w-full bg-gray-50 border-transparent focus:border-brand-terracotta focus:bg-white focus:ring-0 transition-all px-4 py-3 rounded-none outline-none"
                  placeholder="Enter your name"
                />
                {errors.name && <span className="text-red-500 text-[10px] uppercase font-bold">{errors.name.message}</span>}
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-brand-dark/60 ml-1">Email Address</label>
                <input 
                  type="email" 
                  {...register('email', { required: 'Email is required' })}
                  className="w-full bg-gray-50 border-transparent focus:border-brand-terracotta focus:bg-white focus:ring-0 transition-all px-4 py-3 rounded-none outline-none"
                  placeholder="name@email.com"
                />
                {errors.email && <span className="text-red-500 text-[10px] uppercase font-bold">{errors.email.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-brand-dark/60 ml-1">Clothing Category</label>
                <select 
                  {...register('clothingType', { required: 'Category is required' })}
                  className="w-full bg-gray-50 border-transparent focus:border-brand-terracotta focus:bg-white focus:ring-0 transition-all px-4 py-3 rounded-none outline-none appearance-none"
                >
                  <option value="Dress">Dress</option>
                  <option value="Suit">Suit</option>
                  <option value="Lehenga">Lehenga</option>
                  <option value="Kurta">Kurta</option>
                  <option value="Blouse">Blouse</option>
                  <option value="Salwar Kameez">Salwar Kameez</option>
                  <option value="Western">Western</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-brand-dark/60 ml-1">Phone Number</label>
                <input 
                  type="tel" 
                  {...register('phone', { required: 'Phone is required' })}
                  className="w-full bg-gray-50 border-transparent focus:border-brand-terracotta focus:bg-white focus:ring-0 transition-all px-4 py-3 rounded-none outline-none"
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && <span className="text-red-500 text-[10px] uppercase font-bold">{errors.phone.message}</span>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-brand-dark/60 ml-1">Design Vision / Description</label>
              <textarea 
                rows="4" 
                {...register('designDescription', { required: 'Description is required' })}
                className="w-full bg-gray-50 border-transparent focus:border-brand-terracotta focus:bg-white focus:ring-0 transition-all px-4 py-3 rounded-none outline-none resize-none"
                placeholder="Tell us about the colors, style, or specific details you're looking for..."
              />
              {errors.designDescription && <span className="text-red-500 text-[10px] uppercase font-bold">{errors.designDescription.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-brand-dark/60 ml-1">Reference Images (Optional)</label>
              <div className="relative group border-2 border-dashed border-gray-200 hover:border-brand-terracotta transition-colors p-6 text-center cursor-pointer">
                <input 
                  type="file" 
                  multiple 
                  {...register('images')}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Camera size={32} className="mx-auto text-brand-dark/30 group-hover:text-brand-terracotta transition-colors mb-2" />
                <p className="text-xs font-bold uppercase tracking-tighter text-brand-dark/50 group-hover:text-brand-terracotta">Click to upload style references</p>
                <p className="text-[10px] text-brand-dark/30 mt-1 uppercase">Max 5 images • JPG, PNG, WEBP</p>
              </div>
            </div>

            <button
               type="submit"
               disabled={mutation.isPending}
               className="btn-primary w-full flex items-center justify-center gap-3"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing Order...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Request
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomOrderForm;
