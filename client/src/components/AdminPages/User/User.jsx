import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, CircularProgress, Grid, Card, CardContent, Grow, styled, ListItemIcon } from '@mui/material';
import { AccountCircle } from '@mui/icons-material'; // Import the AccountCircle icon

const StyledCard = styled(Card)(({ theme }) => ({
  border: '1px solid #ccc',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[8],
  },
}));

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get('http://localhost:5001/admin/users');
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grow in={!loading} key={user._id}>
              <Grid item xs={12} sm={6} md={4} lg={6}>
                <StyledCard variant="outlined">
                  <CardContent>
                    <ListItemIcon>
                      <AccountCircle fontSize="large" color="primary" /> {/* Add the icon */}
                    </ListItemIcon>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'navy', fontSize: 32 }}>
                      {user.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom sx={{ fontSize: 20 }}>
                      <strong>Email:</strong> {user.email}
                    </Typography>
                    <Typography variant="body1" gutterBottom sx={{ fontSize: 20 }}>
                      <strong>Phone Number:</strong> {user.phoneno}
                    </Typography>
                    <Typography variant="body1" gutterBottom sx={{ fontSize: 20 }}>
                      <strong>Username:</strong> {user.username}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            </Grow>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Users;
