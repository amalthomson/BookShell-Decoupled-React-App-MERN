import React, { useState } from "react";
import { TextField, Button, Container, Typography, Card, CardContent, Grid, Link, InputAdornment } from "@mui/material";
import { Person, Email, Phone, AccountCircle, Lock } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const navigate = useNavigate();
  
  const formData = {
    name: name,
    email: email,
    phoneno: phoneno,
    username: username,
    password: password,
    cpassword: cpassword,
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/auth/signup", formData);
      if (res.data && res.data.success) {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!!");
    }
  }
  
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography component="h1" variant="h5" gutterBottom textAlign={"center"}>
            Sign Up
          </Typography>
          <br/>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Full Name"
                  value={name}
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Enter your full name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  label="Email"
                  value={email}
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Enter your email address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  label="Phone Number"
                  value={phoneno}
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setPhoneno(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Enter your phone number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Username"
                  value={username}
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Choose a unique username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  label="Password"
                  value={password}
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Choose a strong password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  label="Confirm Password"
                  value={cpassword}
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setCpassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Re-enter your password"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  Already have an account?{" "}
                  <Link href="/login" color="primary">
                    LOGIN
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
    </Container>
  );
}

export default SignupForm;
