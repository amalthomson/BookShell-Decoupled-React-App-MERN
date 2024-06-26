import React from "react";
import { Box, Typography, Grid, Paper, Container } from "@mui/material";
import { styled } from '@mui/system';
import { Link } from "react-router-dom";
import { People, ShoppingCart, Store, AddCircle } from '@mui/icons-material';

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f8f9fa',
  color: '#333',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const AdminHome = () => {
  return (
    <Box
        sx={{
          backgroundImage: 'url("/bgbooks.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '80vh',
          padding: '50px 0',
          width: '100%',
        }}
      >
      <Container>
        <Box sx={{ my: 4 }}>
          <br/>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Link to="/admin/users" style={{ textDecoration: "none", color: "inherit" }}>
              <StatCard>
                <People fontSize="large" style={{ color: '#2196f3' }} /> 
                <Typography variant="h6" align="center" mt={1}>Users</Typography>
              </StatCard>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link to="/admin/products" style={{ textDecoration: "none", color: "inherit" }}>
              <StatCard>
                <Store fontSize="large" style={{ color: '#4caf50' }} /> 
                <Typography variant="h6" align="center" mt={1}>Products</Typography>
              </StatCard>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link to="/admin/orders" style={{ textDecoration: "none", color: "inherit" }}>
              <StatCard>
                <ShoppingCart fontSize="large" style={{ color: '#ff9800' }} /> 
                <Typography variant="h6" align="center" mt={1}>Orders</Typography>
              </StatCard>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link to="/admin/add-product" style={{ textDecoration: "none", color: "inherit" }}>
              <StatCard>
                <AddCircle fontSize="large" style={{ color: '#f44336' }} /> 
                <Typography variant="h6" align="center" mt={1}>Add Products</Typography>
              </StatCard>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminHome;
