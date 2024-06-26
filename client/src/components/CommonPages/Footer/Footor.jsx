import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: '#455a64',
  color: '#fff', 
  padding: theme.spacing(2),
  textAlign: 'center',
  position: 'fixed',
  width: '100%',
  bottom: 0,
  zIndex: 9999,
  margin: 0, 
  left: 0, 
  right: 0,
}));

const Footer = () => {
  return (
    <StyledFooter>
      <Typography variant="body2">
        © 2023 BookShell. All rights reserved.
      </Typography>
    </StyledFooter>
  );
}

export default Footer;
