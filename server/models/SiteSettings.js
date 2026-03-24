import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
  businessName: { type: String, default: 'Guddi' },
  tagline: { type: String, default: 'Crafting Your Unique Style' },
  email: { type: String, default: 'studio@brand.com' },
  phone: { type: String, default: '+1 (555) 123-4567' },
  whatsapp: { type: String, default: '+15551234567' },
  address: { type: String, default: '123 Style Street, Fashion City' },
  mapEmbedUrl: { type: String, default: '' },
  socialLinks: {
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    pinterest: { type: String, default: '' }
  },
  heroImages: [{ 
    url: String, 
    publicId: String 
  }],
  businessHours: { type: String, default: 'Mon-Sat: 10am - 8pm' }
}, { timestamps: true });

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);
export default SiteSettings;
