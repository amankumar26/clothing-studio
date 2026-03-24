import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  review: { 
    type: String, 
    required: true,
    trim: true
  },
  rating: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: true 
  },
  avatar: { 
    url: String, 
    publicId: String 
  },
  approved: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
