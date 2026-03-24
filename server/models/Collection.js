import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String,
    trim: true
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Bridal', 'Casual', 'Ethnic', 'Western', 'Formal', 'Kids']
  },
  price: {
    type: Number,
    min: 0
  },
  compareAtPrice: {
    type: Number,
    min: 0
  },
  label: { 
    type: String,
    trim: true
  },
  images: [{ 
    url: String, 
    publicId: String, 
    alt: String 
  }],
  featured: { 
    type: Boolean, 
    default: false 
  },
  order: { 
    type: Number, 
    default: 0 
  }
}, { timestamps: true });

const Collection = mongoose.model('Collection', collectionSchema);
export default Collection;
