import React from 'react';
import SignupForm from '../CommonPages/SignupForm/SignupForm';
import Footer from '../CommonPages/Footer/Footor';
import { Container } from '@mui/material';
import CommonNavbar from './AppBar/CommonAppBar';

function Signup() {
  return (
    <div>
      <CommonNavbar />
      <Container maxWidth="sm" sx={{ marginTop: '4rem' }}>
        <SignupForm />
      </Container>
      <Footer />
    </div>
  );
}

export default Signup;
