import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const CollectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: Number,
  compareAtPrice: Number,
  label: String,
  images: [{
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  }],
  status: { type: String, enum: ['draft', 'published'], default: 'published' }
}, { timestamps: true });

const Collection = mongoose.models.Collection || mongoose.model('Collection', CollectionSchema);

const mocks = [
    {
      title: 'Silk Ivory Bridal Lehenga',
      label: 'House of Dress',
      compareAtPrice: 12500,
      price: 8990,
      category: 'Bridal',
      description: 'Elegant silk bridal lehenga with intricate ivory detailing.',
      images: [{ url: 'https://images.unsplash.com/photo-1594235412402-bbaaec2df157?q=80&w=800', public_id: 'mock_img_1' }]
    },
    {
      title: 'Benares Velvet Gown',
      label: 'Label',
      compareAtPrice: 8500,
      price: 6400,
      category: 'Evening',
      description: 'Luxurious velvet gown perfect for evening galas.',
      images: [{ url: 'https://images.unsplash.com/photo-1594751439417-df7a69ca4711?q=80&w=800', public_id: 'mock_img_2' }]
    },
    {
      title: 'Jaipur Cotton Kurti Set',
      label: 'Indi Inside',
      compareAtPrice: 4200,
      price: 2800,
      category: 'Casual',
      description: 'Breathable authentic Jaipur cotton printed sets.',
      images: [{ url: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=800', public_id: 'mock_img_3' }]
    },
    {
      title: 'Embroidered Silk Saree',
      label: 'Goldy',
      compareAtPrice: 18000,
      price: 14500,
      category: 'Bridal',
      description: 'Hand-woven pure embroidered silk saree.',
      images: [{ url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800', public_id: 'mock_img_4' }]
    },
    {
      title: 'Royal Anarkali Suit',
      label: 'Anaya',
      compareAtPrice: 9500,
      price: 7200,
      category: 'Evening',
      description: 'A beautifully structured anarkali with royal styling.',
      images: [{ url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800', public_id: 'mock_img_5' }]
    }
];

const fullMocks = [...mocks, ...mocks, ...mocks];

async function seed() {
  try {
    console.log('Connecting to', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
    await Collection.deleteMany({});
    console.log('Cleared existing collections');
    await Collection.insertMany(fullMocks);
    console.log('Seeded 15 collections successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}
seed();
