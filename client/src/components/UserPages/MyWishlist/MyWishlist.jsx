import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Card, CardContent, CardMedia, Typography, IconButton, Box, Button } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
import Footer from "../../CommonPages/Footer/Footor";
import UserAppBar from "../UserAppBar/UserAppBar";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

function MyWishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("userId"));
        const response = await axios.get(`http://localhost:5001/user/wishlist`, {
          params: { userId }
        });
        const wishlistItems = await Promise.all(response.data.map(async (item) => {
          const productDetailsResponse = await axios.get(`http://localhost:5001/user/products/${item.productId}`);
          const productDetails = productDetailsResponse.data;
          if (productDetails.image) {
            return { ...productDetails, image: productDetails.image };
          } else {
            console.error("Image filename not found for product:", productDetails);
            return productDetails;
          }
        }));
        setWishlist(wishlistItems);
        setIsLoading(false);
        console.log(wishlistItems);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };    
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const userId = JSON.parse(localStorage.getItem("userId"));
      await axios.post("http://localhost:5001/user/wishlist/remove", { userId, productId });
      setWishlist(prevWishlist => prevWishlist.filter(item => item._id !== productId));
      toast.success("Product removed from wishlist successfully"); // Use toast instead of alert
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      toast.error("Failed to remove product from wishlist"); // Use toast instead of alert
    }
  };

  const handleMoveToCart = async (productId) => {
    try {
      const userId = JSON.parse(localStorage.getItem("userId"));
      await axios.post("http://localhost:5001/user/cart/add", { userId, productId });
      await axios.post("http://localhost:5001/user/wishlist/remove", { userId, productId });
      setWishlist(prevWishlist => prevWishlist.filter(item => item._id !== productId));
      toast.success("Product moved to cart successfully"); // Use toast instead of alert
    } catch (error) {
      console.error("Error moving product to cart:", error);
      toast.error("Failed to move product to cart"); // Use toast instead of alert
    }
  };

  return (
    <>
      <UserAppBar />
      <Container maxWidth="lg" sx={{ marginTop: 4, marginBottom: 4 }}>
        {isLoading ? (
          <Typography variant="h5" align="center" gutterBottom>
            Loading...
          </Typography>
        ) : wishlist.length === 0 ? (
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
                Your wishlist is empty!
              </Typography>
              <Typography variant="body1">
               Start adding your favorite books.
              </Typography>
            </Box>
        ) : (
          <Grid container spacing={4}>
            {wishlist.map((item) => (
              <Grid item key={item._id} xs={12} sm={6} md={3}>
                <Card sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%', 
                  transition: 'transform 0.3s', 
                  '&:hover': { 
                    transform: 'scale(1.05)',
                    boxShadow: 6
                  }
                }}>
                  <CardMedia
                    component="img"
                    sx={{ height: 300, objectFit: 'scale-down' }}
                    image={`http://localhost:5001/uploads/${item.image}`} 
                    alt={item.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" sx={{ fontWeight: 'bold', fontSize: 20, color: 'darkblue' }}>
                      {item.author}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" sx={{ fontWeight: 'bold', fontSize: 24, color: 'green' }}>
                      ₹{item.price}.00
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleMoveToCart(item._id)}
                    >
                      Move to Cart
                    </Button>
                    <IconButton color="secondary" aria-label="remove from wishlist" onClick={() => handleRemoveFromWishlist(item._id)}>
                      <Favorite />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <Footer />
      <ToastContainer /> {/* Render ToastContainer at the end of your component */}
    </>
  );
}

export default MyWishlist;
