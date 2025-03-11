import React from 'react'
import { Box, Paper, Typography } from "@mui/material";
import MessageInput from './MessageInput';

const ChatWindow = ({messages, handleSend, input, setInput}) => {
  return (
    <Paper sx={{ flex: 1, display: "flex", flexDirection: "column", padding: 2, minHeight: "60vh" }}>
      <Typography variant="h6" gutterBottom>Chat</Typography>
      <Box sx={{ flex: 1, overflowY: "auto", padding: 1, borderBottom: "1px solid #ddd" }}>
        {messages.map((msg, index) => (
          <Box key={index} sx={{ marginBottom: 1, textAlign: msg.sender === "You" ? "right" : "left" }}>
            <Typography variant="body1" sx={{ display: "inline-block", padding: 1, borderRadius: 1, bgcolor: msg.sender === "You" ? "primary.light" : "grey.300" }}>
              {msg.text}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Message Input */}
      <MessageInput handleSend={handleSend} input={input} setInput={setInput} />
    </Paper>
  )
}

export default ChatWindow
