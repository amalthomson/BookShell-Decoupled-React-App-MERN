import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, CardActions, IconButton, ButtonBase, TextField, Box } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlist, setWishlist] = useState({});
  const [cart, setCart] = useState({});
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/user/products");
        setProducts(response.data);
        setFilteredProducts(response.data);

        const userId = JSON.parse(localStorage.getItem("userId"));

        const wishlistResponse = await axios.get(`http://localhost:5001/user/wishlist`, { params: { userId } });
        const wishlistItems = wishlistResponse.data.reduce((acc, item) => {
          acc[item.productId] = true;
          return acc;
        }, {});
        setWishlist(wishlistItems);

        const cartResponse = await axios.get(`http://localhost:5001/user/cart`, { params: { userId } });
        const cartItems = cartResponse.data.reduce((acc, item) => {
          acc[item.productId] = true;
          return acc;
        }, {});
        setCart(cartItems);
      } catch (error) {
        console.error("Error fetching products or wishlist or cart:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    const updatedQuery = event.target.value.toLowerCase();
    setQuery(updatedQuery);

    const searchTerms = updatedQuery.split(' ');

    const filtered = products.filter((product) => {
      const searchableFields = [
        'title',
        'author',
        'price'
      ];

      const matchesField = searchableFields.some((field) => {
        const productValue = product[field];
        return productValue ? searchTerms.some((term) => productValue.toString().toLowerCase().includes(term)) : false;
      });

      const matchesAdditionalFields = product.additional_fields && product.additional_fields.some((field) => {
        const keyMatch = searchTerms.some((term) => field.key.toLowerCase().includes(term));
        const valueMatch = searchTerms.some((term) => field.value.toLowerCase().includes(term));
        return keyMatch || valueMatch;
      });

      return matchesField || matchesAdditionalFields;
    });

    setFilteredProducts(filtered);
  };

  const handleWishlist = async (productId) => {
    try {
      const userId = JSON.parse(localStorage.getItem("userId"));
      const isInWishlist = wishlist[productId];
      const url = isInWishlist ? "remove" : "add";
      const wishlistItem = { userId, productId };

      await axios.post(`http://localhost:5001/user/wishlist/${url}`, wishlistItem);
      setWishlist(prevWishlist => ({
        ...prevWishlist,
        [productId]: !isInWishlist
      }));
      toast.success(`Product ${isInWishlist ? 'removed from' : 'added to'} wishlist successfully`);
    } catch (error) {
      console.error("Error adding/removing from wishlist:", error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleCart = async (productId) => {
    try {
      const userId = JSON.parse(localStorage.getItem("userId"));
      const isInCart = cart[productId];
      const url = isInCart ? "remove" : "add";
      const cartItem = { userId, productId };

      await axios.post(`http://localhost:5001/user/cart/${url}`, cartItem);
      setCart(prevCart => ({
        ...prevCart,
        [productId]: !isInCart
      }));
      toast.success(`Product ${isInCart ? 'removed from' : 'added to'} cart successfully`);
    } catch (error) {
      console.error("Error adding/removing from cart:", error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4, marginBottom: 4 }}>
      <TextField
        label="Search Books"
        variant="outlined"
        fullWidth
        value={query}
        onChange={handleSearch}
        sx={{ marginBottom: 4 }}
      />
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
              <Card sx={{ 
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s', 
                '&:hover': { 
                  transform: 'scale(1.05)',
                  boxShadow: 6
                }
              }}>
                <ButtonBase onClick={() => navigate(`/product/${product._id}`)}>
                  <CardMedia
                    component="img"
                    sx={{ height: 300, objectFit: 'contain' }}
                    image={`http://localhost:5001/uploads/${product.image}`} 
                    alt={product.title}
                  />
                </ButtonBase>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" sx={{ fontWeight: 'bold', fontSize: 20, color: 'darkblue' }}>
                    {product.author}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" sx={{ fontWeight: 'bold', fontSize: 24, color: 'green' }}>
                    ₹{product.price}.00
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Button
                    variant="contained"
                    color={cart[product._id] ? "secondary" : "primary"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCart(product._id);
                    }}
                  >
                    {cart[product._id] ? "Remove from Cart" : "Add to Cart"}
                  </Button>
                  <IconButton
                    color={wishlist[product._id] ? "secondary" : "default"}
                    aria-label="add to wishlist"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishlist(product._id);
                    }}
                  >
                    <Favorite />
                  </IconButton>
                </CardActions>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
      <ToastContainer />
    </Container>
  );
}

export default ProductListing;
