import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Search, ChevronDown, ChevronRight, MessageSquare, Phone, Mail, ExternalLink, Calendar, Trash2, Loader2, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminInquiries = () => {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['adminInquiries', filter, search],
    queryFn: () => axios.get(`${API_URL}/admin/inquiries`, {
      params: { status: filter, search }
    }).then(res => res.data)
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status, adminNotes }) => 
      axios.patch(`${API_URL}/admin/inquiries/${id}`, { status, adminNotes }),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminInquiries']);
      toast.success('Inquiry status updated successfully.');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`${API_URL}/admin/inquiries/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminInquiries']);
      toast.success('Inquiry deleted.');
    }
  });

  const handleUpdate = (e, id) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    updateMutation.mutate({
      id,
      status: formData.get('status'),
      adminNotes: formData.get('adminNotes')
    });
  };

  const statusList = [
    { label: 'All Inquiries', value: '' },
    { label: 'Unread (New)', value: 'new' },
    { label: 'Reviewed', value: 'reviewed' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' },
  ];

  if (isLoading) return <div className="p-20 text-center text-brand-terracotta"><Loader2 className="animate-spin mx-auto mb-4" /> Loading Inquiries...</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:row justify-between items-end gap-6">
        <div>
           <h1 className="font-serif text-3xl font-bold text-gray-900 italic">Manage Inquiries</h1>
           <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-1">Review and respond to custom design requests.</p>
        </div>
        
        <div className="flex flex-col sm:row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
               type="text" 
               placeholder="Search name or email..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="bg-white border-b-2 border-transparent focus:border-brand-terracotta transition-all outline-none pl-12 pr-6 py-3 text-sm rounded-none w-full md:w-64 shadow-sm"
            />
          </div>
          <select 
             value={filter} 
             onChange={(e) => setFilter(e.target.value)}
             className="bg-brand-dark text-white px-6 py-3 text-xs uppercase font-bold tracking-widest outline-none cursor-pointer rounded-none border-0"
          >
            {statusList.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-gray-400 font-black border-b border-gray-50 bg-gray-50/10">
                <th className="py-6 pl-8">Inquiry Detail</th>
                <th className="py-6">Date Submitted</th>
                <th className="py-6">Status</th>
                <th className="py-6 pr-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-medium">
              {data?.inquiries?.map((inq) => (
                <React.Fragment key={inq._id}>
                  <tr className={`group transition-colors ${expandedId === inq._id ? 'bg-brand-cream/10' : 'hover:bg-gray-50'}`}>
                    <td className="py-8 pl-8 flex flex-col gap-1">
                      <span className="text-brand-dark font-serif text-lg font-bold group-hover:text-brand-terracotta transition-colors">{inq.name}</span>
                      <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                         <span className="flex items-center gap-1"><Mail size={12} /> {inq.email}</span>
                         <span className="flex items-center gap-1 border-l pl-4 border-gray-100"><Phone size={12} /> {inq.phone}</span>
                      </div>
                    </td>
                    <td className="py-8 text-gray-400 text-sm italic">
                      <div className="flex items-center gap-2"><Calendar size={14} /> {new Date(inq.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="py-8">
                       <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-2 rounded-none ${
                        inq.status === 'new' ? 'bg-blue-100 text-blue-700' : 
                        inq.status === 'reviewed' ? 'bg-yellow-100 text-yellow-700' : 
                        inq.status === 'in-progress' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {inq.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-8 pr-8 text-right space-x-2">
                       <button 
                         onClick={() => setExpandedId(expandedId === inq._id ? null : inq._id)}
                         className="p-3 bg-gray-100 hover:bg-brand-terracotta hover:text-white transition-all text-gray-500 rounded-none shadow-sm group-hover:scale-110"
                       >
                         {expandedId === inq._id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                       </button>
                       <button 
                         onClick={() => deleteMutation.mutate(inq._id)}
                         className="p-3 bg-red-50 hover:bg-red-600 hover:text-white transition-all text-red-400 rounded-none shadow-sm"
                       >
                         <Trash2 size={14} />
                       </button>
                    </td>
                  </tr>
                  
                  {/* Expanded Detail View */}
                  <AnimatePresence>
                  {expandedId === inq._id && (
                    <tr>
                      <td colSpan="4" className="bg-white">
                        <motion.div 
                           initial={{ opacity: 0, height: 0 }}
                           animate={{ opacity: 1, height: 'auto' }}
                           exit={{ opacity: 0, height: 0 }}
                           className="p-12 overflow-hidden border-t border-brand-cream/40"
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                             {/* Client Request */}
                             <div className="space-y-10">
                                <div>
                                   <label className="text-[10px] uppercase font-black tracking-widest text-brand-terracotta mb-4 block">Design Description</label>
                                   <p className="text-gray-800 text-lg leading-relaxed font-serif italic italic font-medium p-4 bg-brand-cream/5 border-l-2 border-brand-terracotta">
                                      "{inq.designDescription}"
                                   </p>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                   <div>
                                      <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 block mb-2">Category</label>
                                      <p className="font-bold underline decoration-brand-terracotta underline-offset-4 decoration-2">{inq.clothingType}</p>
                                   </div>
                                   <div>
                                      <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 block mb-2">Occasion</label>
                                      <p className="font-bold">{inq.occasion || 'General'}</p>
                                   </div>
                                   <div>
                                      <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 block mb-2">Fabric Choice</label>
                                      <p className="font-bold">{inq.fabricPreference || 'Not Specified'}</p>
                                   </div>
                                   <div>
                                      <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 block mb-2">Measurements</label>
                                      <p className="font-bold">{inq.measurements || 'To be taken'}</p>
                                   </div>
                                </div>

                                {inq.referenceImages?.length > 0 && (
                                   <div>
                                      <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-4 block">Style References</label>
                                      <div className="flex flex-wrap gap-4">
                                        {inq.referenceImages.map((img, i) => (
                                           <a key={i} href={img.url} target="_blank" rel="noreferrer" className="w-24 h-32 bg-gray-50 border group relative overflow-hidden">
                                              <img src={img.url} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500" />
                                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"><ExternalLink size={14} /></div>
                                           </a>
                                        ))}
                                      </div>
                                   </div>
                                )}
                             </div>

                             {/* Management Form */}
                             <form onSubmit={(e) => handleUpdate(e, inq._id)} className="space-y-8 bg-gray-50/50 p-8 border border-gray-100 shadow-inner">
                                <h4 className="font-serif text-xl font-bold italic border-b border-gray-200 pb-4">Update Management Status</h4>
                                <div className="space-y-2">
                                   <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">Workflow Status</label>
                                   <select name="status" defaultValue={inq.status} className="w-full bg-white border border-gray-200 p-4 text-sm font-bold shadow-sm rounded-none focus:border-brand-terracotta outline-none">
                                      <option value="new">New / Unread</option>
                                      <option value="reviewed">Reviewed & Analyzed</option>
                                      <option value="in-progress">In Active Production</option>
                                      <option value="completed">Delivered & Closed</option>
                                   </select>
                                </div>
                                <div className="space-y-2">
                                   <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">Internal Admin Notes</label>
                                   <textarea name="adminNotes" defaultValue={inq.adminNotes} rows="5" className="w-full bg-white border border-gray-200 p-4 text-sm font-medium shadow-sm outline-none focus:border-brand-terracotta resize-none" placeholder="Enter private details about fabrication progress, cost estimates, or customer conversation notes..."></textarea>
                                </div>
                                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2" disabled={updateMutation.isPending}>
                                   {updateMutation.isPending ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                   Save Management Data
                                </button>
                             </form>
                          </div>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminInquiries;
