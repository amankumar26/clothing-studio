import Testimonial from '../models/Testimonial.js';
import { emitToAdmins } from '../socket.js';

export const getApprovedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true }).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitTestimonial = async (req, res) => {
  try {
    const { name, review, rating } = req.body;
    const avatar = req.file ? {
      url: req.file.path,
      publicId: req.file.filename
    } : {};

    const testimonial = new Testimonial({ 
      name, 
      review, 
      rating, 
      avatar 
    });

    const savedTestimonial = await testimonial.save();
    emitToAdmins('new-testimonial', savedTestimonial);
    res.status(201).json(savedTestimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

    testimonial.approved = req.body.approved;
    const updatedTestimonial = await testimonial.save();
    res.json(updatedTestimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
    await testimonial.deleteOne();
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
