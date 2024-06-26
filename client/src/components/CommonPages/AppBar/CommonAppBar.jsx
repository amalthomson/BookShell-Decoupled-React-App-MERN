import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { styled } from '@mui/system';
import { useAuth } from "../../../context/auth";

const LoginButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  color: '#fff',
  backgroundColor: '#4caf50',
  '&:hover': {
    backgroundColor: '#388e3c',
  },
}));

const SignupButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  color: '#fff',
  backgroundColor: '#2196f3',
  '&:hover': {
    backgroundColor: '#1976d2',
  },
}));

const CommonAppBar = () => {
  const { auth } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="default" sx={{ backgroundColor: '#455a64', color: '#000' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logoAppBar.png" alt="Logo" style={{ height: 40, marginRight: 8 }} />
          </Box>
          <Box>
            <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
              <LoginButton>Login</LoginButton>
            </Link>
            <Link to="/signup" style={{ textDecoration: "none", color: "inherit" }}>
              <SignupButton>Signup</SignupButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};

export default CommonAppBar;
