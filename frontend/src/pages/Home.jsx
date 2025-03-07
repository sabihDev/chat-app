import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";

const Home = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, sm: 6 },
              borderRadius: 2,
              textAlign: "center",
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <ChatIcon
              sx={{
                fontSize: { xs: 50, sm: 80 },
                color: "primary.main",
                mb: 2,
              }}
            />
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.5rem" },
                mb: 2,
                fontWeight: "bold",
              }}
            >
              Welcome to ChatApp
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: "text.secondary",
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Connect with friends and family through instant messaging
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                component={Link}
                to="/login"
                variant="contained"
                size="large"
                sx={{ minWidth: 150 }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="outlined"
                size="large"
                sx={{ minWidth: 150 }}
              >
                Register
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default Home;
