import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  useTheme,
} from "@mui/material";
import { validateEmail } from "../lib/helper";
import { registerUser } from "../api"; // ✅ Import API function
import { useNavigate } from "react-router-dom";

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Handle input changes dynamically
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Reset previous errors

    const { username, fullName, email, password, confirmPassword, gender } = formData;

    // ✅ Form validation
    let newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!validateEmail(email)) newErrors.email = "Invalid email address";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm Password is required";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // ✅ Call API to register user
    try {
      const response = await registerUser({ username, fullName, confirmPassword, email, password, gender });
      alert("User registered successfully! 🎉");
      setFormData({ username: "", fullName: "", email: "", password: "", confirmPassword: "", gender: "male" }); // Reset form
      console.log(response);

      localStorage.setItem("jwt",response.token);
      
      navigate("/chat");

    } catch (error) {
      console.error("Registration Error:", error);
      setErrors({ apiError: error?.response?.data?.message || "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[3],
          }}
        >
          <Typography component="h1" variant="h5" textAlign="center" mb={3}>
            Register
          </Typography>
          {errors.apiError && (
            <Typography color="error" textAlign="center" mb={2}>
              {errors.apiError}
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
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              autoComplete="name"
              value={formData.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            <FormControl component="fieldset" sx={{ mt: 2, width: "100%" }}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                backgroundColor: theme.palette.primary.main,
                "&:hover": { backgroundColor: theme.palette.primary.dark, transform: "scale(1.02)", transition: "transform 0.2s ease-in-out" },
              }}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
