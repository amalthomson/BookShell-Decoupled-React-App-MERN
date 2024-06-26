import React from 'react';
import LoginForm from '../CommonPages/LoginForm/LoginForm';
import Footer from '../CommonPages/Footer/Footor';
import { Container } from '@mui/material';
import CommonNavbar from './AppBar/CommonAppBar';

function LoginPage() {
  return (
    <div>
      <CommonNavbar />
      <Container maxWidth="sm" sx={{ marginTop: '4rem' }}>
        <LoginForm />
      </Container>
      <Footer />
    </div>
  );
}

export default LoginPage;
