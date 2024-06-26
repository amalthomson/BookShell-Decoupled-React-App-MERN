import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Card, CardContent, CardMedia, Typography, IconButton, Box, Button, Divider, List, ListItem, ListItemText, Paper, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { RemoveShoppingCart } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../../CommonPages/Footer/Footor";
import UserAppBar from "../UserAppBar/UserAppBar";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';


function MyCart() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addresses, setAddresses] = useState([]); // State to store addresses
  const [selectedAddress, setSelectedAddress] = useState(""); // State to store the selected address

  useEffect(() => {
    const fetchCartAndAddresses = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("userId"));

        // Fetch cart items
        const cartResponse = await axios.get(`http://localhost:5001/user/cart`, {
          params: { userId }
        });
        const cartItems = await Promise.all(cartResponse.data.map(async (item) => {
          const productDetailsResponse = await axios.get(`http://localhost:5001/user/products/${item.productId}`);
          const productDetails = productDetailsResponse.data;
          if (productDetails.image) {
            return { ...productDetails, image: productDetails.image };
          } else {
            console.error("Image filename not found for product:", productDetails);
            return productDetails;
          }
        }));
        setCart(cartItems);
        calculateTotalPrice(cartItems);

        // Fetch user addresses
        const addressResponse = await axios.get(`http://localhost:5001/user/address/${userId}`);
        setAddresses(addressResponse.data.addresses);
        if (addressResponse.data.addresses.length > 0) {
          setSelectedAddress(addressResponse.data.addresses[0]); // Set the first address as selected by default
        }
      } catch (error) {
        console.error("Error fetching cart and addresses:", error);
      }
    };

    fetchCartAndAddresses();
  }, []);

  const calculateTotalPrice = (cartItems) => {
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const userId = JSON.parse(localStorage.getItem("userId"));
      await axios.post("http://localhost:5001/user/cart/remove", { userId, productId });
      const updatedCart = cart.filter(item => item._id !== productId);
      setCart(updatedCart);
      calculateTotalPrice(updatedCart);
      toast.success("Product removed from cart successfully");
    } catch (error) {
      console.error("Error removing product from cart:", error);
      toast.error("Failed to remove product from cart");
    }
  };

  const handlePayment = async () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    const receipt = `receipt_${new Date().getTime()}`;
    try {
      const orderResponse = await axios.post("http://localhost:5001/user/create-order", {
        amount: totalPrice,
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
              razorpay_signature: response.razorpay_signature,
              userId,
              cart,
              address: selectedAddress // Include the selected address details
            });

            toast.success(verifyResponse.data.message);
            if (verifyResponse.data.message === 'Payment verified successfully') {
              setCart([]); // Clear the cart in UI
              setTotalPrice(0);
              window.location.href = "/my-orders";
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            toast.error("Payment verification failed");
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

  return (
    <>
      <UserAppBar />
      <Container maxWidth="lg" sx={{ marginTop: 4, marginBottom: 4 }}>
        {cart.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "80vh",
              textAlign: "center",
            }}
          >
            <LibraryBooksIcon sx={{ fontSize: 100, color: "blue" }} />
            <Typography
              variant="h5"
              gutterBottom
              fontWeight="bold"
            >
              Looks like your cart is feeling a bit light.
            </Typography>
            <Typography variant="body1">
              Time to fill it up.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="address-select-label">Select Address</InputLabel>
                    <Select
                      labelId="address-select-label"
                      value={selectedAddress ? selectedAddress._id : ""}
                      label="Select Address"
                      onChange={(e) => {
                        const address = addresses.find(addr => addr._id === e.target.value);
                        setSelectedAddress(address);
                      }}
                    >
                      {addresses.map((address) => (
                        <MenuItem key={address._id} value={address._id}>
                          {`${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.postalCode}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {cart.map((item) => (
                  <Grid item key={item._id} xs={12}>
                    <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex' }}>
                        <CardMedia
                          component="img"
                          sx={{ width: 150, height: 150, objectFit: 'scale-down' }}
                          image={`http://localhost:5001/uploads/${item.image}`}
                          alt={item.title}
                        />
                        <CardContent sx={{ flex: '1 0 auto' }}>
                          <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }}>
                            {item.title}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary" component="div">
                            {item.author}
                          </Typography>
                          <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', fontSize: 20, color: 'green' }}>
                            ₹{item.price}.00
                          </Typography>
                        </CardContent>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', pr: 2 }}>
                        <IconButton color="secondary" aria-label="remove from cart" onClick={() => handleRemoveFromCart(item._id)}>
                          <RemoveShoppingCart />
                        </IconButton>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            {cart.length > 0 && (
              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Price Details
                  </Typography>
                  <Divider />
                  <List>
                    <ListItem>
                      <ListItemText primary="Price" />
                      <Typography variant="subtitle1">₹{totalPrice}.00</Typography>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Delivery Charges" />
                      <Typography variant="subtitle1">Free</Typography>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary="Total Amount" />
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'green' }}>
                        ₹{totalPrice}.00
                      </Typography>
                    </ListItem>
                  </List>
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Button variant="contained" color="primary" onClick={handlePayment}>
                      Proceed to Payment
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            )}
          </Grid>
        )}
      </Container>

      <Footer />
      <ToastContainer />
    </>
  );
}

export default MyCart;
