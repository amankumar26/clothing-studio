import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Save, Upload, Trash2, Loader2, Globe, Instagram, Facebook, LayoutTemplate as Pinterest, Phone, MessageCircle, Mail, MapPin, Eye, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminSettings = () => {
    const queryClient = useQueryClient();
    const [previewImages, setPreviewImages] = useState([]);

    const { data: settings, isLoading } = useQuery({
      queryKey: ['adminSettings'],
      queryFn: () => axios.get(`${API_URL}/settings`).then(res => res.data)
    });

    const updateMutation = useMutation({
      mutationFn: (data) => axios.put(`${API_URL}/admin/settings`, data),
      onSuccess: () => {
        queryClient.invalidateQueries(['adminSettings']);
        toast.success('Site settings updated');
      }
    });

    const heroMutation = useMutation({
      mutationFn: (formData) => axios.post(`${API_URL}/admin/settings/hero-images`, formData),
      onSuccess: () => {
        queryClient.invalidateQueries(['adminSettings']);
        toast.success('Hero gallery refreshed.');
        setPreviewImages([]);
      }
    });

    const deleteHeroMutation = useMutation({
      mutationFn: (publicId) => axios.delete(`${API_URL}/admin/settings/hero-images`, { data: { publicId } }),
      onSuccess: () => {
        queryClient.invalidateQueries(['adminSettings']);
        toast.success('Image removed from showcase.');
      }
    });

    const handleUpdate = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = {
        businessName: formData.get('businessName'),
        tagline: formData.get('tagline'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        whatsapp: formData.get('whatsapp'),
        address: formData.get('address'),
        mapEmbedUrl: formData.get('mapEmbedUrl'),
        businessHours: formData.get('businessHours'),
        socialLinks: {
          instagram: formData.get('instagram'),
          facebook: formData.get('facebook'),
          pinterest: formData.get('pinterest'),
        }
      };
      updateMutation.mutate(data);
    };

    const handleHeroUpload = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      heroMutation.mutate(formData);
    };

    if (isLoading) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto mb-4" /> Loading Configuration...</div>;

    return (
      <div className="space-y-12">
        <div>
           <h1 className="font-serif text-3xl font-bold text-gray-900 italic">Site Configuration</h1>
           <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-1">Manage brand identity, contact channels, and visual presence.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           {/* General Settings Form */}
           <div className="lg:col-span-8 bg-white border border-gray-100 shadow-sm p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cream/10 -rotate-45 translate-x-16 -translate-y-16" />
              <h3 className="font-serif text-2xl font-bold italic mb-8 border-b border-gray-50 pb-6">Brand & Contact</h3>
              
              <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 flex items-center gap-2">Business Name <Globe size={12} /></label>
                       <input name="businessName" defaultValue={settings?.businessName} className="w-full bg-gray-50 border-b-2 border-transparent focus:border-brand-terracotta outline-none px-4 py-4 text-sm font-bold shadow-sm transition-all rounded-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 flex items-center gap-2">Luxury Tagline <Star size={12} /></label>
                       <input name="tagline" defaultValue={settings?.tagline} className="w-full bg-gray-50 border-b-2 border-transparent focus:border-brand-terracotta outline-none px-4 py-4 text-sm font-bold shadow-sm transition-all rounded-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 flex items-center gap-2">Studio Email <Mail size={12} /></label>
                          <input name="email" defaultValue={settings?.email} className="w-full bg-gray-50 border-b-2 border-transparent focus:border-brand-terracotta outline-none px-4 py-4 text-xs font-bold shadow-sm transition-all rounded-none" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 flex items-center gap-2">Phone Line <Phone size={12} /></label>
                          <input name="phone" defaultValue={settings?.phone} className="w-full bg-gray-50 border-b-2 border-transparent focus:border-brand-terracotta outline-none px-4 py-4 text-xs font-bold shadow-sm transition-all rounded-none" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 flex items-center gap-2">Address Pin <MapPin size={12} /></label>
                       <input name="address" defaultValue={settings?.address} className="w-full bg-gray-50 border-b-2 border-transparent focus:border-brand-terracotta outline-none px-4 py-4 text-xs font-bold shadow-sm transition-all rounded-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 flex items-center gap-2">Business Hours <Clock size={12} /></label>
                       <input name="businessHours" defaultValue={settings?.businessHours} className="w-full bg-gray-50 border-b-2 border-transparent focus:border-brand-terracotta outline-none px-4 py-4 text-xs font-bold shadow-sm transition-all rounded-none" placeholder="Mon-Sat: 10am - 8pm" />
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 flex items-center gap-2">Social: Instagram <Instagram size={12} /></label>
                       <input name="instagram" defaultValue={settings?.socialLinks?.instagram} className="w-full bg-gray-50 border-b-2 border-transparent focus:border-brand-terracotta outline-none px-4 py-4 text-xs font-bold shadow-sm transition-all rounded-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 flex items-center gap-2">Social: Facebook <Facebook size={12} /></label>
                       <input name="facebook" defaultValue={settings?.socialLinks?.facebook} className="w-full bg-gray-50 border-b-2 border-transparent focus:border-brand-terracotta outline-none px-4 py-4 text-xs font-bold shadow-sm transition-all rounded-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 flex items-center gap-2">Social: Pinterest <Pinterest size={12} /></label>
                       <input name="pinterest" defaultValue={settings?.socialLinks?.pinterest} className="w-full bg-gray-50 border-b-2 border-transparent focus:border-brand-terracotta outline-none px-4 py-4 text-xs font-bold shadow-sm transition-all rounded-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 flex items-center gap-2">WhatsApp Channel <MessageCircle size={12} /></label>
                       <input name="whatsapp" defaultValue={settings?.whatsapp} className="w-full bg-gray-50 border-b-2 border-transparent focus:border-brand-terracotta outline-none px-4 py-4 text-xs font-bold shadow-sm transition-all rounded-none" placeholder="+1234567890" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 flex items-center gap-2">Google Maps Embed URL <MapPin size={12} /></label>
                       <input name="mapEmbedUrl" defaultValue={settings?.mapEmbedUrl} className="w-full bg-gray-50 border-b-2 border-transparent focus:border-brand-terracotta outline-none px-4 py-4 text-xs font-bold shadow-sm transition-all rounded-none" placeholder="https://www.google.com/maps/embed?..." />
                    </div>

                    <button type="submit" disabled={updateMutation.isPending} className="btn-primary w-full h-14 flex items-center justify-center gap-3 mt-10">
                       {updateMutation.isPending ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                       Synchronize All Data
                    </button>
                 </div>
              </form>
           </div>

           {/* Hero Showcase Manager */}
           <div className="lg:col-span-4 space-y-8">
              <div className="bg-white border border-gray-100 shadow-sm p-10 h-full flex flex-col items-center">
                 <h3 className="font-serif text-2xl font-bold italic mb-12 text-center">Hero Visuals</h3>
                 
                 <div className="w-full space-y-4 mb-12 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                    {settings?.heroImages?.map((img) => (
                      <div key={img.publicId} className="relative aspect-video group overflow-hidden border">
                         <img src={img.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                         <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <button 
                               onClick={() => deleteHeroMutation.mutate(img.publicId)}
                               className="p-3 bg-red-600 text-white shadow-xl hover:bg-red-800 transition-all scale-90 group-hover:scale-100"
                            >
                               <Trash2 size={16} />
                            </button>
                         </div>
                      </div>
                    ))}
                    {settings?.heroImages?.length === 0 && (
                       <div className="text-center py-12 bg-gray-50 text-gray-300 font-serif italic border-2 border-dashed border-gray-100 flex flex-col items-center gap-4">
                          <Eye size={36} className="opacity-10" />
                          No hero visuals active.
                       </div>
                    )}
                 </div>

                 <form onSubmit={handleHeroUpload} className="w-full space-y-4">
                    <div className="relative group p-10 border-2 border-dashed border-gray-200 hover:border-brand-terracotta transition-colors text-center cursor-pointer bg-brand-cream/5 shadow-inner">
                       <input type="file" multiple name="images" className="absolute inset-0 opacity-0 cursor-pointer" />
                       <Upload size={32} className="mx-auto text-gray-300 group-hover:text-brand-terracotta mb-4 transition-colors" />
                       <p className="font-black uppercase text-[10px] tracking-widest text-gray-400 group-hover:text-brand-terracotta">Select New Hero Assets</p>
                    </div>
                    <button type="submit" disabled={heroMutation.isPending} className="btn-primary w-full h-14 flex items-center justify-center gap-3">
                       {heroMutation.isPending ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
                       Upload Showcase
                    </button>
                 </form>
              </div>
           </div>
        </div>
      </div>
    );
};

export default AdminSettings;
