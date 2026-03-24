import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Star, CheckCircle, XCircle, Trash2, Loader2, MessageSquare, Quote, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminTestimonials = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['adminTestimonials'],
    queryFn: () => axios.get(`${API_URL}/admin/testimonials`).then(res => res.data)
  });

  const approveMutation = useMutation({
    mutationFn: ({ id, approved }) => 
      axios.patch(`${API_URL}/admin/testimonials/${id}/approve`, { approved }),
    onSuccess: (res) => {
      queryClient.invalidateQueries(['adminTestimonials']);
      toast.success(res.data.approved ? 'Review Published!' : 'Review Hidden.');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`${API_URL}/admin/testimonials/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminTestimonials']);
      toast.success('Review deleted permanently.');
    }
  });

  if (isLoading) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto mb-4" /> Retrieving Feedbacks...</div>;

  return (
    <div className="space-y-8">
      <div>
         <h1 className="font-serif text-3xl font-bold text-gray-900 italic">Client Feedback</h1>
         <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-1">Review and curate customer testimonials for social proof.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {data?.map((test) => (
          <motion.div 
            key={test._id} 
            layout
            className={`bg-white border p-12 transition-all relative group shadow-sm ${
              test.approved ? 'border-brand-terracotta/20 bg-brand-cream/5' : 'border-gray-100'
            }`}
          >
            <div className={`absolute top-0 right-0 w-2 h-full ${test.approved ? 'bg-green-500' : 'bg-gray-200'}`} />
            <Quote className="absolute top-12 right-12 text-brand-terracotta/5" size={80} />

            <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
               <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-brand-cream flex items-center justify-center font-bold text-brand-terracotta border-2 border-white shadow-xl overflow-hidden rounded-none">
                     {test.avatar?.url ? <img src={test.avatar.url} className="w-full h-full object-cover" /> : test.name.charAt(0)}
                  </div>
                  <div>
                     <h3 className="font-serif text-xl font-bold italic">{test.name}</h3>
                     <p className="text-[10px] items uppercase font-black tracking-widest text-gray-300 flex items-center gap-1"><Calendar size={10} /> {new Date(test.createdAt).toLocaleDateString()}</p>
                  </div>
               </div>
               
               <div className="flex gap-1 text-brand-terracotta">
                 {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < test.rating ? "currentColor" : "none"} />)}
               </div>
            </div>

            <p className="font-medium text-gray-700 text-lg leading-relaxed font-serif italic mb-10 border-l-2 border-brand-terracotta/10 pl-8">
              "{test.review}"
            </p>

            <div className="flex justify-between items-center pt-8 border-t border-gray-100">
               <div className="flex gap-4">
                  <button 
                    onClick={() => approveMutation.mutate({ id: test._id, approved: !test.approved })}
                    className={`flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${
                      test.approved 
                      ? 'bg-gray-100 text-gray-400 hover:bg-gray-200' 
                      : 'bg-green-600 text-white hover:bg-green-800'
                    }`}
                  >
                    {test.approved ? <><XCircle size={14} /> Unpublish</> : <><CheckCircle size={14} /> Approve & Publish</>}
                  </button>
                  <button 
                    onClick={() => deleteMutation.mutate(test._id)}
                    className="p-3 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                  >
                    <Trash2 size={16} />
                  </button>
               </div>
               
               <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-white border border-gray-200 shadow-sm ${test.approved ? 'text-green-500' : 'text-gray-300'}`}>
                  {test.approved ? 'Visible' : 'Draft'}
               </span>
            </div>
          </motion.div>
        ))}
        {data?.length === 0 && (
           <div className="col-span-full py-20 bg-gray-50 text-center font-serif italic text-gray-400 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-4">
             <MessageSquare size={48} className="opacity-10" />
             No feedback received yet. Submit a test testimonial from the public site if needed.
           </div>
        )}
      </div>
    </div>
  );
};

export default AdminTestimonials;
