import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { getUserDetails } from "../api";

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sender: "friend" },
    { id: 2, text: "Hi there!", sender: "me" },
  ]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setLoading(false);
      navigate("/login");
      return;
    }

    getUserDetails(token)
      .then((res) => {
        if (res && res.data) {
          setUser(res.data);
        } else {
          throw new Error("Invalid user data");
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress color="primary" />
        <Typography mt={2}>Loading chat...</Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          You are not logged in!
        </Typography>
      </Container>
    );
  }

  const sendMessage = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: input, sender: "me" },
      ]);
      setInput("");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      minHeight="70vh"
      bgcolor={theme.palette.background.default}
      color={theme.palette.text.primary}
      p={2}
    >
      {!isMobile && (
        <Box width={250} bgcolor={theme.palette.background.paper} p={2} boxShadow={3}>
          <Typography variant="h6" color="primary">Chats</Typography>
          <List>
            <ListItem button>
              <ListItemAvatar>
                <Avatar src="/user1.jpg" />
              </ListItemAvatar>
              <ListItemText primary="John Doe" secondary="Hello!" sx={{ color: theme.palette.text.secondary }} />
            </ListItem>
          </List>
        </Box>
      )}

      <Box
        flex={2}
        width={isMobile ? "100%" : "480px"}
        display="flex"
        flexDirection="column"
        p={2}
        boxShadow={3}
      >
        <Typography variant="h6" color="primary">John Doe</Typography>
        <Box flex={2} overflow="auto" p={2} display="flex" flexDirection="column" gap={2}>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                alignSelf: msg.sender === "me" ? "flex-start" : "flex-end",
                bgcolor: msg.sender === "me" ? theme.palette.primary.main : theme.palette.background.paper,
                p: 2,
                borderRadius: 2,
                maxWidth: "80%",
                color: theme.palette.text.primary,
                boxShadow: 2,
              }}
            >
              {msg.text}
            </Box>
          ))}
        </Box>
        <Box display="flex" p={1} gap={1}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ bgcolor: theme.palette.background.paper, borderRadius: 1 }}
          />
          <IconButton color="primary" onClick={sendMessage}>
            <Send />
          </IconButton>
        </Box>
      </Box>

      {!isMobile && (
        <Box width={250} bgcolor={theme.palette.background.paper} p={2} boxShadow={3}>
          <Typography variant="h6" color="primary">Online</Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar src="/user2.jpg" />
              </ListItemAvatar>
              <ListItemText primary="Alice" sx={{ color: theme.palette.text.secondary }} />
            </ListItem>
          </List>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;