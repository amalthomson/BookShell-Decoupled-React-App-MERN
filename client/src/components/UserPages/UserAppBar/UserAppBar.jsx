import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Typography, Avatar, Menu, MenuItem } from "@mui/material";
import { useAuth } from "../../../context/auth";
import { styled } from '@mui/system';
import { jwtDecode } from 'jwt-decode'; 

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  color: '#fff',
  '&:hover': {
    backgroundColor: '#b0bec5',
    color: '#fff',
  },
}));

const UserAppBar = () => {
  const token = localStorage.getItem("token");
  const { auth, setAuth } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.name);
    }
    if (!token) {
      window.location.href = '/login';
    }
  }, [token]);

  const handleLogout = () => {
    setAuth({
      ...auth, 
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setAnchorEl(null);
    navigate("/login");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="default" sx={{ backgroundColor: '#455a64', color: '#000' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logoAppBar.png" alt="Logo" style={{ height: 40, marginRight: 8 }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
              <StyledButton>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Home</Typography>
              </StyledButton>
            </Link>
            <Link to="/my-orders" style={{ textDecoration: "none", color: "inherit" }}>
              <StyledButton>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Orders</Typography>
              </StyledButton>
            </Link>
            <Link to="/wishlist" style={{ textDecoration: "none", color: "inherit" }}>
              <StyledButton>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Wishlist</Typography>
              </StyledButton>
            </Link>
            <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
              <StyledButton>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Cart</Typography>
              </StyledButton>
            </Link>
          </Box>
          <div>
            <Avatar onClick={handleMenu} style={{ cursor: 'pointer', backgroundColor: '#3f51b5' }}>
              {userName ? userName.charAt(0) : ''}
            </Avatar>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>{userName}</MenuItem>
              <MenuItem onClick={() => navigate("/manage-addresses")}>Manage Address</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};

export default UserAppBar;
