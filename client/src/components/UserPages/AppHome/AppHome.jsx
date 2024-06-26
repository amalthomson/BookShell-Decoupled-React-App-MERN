import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../../CommonPages/Footer/Footor";
import CommonAppBar from "../../CommonPages/AppBar/CommonAppBar";

const AppHome = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CommonAppBar />
            <Box
        sx={{
          position: 'relative',
          minHeight: 'calc(100vh - 64px - 64px)', // Subtracting the height of the CommonAppBar and Footer
          overflow: 'hidden', // Hide overflow to prevent scrolling
          display: 'flex',
          alignItems: 'center', // Center the content vertically
        }}
      >
        {/* Background Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url('/home.jpg')`, // Use the provided image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px)', // Add a slight blur effect to the background image
            zIndex: -1, // Ensure the background image is behind the content
          }}
        />
        
        {/* Content */}
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start', 
            zIndex: 1,
            textAlign: 'left', 
            paddingTop: '100px', 
            paddingLeft: '30px',
          }}
        >
          <Typography variant="h1" sx={{ color: 'black', marginBottom: 4 }}>
            <span style={{ fontSize: '50px' }}>Welcome to</span> <br/>
            <span style={{ fontSize: '100px', fontWeight: "bold" }}>BookShell</span>
          </Typography>
          <Button
            component={Link}
            to="/home"
            variant="contained"
            color="primary"
            size="large"
            sx={{ marginLeft: '150px' }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>
      
      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default AppHome;
