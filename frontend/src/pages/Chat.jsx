import { Paper, Typography } from "@mui/material";
import ChatWindow from "../components/ChatWindow";

const Chat = () => {
  return (
    <Paper elevation={6} sx={{ width: "100%", height: "80vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Typography variant="h5" sx={{ p: 2, backgroundColor: "primary.main", color: "white", textAlign: "center" }}>
        Chat App
      </Typography>
      <ChatWindow />
    </Paper>
  );
};

export default Chat;
