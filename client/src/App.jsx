import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/public/Home';
import CollectionDetails from './pages/public/CollectionDetails';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminInquiries from './pages/admin/AdminInquiries';
import AdminCollections from './pages/admin/AdminCollections';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminSettings from './pages/admin/AdminSettings';
import useAuthStore from './store/authStore';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/collection/:id" element={<CollectionDetails />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="collections" element={<AdminCollections />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<div className="h-screen flex items-center justify-center font-serif text-2xl">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
