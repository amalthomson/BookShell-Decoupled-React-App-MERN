// server/Routes/Router.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { signupController, loginController } = require('../Controllers/authController');
const { getUsers } = require('../Controllers/userController');
const { getProducts, getProductById, addProduct } = require('../Controllers/productController');
const { getOrders } = require('../Controllers/orderController');
const { addToWishlist, removeFromWishlist, isProductInWishlist, getWishlist } = require('../Controllers/wishlistController');
const { addToCart, removeFromCart, isProductInCart, getCart } = require('../Controllers/cartController');
const { createOrder, verifyPayment } = require('../Controllers/paymentController');
const { addAddress, getAddress } = require('../Controllers/addressController');


// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single('image');

// Auth Routes
router.post('/signup', async (req, res) => {
  try {
    await signupController(req, res);
  } catch (error) {
    console.error('Error in /signup route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    await loginController(req, res);
  } catch (error) {
    console.error('Error in /login route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Other Routes
router.get('/users', getUsers);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.get('/orders', getOrders);
router.post('/products', upload, addProduct);
router.get('/wishlist', getWishlist);
router.post('/wishlist', addToWishlist); 
router.post('/wishlist/remove', removeFromWishlist); 
router.get('/wishlist/check', isProductInWishlist); 

// Cart Routes
router.get('/cart', getCart);
router.post('/cart/add', addToCart);
router.post('/cart/remove', removeFromCart);
router.get('/cart/check', isProductInCart);


router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);

router.post('/address/add', addAddress);
router.get('/address/:userId', getAddress);

module.exports = router;
