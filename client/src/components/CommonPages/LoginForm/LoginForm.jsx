// client/src/components/LoginForm.js
import React, { useState } from "react";
import { Button, TextField, Container, Card, CardContent, Typography, Grid, InputAdornment, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import { AccountCircle, Lock } from "@mui/icons-material";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const formData = {
    username: username,
    password: password,
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5001/signin/login", formData);
      console.log(res.data.token)
      if (res.data && res.data.success) {
        toast.success("Login Successfully!!!!!!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        // localStorage.setItem("auth", JSON.stringify(res.data));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("userId", JSON.stringify(res.data.user._id));
        if (res.data.user.role === "admin") {
          navigate("/admin/admin-home");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      toast.error("Login Failed. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <Container component="main" maxWidth="xl" sx={{ marginTop: 4 }}>
      <Grid container alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
        <Grid item xl={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ padding: 3, width: '100%' }}>
            <CardContent>
              <Typography component="h1" variant="h5" gutterBottom textAlign={"center"}>
                Sign In
              </Typography>
              <form method="post" onSubmit={handleSubmit} noValidate>
                <TextField
                  type="text"
                  label="Username"
                  value={username}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  sx={{ marginBottom: 2 }}
                  onChange={(e) => setUsername(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Enter your username"
                />
                <TextField
                  type="password"
                  label="Password"
                  value={password}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  sx={{ marginBottom: 2 }}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Enter your password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                >
                  LOGIN
                </Button>
                <Typography variant="body2" sx={{ marginTop: 1, textAlign: 'center' }}>
                  New to BookShell? <Link href="/signup">SIGNUP</Link>
                </Typography>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginForm;
