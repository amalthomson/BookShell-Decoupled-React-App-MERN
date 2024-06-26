import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, TextField, Typography, Grid, Card, CardContent, CardActions, Snackbar, Divider, Container, Box, IconButton, InputAdornment } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import CloseIcon from '@material-ui/icons/Close';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CityIcon from '@material-ui/icons/LocationCity';
import PublicIcon from '@material-ui/icons/Public';
import MailIcon from '@material-ui/icons/Mail';
import Footer from '../../CommonPages/Footer/Footor';
import UserAppBar from "../UserAppBar/UserAppBar";

const ManageAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    // Fetch addresses when component mounts
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("userId"));
      if (userId) {
        const response = await axios.get(`http://localhost:5001/user/address/${userId}`);
        setAddresses(response.data.addresses);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = JSON.parse(localStorage.getItem("userId"));
      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }

      const addressData = { ...formData, userId };
      await axios.post('http://localhost:5001/user/address/add', addressData);
      fetchAddresses();
      setShowForm(false);
      setFormData({
        street: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
      });
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <UserAppBar/>
      <Container>
        <Box my={4}>
          <Divider sx={{ my: 2 }} />
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={toggleForm}>
            Add Address
          </Button>
          {showForm && (
            <Box mt={2}>
              <Card>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          type="text"
                          name="street"
                          label="Street"
                          value={formData.street}
                          onChange={handleChange}
                          required
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationOnIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="text"
                          name="city"
                          label="City"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CityIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="text"
                          name="state"
                          label="State"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationOnIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="text"
                          name="country"
                          label="Country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PublicIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="text"
                          name="postalCode"
                          label="Postal Code"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MailIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
                <CardActions>
                  <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                    Add
                  </Button>
                  <IconButton color="secondary" onClick={toggleForm}>
                    <CloseIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Box>
          )}
          <Divider sx={{ my: 4 }} />
          <Grid container spacing={3}>
            {addresses.map((address, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <HomeIcon sx={{ mr: 2 }} />
                      <Typography variant="body1">
                        {address.street}, {address.city}, {address.state}, {address.country} - {address.postalCode}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Address added successfully"
      />
    </div>
  );
};

export default ManageAddress;
