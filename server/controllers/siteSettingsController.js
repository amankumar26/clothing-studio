import SiteSettings from '../models/SiteSettings.js';
import { cloudinary } from '../config/cloudinary.js';

export const getSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings();
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const { 
      businessName, tagline, email, phone, whatsapp, 
      address, mapEmbedUrl, socialLinks, businessHours 
    } = req.body;

    let settings = await SiteSettings.findOne();
    if (!settings) settings = new SiteSettings();

    settings.businessName = businessName || settings.businessName;
    settings.tagline = tagline || settings.tagline;
    settings.email = email || settings.email;
    settings.phone = phone || settings.phone;
    settings.whatsapp = whatsapp || settings.whatsapp;
    settings.address = address || settings.address;
    settings.mapEmbedUrl = mapEmbedUrl || settings.mapEmbedUrl;
    settings.socialLinks = socialLinks || settings.socialLinks;
    settings.businessHours = businessHours || settings.businessHours;

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateHeroImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images provided' });
    }

    let settings = await SiteSettings.findOne();
    if (!settings) settings = new SiteSettings();

    const newHeroImages = req.files.map(file => ({
      url: file.path,
      publicId: file.filename
    }));

    settings.heroImages = [...settings.heroImages, ...newHeroImages];
    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteHeroImage = async (req, res) => {
  try {
    const { publicId } = req.body;
    let settings = await SiteSettings.findOne();
    if (!settings) return res.status(404).json({ message: 'Settings not found' });

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    settings.heroImages = settings.heroImages.filter(img => img.publicId !== publicId);
    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
