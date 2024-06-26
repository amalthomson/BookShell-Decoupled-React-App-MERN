import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Chip, Divider, CardMedia, Typography, Button, Box, Grid, Breadcrumbs, Link, Tooltip } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import UserAppBar from "../UserAppBar/UserAppBar";
import PaymentIcon from "@mui/icons-material/Payment";
import Footer from "../../CommonPages/Footer/Footor";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [inWishlist, setInWishlist] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/user/products/${id}`);
        setProduct(response.data);
        const userId = JSON.parse(localStorage.getItem("userId"));

        const wishlistResponse = await axios.get(`http://localhost:5001/user/wishlist/check`, {
          params: { userId, productId: id }
        });
        setInWishlist(wishlistResponse.data.inWishlist);

        const cartResponse = await axios.get(`http://localhost:5001/user/cart/check`, {
          params: { userId, productId: id }
        });
        setInCart(cartResponse.data.inCart);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleWishlist = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("userId"));
      const url = inWishlist ? "remove" : "add";
      const wishlistItem = { userId, productId: product._id };

      await axios.post(`http://localhost:5001/user/wishlist/${url}`, wishlistItem);
      setInWishlist(!inWishlist);
      toast.success(`Product ${inWishlist ? 'removed from' : 'added to'} wishlist successfully`);
    } catch (error) {
      console.error(`Error ${inWishlist ? 'removing product from' : 'adding product to'} wishlist:`, error);
      toast.error(`Failed to ${inWishlist ? 'remove product from' : 'add product to'} wishlist`);
    }
  };

  const handleCart = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("userId"));
      const url = inCart ? "remove" : "add";
      const cartItem = { userId, productId: product._id };

      await axios.post(`http://localhost:5001/user/cart/${url}`, cartItem);
      setInCart(!inCart);
      toast.success(`Product ${inCart ? 'removed from' : 'added to'} cart successfully`);
    } catch (error) {
      console.error(`Error ${inCart ? 'removing product from' : 'adding product to'} cart:`, error);
      toast.error(`Failed to ${inCart ? 'remove product from' : 'add product to'} cart`);
    }
  };

  const handlePayment = async (price) => {
    // const userId = JSON.parse(localStorage.getItem("userId"));
    const receipt = `receipt_${new Date().getTime()}`;
    try {
      const orderResponse = await axios.post("http://localhost:5001/user/create-order", {
        amount: price,
        currency: "INR",
        receipt
      });

      const { id: order_id, currency, amount } = orderResponse.data;

      const options = {
        key: "rzp_test_G76Cy9vDVSyTXa",
        amount,
        currency,
        name: "BookShell",
        description: "",
        image: "https://cdn-icons-png.flaticon.com/512/5988/5988152.png",
        order_id,
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post("http://localhost:5001/user/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            toast.success(verifyResponse.data.message);
            if (verifyResponse.data.message === 'Payment verified successfully') {
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
          }
        },
        prefill: {
          name: "BookShell",
          email: "contact@bookshell.com",
          contact: "9469664422"
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      toast.error("Failed to initiate payment");
    }
  };

  const handleBuyNow = async () => {
    if (product) {
      handlePayment(product.price);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <React.Fragment>
      <UserAppBar />
      <ToastContainer /> {/* Add this line */}
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/home">
            Home
          </Link>
          <Typography color="text.primary">{product.genre}</Typography>
          <Typography color="text.primary">{product.title}</Typography>
        </Breadcrumbs>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                sx={{ height: 700, objectFit: "contain" }}
                image={`http://localhost:5001/uploads/${product.image}`}
                alt={product.title}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: "bold", mb: 1 }}>
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "bold", mb: 1 }}>
                by {product.author}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Chip label={`Genre: ${product.genre}`} variant="outlined" color="primary" sx={{ mr: 1 }} />
                <Chip label={`Language: ${product.language}`} variant="outlined" color="primary" />
              </Box>
              <Divider sx={{ mb: 2 }}
              />
              <Typography variant="body1" sx={{ mb: 2 }}>
                {product.description}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>ISBN:</strong> {product.ISBN}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Publisher:</strong> {product.publisher}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Publication Date:</strong> {new Date(product.publicationDate).toLocaleDateString()}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h5" color="primary" component="p" sx={{ fontWeight: "bold", mb: 2 }}>
                ₹{product.price}.00
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Button variant="contained" color="primary" startIcon={<PaymentIcon />} onClick={handleBuyNow}>
                Buy Now
              </Button>
              <Button variant="outlined" color={inCart ? "secondary" : "primary"} startIcon={<ShoppingCartIcon />} sx={{ ml: 2 }} onClick={handleCart}>
                {inCart ? "Remove from Cart" : "Add to Cart"}
              </Button>
              <Box ml={1}>
                <Tooltip title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"} arrow>
                  <Button variant="outlined" color="secondary" startIcon={<FavoriteIcon />} onClick={handleWishlist}>
                    {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default ProductDetails;
