// server/Controllers/orderController.js
const Order = require('../Models/Order');

exports.getOrders = async (req, res) => {
  const { userId } = req.query;
  try {
    const orders = await Order.find({ userId }).populate('products.productId');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error.message);
    res.status(500).json({ error: error.message });
  }
};