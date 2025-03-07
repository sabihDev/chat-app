import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Welcome to Chat App
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/chat">
        Go to Chat
      </Button>
    </Box>
  );
};

export default Home;
