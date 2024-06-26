const Cart = require('../Models/Cart');

const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      return res.status(400).json({ error: 'Product already exists in cart' });
    }

    const cartItem = new Cart({ userId, productId, quantity: 1 });
    await cartItem.save();

    res.status(201).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const existingItem = await Cart.findOneAndDelete({ userId, productId });

    if (!existingItem) {
      return res.status(400).json({ error: 'Product not found in cart' });
    }

    res.status(200).json({ message: 'Product removed from cart successfully' });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const isProductInCart = async (req, res) => {
  try {
    const { userId, productId } = req.query;

    const existingItem = await Cart.findOne({ userId, productId });

    res.status(200).json({ inCart: !!existingItem });
  } catch (error) {
    console.error('Error checking product in cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.query;

    const cartItems = await Cart.find({ userId }).select('productId');

    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error getting cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { addToCart, removeFromCart, isProductInCart, getCart };
