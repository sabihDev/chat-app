import React from 'react'
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatWindow = ({ handleSend, input, setInput }) => {
    return (


        <Box sx = {{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", paddingTop: 1 }
}>
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
      </Box >
  )
}

export default ChatWindow
