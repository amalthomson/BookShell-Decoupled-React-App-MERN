import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Grow, Box } from '@mui/material';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get('http://localhost:5001/admin/products');
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4, marginBottom: 4 }}>
      <Grid container spacing={4}>
        {products.map((product, index) => (
          <Grow in={true} timeout={500 + index * 200} key={product._id}>
            <Grid item xs={12} sm={6} md={4}>
              <Box 
                sx={{ 
                  transition: 'transform 0.3s', 
                  '&:hover': { 
                    transform: 'scale(1.1)' 
                  },
                  height: '100%', 
                  bgcolor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '10px', 
                  boxShadow: '5px 5px 5px 5px rgba(0, 0, 0, 0.3)'
                }}
              >
                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:5001/uploads/${product.image}`}
                    alt={product.title}
                    sx={{ objectFit: 'scale-down' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Author:</strong> {product.author}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Genre:</strong> {product.genre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Price:</strong> ${product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>ISBN:</strong> {product.ISBN}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Publisher:</strong> {product.publisher}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Publication Date:</strong> {new Date(product.publicationDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Language:</strong> {product.language}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grow>
        ))}
      </Grid>
    </Container>
  );
}

export default Products;
