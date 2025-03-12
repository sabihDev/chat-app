import { useState } from "react";
import { Container, useTheme, Box } from "@mui/material";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

const Page = ({ user, page }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "You" }]);
      setInput("");
    }
  };

  console.log("from welcome", user);


  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        {page === "chat" &&
          <ChatWindow
            messages={messages}
            handleSend={handleSend}
            input={input}
            setInput={setInput}
          />
        }
      </Container>
    </Box>
  );
};

export default Page;
