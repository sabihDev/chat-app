import React from "react";
import { Container, Typography, Button, Avatar, Box } from "@mui/material";
import { Chat } from "@mui/icons-material";

const WelcomePage = ({ user }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Avatar
        src={user?.profilePic || "/default-avatar.png"}
        alt={user?.username}
        sx={{ width: 100, height: 100, mb: 2 }}
      />
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.username || "Guest"}!
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Ready to start chatting with your friends?
      </Typography>
      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Chat />}
          size="large"
        >
          Start Chatting
        </Button>
      </Box>
    </Container>
  );
};

export default WelcomePage;
