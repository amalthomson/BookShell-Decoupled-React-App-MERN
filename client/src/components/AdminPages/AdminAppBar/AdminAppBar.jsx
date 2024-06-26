import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Typography, Avatar, Menu, MenuItem } from "@mui/material";
import { useAuth } from "../../../context/auth";
import { styled } from '@mui/system';
import {jwtDecode} from 'jwt-decode'; 

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  color: '#fff',
  '&:hover': {
    backgroundColor: '#b0bec5',
    color: '#fff',
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  color: '#fff',
  backgroundColor: '#4caf50',
  '&:hover': {
    backgroundColor: '#388e3c',
  },
}));

const AdminAppBar = () => {
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
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontSize: 24, fontWeight: 'bold', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logoAppBar.png" alt="Logo" style={{ height: 40, marginRight: 8 }} />
          </Box>
          </Typography>
          <Link to="/admin/admin-home" style={{ textDecoration: "none", color: "inherit" }}>
            <StyledButton>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Home</Typography>
            </StyledButton>
          </Link>
          <Link to="/admin/users" style={{ textDecoration: "none", color: "inherit" }}>
            <StyledButton>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Users</Typography>
            </StyledButton>
          </Link>
          <Link to="/admin/orders" style={{ textDecoration: "none", color: "inherit" }}>
            <StyledButton>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Orders</Typography>
            </StyledButton>
          </Link>
          <Link to="/admin/products" style={{ textDecoration: "none", color: "inherit" }}>
            <StyledButton>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Products</Typography>
            </StyledButton>
          </Link>
          <Link to="/admin/add-product" style={{ textDecoration: "none", color: "inherit" }}>
            <StyledButton>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Add Products</Typography>
            </StyledButton>
          </Link>
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
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};

export default AdminAppBar;
