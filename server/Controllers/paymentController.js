// server/Controllers/paymentController.js
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Cart = require('../Models/Cart'); // Ensure correct path
const Order = require('../Models/Order'); // Ensure correct path

const razorpay = new Razorpay({
  key_id: 'rzp_test_G76Cy9vDVSyTXa',
  key_secret: 'hqAOM0Dezz4hT1NFmk6Yz8g1'
});

exports.createOrder = async (req, res) => {
  const { amount, currency, receipt } = req.body;
  try {
    const options = {
      amount: amount * 100,
      currency,
      receipt
    };
    const order = await razorpay.orders.create(options);
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// server/Controllers/paymentController.js

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, cart, address } = req.body; // Add address
  const hmac = crypto.createHmac('sha256', 'hqAOM0Dezz4hT1NFmk6Yz8g1');
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');

  if (generated_signature === razorpay_signature) {
    try {
      // Save order details
      const order = new Order({
        order_id: razorpay_order_id,
        userId,
        amount: cart.reduce((total, item) => total + item.price, 0),
        currency: 'INR',
        products: cart.map(item => ({
          productId: item._id,
          title: item.title,
          price: item.price
        })),
        address // Save address
      });
      await order.save();

      // Clear cart
      await Cart.deleteMany({ userId });

      res.status(200).json({ message: 'Payment verified successfully' });
    } catch (error) {
      console.error("Error handling payment verification:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(400).json({ message: 'Invalid signature' });
  }
};

