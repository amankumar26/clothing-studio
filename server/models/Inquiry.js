import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true,
    trim: true,
    lowercase: true
  },
  phone: { 
    type: String, 
    required: true,
    trim: true
  },
  clothingType: { 
    type: String, 
    required: true,
    enum: ['Kurta', 'Dress', 'Suit', 'Salwar Kameez', 'Blouse', 'Lehenga', 'Western', 'Other']
  },
  occasion: { 
    type: String,
    trim: true
  },
  fabricPreference: { 
    type: String,
    trim: true
  },
  measurements: { 
    type: String,
    trim: true
  },
  designDescription: { 
    type: String,
    trim: true
  },
  additionalNotes: { 
    type: String,
    trim: true
  },
  referenceImages: [{ 
    url: String, 
    publicId: String 
  }],
  status: { 
    type: String, 
    enum: ['new', 'reviewed', 'in-progress', 'completed'], 
    default: 'new' 
  },
  adminNotes: { 
    type: String,
    trim: true
  }
}, { timestamps: true });

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;
