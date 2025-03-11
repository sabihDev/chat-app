import { useState } from "react";
import { Container, Box, List, ListItem, ListItemText, Paper, TextField, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

const WelcomePage = ({user}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "You" }]);
      setInput("");
    }
  };

  console.log("from welcome",user);
  

  return (
    <Container maxWidth="md" sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, height: "100vh", paddingTop: 2 }}>
      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Chat Window */}
      <ChatWindow messages={messages} handleSend={handleSend} input={input} setInput={setInput}/>
    </Container>
  );
};

export default WelcomePage;
