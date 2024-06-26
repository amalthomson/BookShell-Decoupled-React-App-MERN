import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from "../../CommonPages/Footer/Footor";
import { Box } from '@mui/material';
import './AdminDashboard.css';
import AdminAppBar from '../AdminAppBar/AdminAppBar';

function AdminDashboard() {
  return (
    <Box className="admin-dashboard" sx={{ display: 'flex', height: '100vh' }}>
      <AdminAppBar />
      <Outlet />
      <Footer />
    </Box>
  );
}

export default AdminDashboard;
