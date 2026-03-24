import Collection from '../models/Collection.js';
import { cloudinary } from '../config/cloudinary.js';

export const getCollections = async (req, res) => {
  try {
    const { category, featured, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (featured) filter.featured = featured === 'true';

    const collections = await Collection.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Collection.countDocuments(filter);
    res.json({
      collections,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalCount: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) return res.status(404).json({ message: 'Collection not found' });
    res.json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCollection = async (req, res) => {
  try {
    const { title, description, category, featured, order, price, compareAtPrice, label } = req.body;
    const images = req.files ? req.files.map(file => ({
      url: file.path,
      publicId: file.filename,
      alt: title 
    })) : [];

    const collection = new Collection({
      title,
      description,
      category,
      featured,
      order,
      price,
      compareAtPrice,
      label,
      images
    });

    const savedCollection = await collection.save();
    res.status(201).json(savedCollection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCollection = async (req, res) => {
  try {
    const { title, description, category, featured, order, price, compareAtPrice, label } = req.body;
    const collection = await Collection.findById(req.params.id);
    if (!collection) return res.status(404).json({ message: 'Collection not found' });

    collection.title = title || collection.title;
    collection.description = description || collection.description;
    collection.category = category || collection.category;
    collection.featured = featured !== undefined ? featured : collection.featured;
    collection.order = order || collection.order;
    collection.price = price !== undefined ? price : collection.price;
    collection.compareAtPrice = compareAtPrice !== undefined ? compareAtPrice : collection.compareAtPrice;
    collection.label = label || collection.label;

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        url: file.path,
        publicId: file.filename,
        alt: title || collection.title
      }));
      collection.images = [...collection.images, ...newImages];
    }

    const updatedCollection = await collection.save();
    res.json(updatedCollection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) return res.status(404).json({ message: 'Collection not found' });

    // Delete images from Cloudinary
    for (const img of collection.images) {
      if (img.publicId) {
        await cloudinary.uploader.destroy(img.publicId);
      }
    }

    await collection.deleteOne();
    res.json({ message: 'Collection deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeImage = async (req, res) => {
  try {
    const { id, imgId } = req.params;
    const collection = await Collection.findById(id);
    if (!collection) return res.status(404).json({ message: 'Collection not found' });

    const imageToRemove = collection.images.find(img => img._id.toString() === imgId);
    if (imageToRemove && imageToRemove.publicId) {
      await cloudinary.uploader.destroy(imageToRemove.publicId);
    }

    collection.images = collection.images.filter(img => img._id.toString() !== imgId);
    await collection.save();
    res.json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
