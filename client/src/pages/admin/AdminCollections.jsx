import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Plus, Trash2, Edit2, X, Upload, Loader2, Save, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminCollections = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['adminCollections'],
    queryFn: () => axios.get(`${API_URL}/admin/collections`).then(res => res.data)
  });

  const mutation = useMutation({
    mutationFn: (formData) => {
      if (editingCollection) {
        return axios.put(`${API_URL}/admin/collections/${editingCollection._id}`, formData);
      }
      return axios.post(`${API_URL}/admin/collections`, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['adminCollections']);
      toast.success(editingCollection ? 'Collection updated' : 'Collection created');
      closeModal();
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Action failed')
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`${API_URL}/admin/collections/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminCollections']);
      toast.success('Collection deleted permanently.');
    }
  });

  const removeImgMutation = useMutation({
    mutationFn: ({ id, imgId }) => axios.delete(`${API_URL}/admin/collections/${id}/images/${imgId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminCollections']);
      toast.success('Image removed from collection.');
    }
  });

  const openModal = (col = null) => {
    setEditingCollection(col);
    setIsModalOpen(true);
  };

  const closeModal = () => {
     setEditingCollection(null);
     setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    mutation.mutate(formData);
  };

  if (isLoading) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto mb-4" /> Loading Portfolio...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="font-serif text-3xl font-bold text-gray-900 italic">Portfolio Management</h1>
           <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-1">Showcase your best designs to the world.</p>
        </div>
        <button 
           onClick={() => openModal()}
           className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} /> New Collection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.collections?.map((col) => (
          <motion.div 
            key={col._id} 
            layout
            className="group bg-white border border-gray-100 shadow-sm relative overflow-hidden"
          >
            <div className="aspect-[3/4] h-full relative overflow-hidden">
               <img src={col.images[0]?.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
               <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 text-white">
                  <span className="text-[9px] uppercase tracking-widest font-black text-brand-terracotta mb-2 bg-white/10 w-fit px-2 py-1">{col.category}</span>
                  <h3 className="font-serif text-xl font-bold italic mb-4">{col.title}</h3>
                  <div className="flex gap-2">
                     <button onClick={() => openModal(col)} className="p-3 bg-white text-brand-dark hover:bg-brand-terracotta hover:text-white transition-all shadow-xl"><Edit2 size={14} /></button>
                     <button onClick={() => deleteMutation.mutate(col._id)} className="p-3 bg-red-500 text-white hover:bg-red-700 transition-all shadow-xl"><Trash2 size={14} /></button>
                  </div>
               </div>
            </div>
            <div className="p-6 border-t border-gray-50 flex justify-between items-center">
               <span className="text-[10px] uppercase font-black tracking-widest text-gray-400 flex items-center gap-1">
                 <ImageIcon size={12} /> {col.images?.length || 0} Assets
               </span>
               <div className="flex gap-1">
                 {[...Array(3)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-brand-terracotta/20" />)}
               </div>
            </div>
          </motion.div>
        ))}
        {data?.collections?.length === 0 && (
           <div className="col-span-full py-20 bg-gray-50 text-center font-serif italic text-gray-400 border-2 border-dashed border-gray-200">No collections published yet. Click "New Collection" to begin.</div>
        )}
      </div>

      {/* Upload/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
             <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm" onClick={closeModal} 
             />
             <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl rounded-none p-10 md:p-16"
             >
                <button onClick={closeModal} className="absolute top-8 right-8 text-gray-400 hover:text-brand-dark transition-colors"><X size={24} /></button>
                
                <h2 className="font-serif text-3xl font-bold italic mb-2">{editingCollection ? 'Refine Collection' : 'Create New Collection'}</h2>
                <p className="text-[10px] items uppercase font-black tracking-widest text-brand-terracotta mb-10 pb-8 border-b-2 border-brand-cream w-fit border-double pr-8">Curate Exhibit Metadata</p>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-8">
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Exhibit Title</label>
                         <input name="title" defaultValue={editingCollection?.title} required className="w-full bg-gray-50 border-b-2 border-transparent focus:border-brand-terracotta outline-none px-4 py-4 text-sm font-bold shadow-sm transition-all rounded-none" placeholder="e.g. Summer Bridal Elegance" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Classification Category</label>
                         <select name="category" defaultValue={editingCollection?.category || 'Bridal'} className="w-full bg-gray-50 border-b-2 border-transparent focus:border-brand-terracotta outline-none px-4 py-4 text-sm font-bold shadow-sm transition-all appearance-none cursor-pointer rounded-none">
                            <option value="Bridal">Bridal Couture</option>
                            <option value="Casual">Casual Sophistication</option>
                            <option value="Ethnic">Traditional Ethnic</option>
                            <option value="Western">Western Luxury</option>
                            <option value="Formal">Formal Bespoke</option>
                            <option value="Kids">Mini Collections (Kids)</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Creative Narrative (Description)</label>
                         <textarea name="description" defaultValue={editingCollection?.description} rows="3" className="w-full bg-gray-50 border-b-2 border-transparent focus:border-brand-terracotta outline-none px-4 py-4 text-sm font-medium shadow-sm transition-all resize-none rounded-none" placeholder="Tell the story behind this collection..."></textarea>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Current Price (₹)</label>
                            <input type="number" step="0.01" name="price" defaultValue={editingCollection?.price} className="w-full bg-gray-50 border-b-2 border-transparent focus:border-brand-terracotta outline-none px-4 py-4 text-sm font-bold shadow-sm transition-all rounded-none" placeholder="1999" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Original Price (₹)</label>
                            <input type="number" step="0.01" name="compareAtPrice" defaultValue={editingCollection?.compareAtPrice} className="w-full bg-gray-50 border-b-2 border-transparent focus:border-brand-terracotta outline-none px-4 py-4 text-sm font-bold shadow-sm transition-all rounded-none" placeholder="2999" />
                        </div>
                      </div>
                      <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Brand / Sub-Label</label>
                          <input name="label" defaultValue={editingCollection?.label} className="w-full bg-gray-50 border-b-2 border-transparent focus:border-brand-terracotta outline-none px-4 py-4 text-sm font-bold shadow-sm transition-all rounded-none" placeholder="e.g. Label, Fabindia, Nauti Nati" />
                      </div>
                   </div>

                   <div className="space-y-8">
                      <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Multi-Asset Media Upload</label>
                          <div className="relative group p-10 border-2 border-dashed border-gray-200 hover:border-brand-terracotta transition-all text-center cursor-pointer bg-brand-cream/5 shadow-inner">
                             <input type="file" multiple name="images" className="absolute inset-0 opacity-0 cursor-pointer" />
                             <Upload size={32} className="mx-auto text-gray-300 group-hover:text-brand-terracotta mb-4 transition-colors" />
                             <p className="font-black uppercase text-[10px] tracking-widest text-gray-400 group-hover:text-brand-terracotta">Click to select high-res assets</p>
                             <p className="text-[9px] text-gray-300 mt-1">Multi-upload supported (JPG, PNG, WEBP)</p>
                          </div>
                      </div>

                      {editingCollection && (
                        <div className="space-y-4">
                           <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Existing Media Gallery</label>
                           <div className="grid grid-cols-4 gap-2">
                              {editingCollection.images?.map((img) => (
                                <div key={img._id} className="relative aspect-[3/4] bg-gray-100 group">
                                   <img src={img.url} className="w-full h-full object-cover" />
                                   <button 
                                      type="button"
                                      onClick={() => removeImgMutation.mutate({ id: editingCollection._id, imgId: img._id })}
                                      className="absolute top-1 right-1 p-1.5 bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                   >
                                      <Trash2 size={10} />
                                   </button>
                                </div>
                              ))}
                           </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4 pt-10">
                         <button type="submit" disabled={mutation.isPending} className="btn-primary flex-grow h-14 flex items-center justify-center gap-3">
                            {mutation.isPending ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            Finalize Publication
                         </button>
                      </div>
                   </div>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCollections;
