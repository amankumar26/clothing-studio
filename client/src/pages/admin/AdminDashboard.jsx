import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ShoppingBag, MessageSquare, Star, Clock, ArrowUpRight, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {

  const { data: inquiries } = useQuery({
    queryKey: ['adminInquiries'],
    queryFn: () => axios.get(`${API_URL}/admin/inquiries?limit=5`).then(res => res.data)
  });

  const { data: collections } = useQuery({
    queryKey: ['adminCollections'],
    queryFn: () => axios.get(`${API_URL}/admin/collections?limit=1`).then(res => res.data)
  });

  const { data: testimonials } = useQuery({
    queryKey: ['adminTestimonials'],
    queryFn: () => axios.get(`${API_URL}/admin/testimonials`).then(res => res.data)
  });

  const stats = [
    { label: 'Total Inquiries', value: inquiries?.totalCount || 0, icon: <MessageSquare className="text-blue-500" />, trend: '+12%', color: 'bg-blue-50' },
    { label: 'New Inquiries', value: inquiries?.inquiries?.filter(i => i.status === 'new').length || 0, icon: <Clock className="text-orange-500" />, trend: '+5%', color: 'bg-orange-50' },
    { label: 'Collections', value: collections?.totalCount || 0, icon: <ShoppingBag className="text-purple-500" />, trend: '0%', color: 'bg-purple-50' },
    { label: 'Pending Reviews', value: testimonials?.filter(t => !t.approved).length || 0, icon: <Star className="text-yellow-500" />, trend: '+20%', color: 'bg-yellow-50' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-serif text-3xl font-bold text-gray-900 italic">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 font-medium tracking-tight mt-1 uppercase">Welcome back to Guddi manager.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 ${stat.color} rounded-none`}>
                {stat.icon}
              </div>
              <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">{stat.label}</h3>
            <p className="text-4xl font-serif font-black text-brand-dark">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inquiries List */}
        <div className="lg:col-span-8 bg-white border border-gray-100 shadow-sm">
           <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/10">
              <h3 className="font-serif text-xl font-bold italic">Recent Inquiries</h3>
              <a href="/admin/inquiries" className="text-xs uppercase font-bold tracking-widest text-brand-terracotta hover:gap-3 transition-all flex items-center gap-2">View All Inquiries <ArrowUpRight size={14} /></a>
           </div>
           <div className="overflow-x-auto p-4 md:p-8">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-gray-400 font-black border-b border-gray-50">
                    <th className="pb-4 pl-4">Customer</th>
                    <th className="pb-4">Category</th>
                    <th className="pb-4">Date</th>
                    <th className="pb-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm font-medium">
                  {inquiries?.inquiries?.map((inq) => (
                    <tr key={inq._id} className="group hover:bg-gray-50 transition-colors">
                      <td className="py-6 pl-4 flex flex-col gap-1">
                        <span className="text-brand-dark group-hover:text-brand-terracotta transition-colors">{inq.name}</span>
                        <span className="text-[10px] text-gray-400 opacity-60 uppercase">{inq.email}</span>
                      </td>
                      <td className="py-6 italic text-gray-500">{inq.clothingType}</td>
                      <td className="py-6 text-gray-400">{new Date(inq.createdAt).toLocaleDateString()}</td>
                      <td className="py-6 text-right">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 ${
                          inq.status === 'new' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                        }`}>
                          {inq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {inquiries?.inquiries?.length === 0 && (
                     <tr><td colSpan="4" className="py-12 text-center text-gray-400 italic">No inquiries found yet.</td></tr>
                  )}
                </tbody>
              </table>
           </div>
        </div>

        {/* Quick Links / Actions */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-brand-dark text-white p-10 relative overflow-hidden h-full flex flex-col justify-end min-h-[400px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-terracotta opacity-20 rotate-45 translate-x-16 -translate-y-16" />
              <TrendingUp className="text-brand-terracotta mb-8 group-hover:scale-110 transition-transform" size={48} />
              <h4 className="text-[10px] uppercase tracking-widest font-black text-brand-terracotta mb-2">Project Vision</h4>
              <h3 className="text-3xl font-serif font-bold italic mb-6">Drive Sales through Quality Craftsmanship.</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-10 border-l border-white/10 pl-6">
                Keep the collection updated with seasonal trends to attract more inquiries and build a lasting brand identity.
              </p>
              <button className="btn-primary bg-white text-brand-dark hover:bg-brand-terracotta hover:text-white border-0 transition-colors">
                Publish Update
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
