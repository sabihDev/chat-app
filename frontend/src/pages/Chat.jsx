import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Avatar,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { getUserDetails } from "../api"; // ✅ API call to fetch user details
import WelcomePage from "./WelcomePage";

const Chat = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setLoading(false);
      return;
    }

    getUserDetails(token)
      .then((res) => {
        console.log("API Response:", res); // ✅ Log response
        if (res && res.data) {
          setUser(res.data);
        } else {
          throw new Error("Invalid user data");
        }
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

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
        <Typography variant="h6" color="error">
          You are not logged in!
        </Typography>
      </Container>
    );
  }

  return (
    <WelcomePage user={user} />
  );
};

export default Chat;
