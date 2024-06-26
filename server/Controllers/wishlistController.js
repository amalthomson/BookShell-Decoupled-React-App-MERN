// server/Controllers/wishlistController.js
const Wishlist = require('../Models/Wishlist');

const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const existingItem = await Wishlist.findOne({ userId, productId });

    if (existingItem) {
      return res.status(400).json({ error: 'Product already exists in wishlist' });
    }

    const wishlistItem = new Wishlist({ userId, productId });
    await wishlistItem.save();

    res.status(201).json({ message: 'Product added to wishlist successfully' });
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const existingItem = await Wishlist.findOneAndDelete({ userId, productId });

    if (!existingItem) {
      return res.status(400).json({ error: 'Product not found in wishlist' });
    }

    res.status(200).json({ message: 'Product removed from wishlist successfully' });
  } catch (error) {
    console.error('Error removing product from wishlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const isProductInWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.query;

    const existingItem = await Wishlist.findOne({ userId, productId });

    res.status(200).json({ inWishlist: !!existingItem });
  } catch (error) {
    console.error('Error checking product in wishlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getWishlist = async (req, res) => {
    try {
      const { userId } = req.query;
  
      const wishlistItems = await Wishlist.find({ userId }).select('productId');
  
      res.status(200).json(wishlistItems);
    } catch (error) {
      console.error('Error getting wishlist:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = { addToWishlist, removeFromWishlist, isProductInWishlist, getWishlist };
