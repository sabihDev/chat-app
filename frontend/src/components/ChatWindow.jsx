import React from 'react'
import { Box, Paper, TextField, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

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
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", paddingTop: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          sx={{ marginBottom: { xs: 1, sm: 0 } }}
        />
        <IconButton color="primary" onClick={handleSend} sx={{ marginLeft: { sm: 1 } }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  )
}

export default ChatWindow
