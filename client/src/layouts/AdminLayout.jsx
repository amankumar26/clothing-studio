import { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, MessageSquare, Star, Settings, LogOut, Bell } from 'lucide-react';
import { toast } from 'react-hot-toast';
import io from 'socket.io-client';
import useAuthStore from '../store/authStore';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

const AdminLayout = () => {
  const { logout, token } = useAuthStore();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Admin socket namespace connection
    const adminSocket = io(`${SOCKET_URL}/admin`, {
      auth: { token },
    });

    adminSocket.on('connect', () => {
      console.log('Connected to admin socket');
    });

    adminSocket.on('new-inquiry', (inquiry) => {
      toast.success(`New Inquiry from ${inquiry.name}!`, { 
        duration: 5000,
        icon: <Bell className="text-brand-terracotta" />
      });
      setUnreadCount(prev => prev + 1);
    });

    adminSocket.on('new-testimonial', (testimonial) => {
      toast(`New Review from ${testimonial.name}`, { icon: '⭐' });
    });

    return () => {
      adminSocket.disconnect();
    };
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { title: 'Inquiries', icon: <MessageSquare size={20} />, path: '/admin/inquiries', badge: unreadCount },
    { title: 'Collections', icon: <ShoppingBag size={20} />, path: '/admin/collections' },
    { title: 'Testimonials', icon: <Star size={20} />, path: '/admin/testimonials' },
    { title: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark text-white flex flex-col pt-8">
        <div className="px-6 mb-10">
          <h1 className="font-serif text-2xl font-bold italic tracking-tighter">Guddi</h1>
          <p className="text-xs text-brand-terracotta tracking-widest mt-1 opacity-80">ADMIN PANEL</p>
        </div>

        <nav className="flex-grow px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => item.path === '/admin/inquiries' && setUnreadCount(0)}
              className={({ isActive }) => 
                `flex items-center justify-between px-4 py-3 rounded-none transition-colors ${
                  isActive 
                  ? 'bg-brand-terracotta text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`
              }
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span className="font-medium">{item.title}</span>
              </div>
              {item.badge > 0 && (
                <span className="bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 text-red-300 hover:bg-white/5 transition-colors text-sm"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow overflow-y-auto bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
