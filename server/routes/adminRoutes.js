import express from 'express';
import { protect } from '../middleware/auth.js';
import { login } from '../controllers/adminController.js';
import { 
  getInquiries, updateInquiryStatus, deleteInquiry 
} from '../controllers/inquiryController.js';
import { 
  createCollection, updateCollection, deleteCollection, removeImage 
} from '../controllers/collectionController.js';
import { 
  getAllTestimonials, approveTestimonial, deleteTestimonial 
} from '../controllers/testimonialController.js';
import { 
  updateSettings, updateHeroImages, deleteHeroImage 
} from '../controllers/siteSettingsController.js';
import { uploadMiddleware } from '../config/cloudinary.js';

const router = express.Router();

// Admin login
router.post('/login', login);

// Protect all following routes
router.use(protect);

// Dashboard / Stats
router.get('/inquiries', getInquiries);
router.patch('/inquiries/:id', updateInquiryStatus);
router.delete('/inquiries/:id', deleteInquiry);

// Collection CRUD
router.post('/collections', uploadMiddleware('collections', 10), createCollection);
router.put('/collections/:id', uploadMiddleware('collections', 10), updateCollection);
router.delete('/collections/:id', deleteCollection);
router.delete('/collections/:id/images/:imgId', removeImage);

// Testimonials management
router.get('/testimonials', getAllTestimonials);
router.patch('/testimonials/:id/approve', approveTestimonial);
router.delete('/testimonials/:id', deleteTestimonial);

// Site Settings
router.put('/settings', updateSettings);
router.post('/settings/hero-images', uploadMiddleware('hero', 10), updateHeroImages);
router.delete('/settings/hero-images', deleteHeroImage);

export default router;
