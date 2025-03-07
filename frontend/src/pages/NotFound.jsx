import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        404 - Page Not Found
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFound;
