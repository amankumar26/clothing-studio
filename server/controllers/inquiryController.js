import Inquiry from '../models/Inquiry.js';
import { sendEmail } from '../utils/email.js';
import { emitToAdmins, emitToPublic } from '../socket.js';

export const submitInquiry = async (req, res) => {
  try {
    const { 
      name, email, phone, clothingType, occasion, 
      fabricPreference, measurements, designDescription, additionalNotes 
    } = req.body;
    
    const referenceImages = req.files ? req.files.map(file => ({
      url: file.path,
      publicId: file.filename
    })) : [];

    const inquiry = new Inquiry({
      name,
      email,
      phone,
      clothingType,
      occasion,
      fabricPreference,
      measurements,
      designDescription,
      additionalNotes,
      referenceImages
    });

    const savedInquiry = await inquiry.save();

    // 1. Send confirmation email to customer
    const userEmailHtml = `
      <h1>Hello ${name},</h1>
      <p>Thank you for reaching out to Guddi. We've received your inquiry for a custom ${clothingType} design.</p>
      <p>Our team will review your requirements and contact you within 24 hours.</p>
      <p>Best Regards,<br>Guddi Team</p>
    `;
    await sendEmail(email, 'Your Quote Request - Guddi', userEmailHtml);

    // 2. Send notification to owner
    const adminEmailHtml = `
      <h1>New Custom Order Inquiry</h1>
      <table border="1" cellpadding="10" cellspacing="0">
        <tr><th>Name</th><td>${name}</td></tr>
        <tr><th>Email</th><td>${email}</td></tr>
        <tr><th>Phone</th><td>${phone}</td></tr>
        <tr><th>Clothing Type</th><td>${clothingType}</td></tr>
        <tr><th>Occasion</th><td>${occasion}</td></tr>
        <tr><th>Fabric Preference</th><td>${fabricPreference}</td></tr>
        <tr><th>Measurements</th><td>${measurements}</td></tr>
        <tr><th>Description</th><td>${designDescription}</td></tr>
        <tr><th>Additional Notes</th><td>${additionalNotes}</td></tr>
      </table>
      <p>Please check the admin dashboard for details.</p>
    `;
    await sendEmail(process.env.OWNER_EMAIL, 'New Inquiry Received!', adminEmailHtml);

    // WebSocket: Notify admin
    emitToAdmins('new-inquiry', savedInquiry);
    
    // Social Proof
    const count = await Inquiry.countDocuments();
    emitToPublic('inquiry-count', count);

    res.status(201).json(savedInquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getInquiries = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const inquiries = await Inquiry.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Inquiry.countDocuments(filter);
    res.json({
      inquiries,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalCount: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInquiryStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });

    inquiry.status = status || inquiry.status;
    inquiry.adminNotes = adminNotes !== undefined ? adminNotes : inquiry.adminNotes;

    const updatedInquiry = await inquiry.save();
    emitToAdmins('inquiry-updated', updatedInquiry);
    res.json(updatedInquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    await inquiry.deleteOne();
    res.json({ message: 'Inquiry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
