import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { LogIn, Loader2, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import useAuthStore from '../../store/authStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/admin/login`, data);
      login(response.data.user, response.data.token);
      toast.success('Welcome Back, Administrator!', {
        icon: '🔐',
        style: { borderRadius: '0', background: '#1A1A1A', color: '#fff' }
      });
      navigate('/admin/dashboard');
    } catch (error) {
       toast.error(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-brand-cream/30 font-sans">
      {/* Left Decoration */}
      <div className="hidden lg:flex flex-col items-center justify-center p-20 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1200')] bg-cover opacity-20 mix-blend-overlay" />
        <div className="relative z-10 text-center">
           <h2 className="font-serif text-5xl font-bold italic mb-6">Management Portal</h2>
           <p className="max-w-md text-white/50 text-sm tracking-widest leading-loose uppercase">
             Control your collections, inquiries, and customer presence from one central dashboard.
           </p>
           <div className="w-20 h-1 bg-brand-terracotta mx-auto mt-10" />
        </div>
      </div>

      {/* Login Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md p-10 bg-white shadow-2xl space-y-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-brand-terracotta" />
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-brand-dark">Sign In</h1>
            <p className="text-sm text-gray-400 font-medium">Please enter your administrative credentials.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-brand-dark opacity-60 ml-1">Email</label>
              <input 
                 type="email" 
                 {...register('email', { required: 'Email is required' })}
                 className="w-full bg-gray-50 border-b-2 border-transparent focus:border-brand-terracotta focus:bg-white transition-all outline-none px-4 py-4 rounded-none h-12 text-sm"
                 placeholder="admin@brand.com"
              />
              {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-brand-dark opacity-60 ml-1">Password</label>
              <input 
                 type="password" 
                 {...register('password', { required: 'Password is required' })}
                 className="w-full bg-gray-50 border-b-2 border-transparent focus:border-brand-terracotta focus:bg-white transition-all outline-none px-4 py-4 rounded-none h-12 text-sm"
                 placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.password.message}</p>}
            </div>

            <button
               type="submit"
               disabled={loading}
               className="btn-primary w-full flex items-center justify-center gap-3 h-14"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Authorize Access
                </>
              )}
            </button>
          </form>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <button 
               type="button" 
               className="text-[10px] font-bold text-gray-400 hover:text-brand-terracotta transition-colors uppercase tracking-widest"
               onClick={() => navigate('/')}
            >
              ← Back to site
            </button>
            <span className="text-[10px] text-gray-300 uppercase tracking-widest">Version 1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
