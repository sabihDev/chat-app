import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  useTheme,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Username and password are required");
      return;
    }

    try {
      const response = await loginUser(formData);

      // Check if response contains the expected structure
      if (response?.data?.token) {
        localStorage.setItem("jwt", response.data.token);
        navigate("/chat");
      } else {
        setError("Invalid login credentials");
      }
    } catch (err) {
      console.error("Login error:", err);

      // Ensure that the error is a string and not an object
      setError(err.response?.data?.message || "Invalid username or password");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%", borderRadius: theme.shape.borderRadius }}>
          <Typography component="h1" variant="h5" textAlign="center" mb={3}>
            Login
          </Typography>
          {error && (
            <Typography color="error" textAlign="center" mb={2}>
              {error}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
          </Box>
          <Typography textAlign="center">
            Don't have an account? <Link href="/register">Register</Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;