import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Footer from "../CommonPages/Footer/Footor";
import UserAppBar from "../UserPages/UserAppBar/UserAppBar";
import ProductListing from "../UserPages/ProductListing/ProductListing";

function Home() {
  return (
    <div>
      <Toolbar>
        <Typography variant="h6">
          <UserAppBar />
        </Typography>
      </Toolbar>
      <Box my={4}>
        <ProductListing />
      </Box>
      <div>
        <br/> <br/>
      <Footer />
      </div>
    </div>
  );
}

export default Home;
