import React, { useEffect, useState } from "react";
import { Container, Box, Paper, Typography, Avatar, TextField, Button, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { getUserDetails } from "../api"; // ✅ API call to fetch user details

const WelcomeChat = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "bot", text: "Welcome! How can I assist you today?" },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    // ✅ Fetch user details if needed
    getUserDetails(token)
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setChatHistory([...chatHistory, { sender: "user", text: message }]);
    setMessage(""); // ✅ Clear input after sending
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography mt={2}>Loading chat...</Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">You are not logged in!</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: "#1e1e1e", color: "white" }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48, mr: 2 }}>
            {user.fullName.charAt(0)}
          </Avatar>
          <Typography variant="h6">Welcome, {user.fullName}!</Typography>
        </Box>

        {/* Chat Messages */}
        <Box sx={{ maxHeight: 300, overflowY: "auto", p: 2, backgroundColor: "#2a2a2a", borderRadius: 2 }}>
          {chatHistory.map((msg, index) => (
            <Typography
              key={index}
              align={msg.sender === "user" ? "right" : "left"}
              sx={{
                backgroundColor: msg.sender === "user" ? "#1976d2" : "#4caf50",
                color: "white",
                display: "inline-block",
                p: 1.5,
                borderRadius: 1,
                my: 0.5,
              }}
            >
              {msg.text}
            </Typography>
          ))}
        </Box>

        {/* Chat Input */}
        <Box mt={2} display="flex">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ input: { color: "white" }, backgroundColor: "#333", borderRadius: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <SendIcon />
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default WelcomeChat;
