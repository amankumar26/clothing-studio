import express from 'express';
import { getCollections, getCollectionById } from '../controllers/collectionController.js';
import { getApprovedTestimonials, submitTestimonial } from '../controllers/testimonialController.js';
import { getSettings } from '../controllers/siteSettingsController.js';
import { submitInquiry } from '../controllers/inquiryController.js';
import { uploadMiddleware } from '../config/cloudinary.js';

const router = express.Router();

// Publicly readable content
router.get('/collections', getCollections);
router.get('/collections/:id', getCollectionById);
router.get('/testimonials', getApprovedTestimonials);
router.get('/settings', getSettings);

// Publicly submittable content
router.post('/inquiries', uploadMiddleware('inquiries', 5), submitInquiry);
router.post('/testimonials', uploadMiddleware('avatars', 1), submitTestimonial);

export default router;
