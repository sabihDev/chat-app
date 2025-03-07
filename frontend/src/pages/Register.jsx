import React, { useState } from 'react';
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
} from '@mui/material';

const Register = () => {
const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
};

const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log(formData);
};

return (
    <Container component="main" maxWidth="xs">
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
                <Typography component="h1" variant="h5" textAlign="center" mb={3}>
                    Register
                </Typography>
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
                        id="fullName"
                        label="Full Name"
                        name="fullName"
                        autoComplete="name"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
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
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
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
                    />
                    <FormControl component="fieldset" sx={{ mt: 2 }}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            row
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value="male"
                                control={<Radio />}
                                label="Male"
                            />
                            <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="Female"
                            />
                            <FormControlLabel
                                value="other"
                                control={<Radio />}
                                label="Other"
                            />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                </Box>
            </Paper>
        </Box>
    </Container>
);
};

export default Register;