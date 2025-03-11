import React from "react";
import {
  alpha,
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ user, onSettings }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const parsedUser = JSON.parse(user || "{}");

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Paper
      sx={{
        width: { xs: "100%", md: 250 },
        height: "100%",
        padding: 2,
        marginBottom: { xs: 2, md: 0 },
        marginRight: { md: 2 },
        position: "relative",
        boxShadow: theme.shadows[3],
      }}
    >
      <Typography variant="h6" gutterBottom>
        Friends
      </Typography>
      <List sx={{ paddingBottom: "50px" }}>
        {Array.isArray(parsedUser?.friends) && parsedUser.friends.length > 0 ? (
          parsedUser.friends.map((contact, index) => (
            <ListItem button key={index}>
              <ChatBubbleOutlineIcon sx={{ marginRight: 1 }} />
              <ListItemText primary={contact.username || "Unknown"} />
            </ListItem>
          ))
        ) : (
          <Typography
            variant="body2"
            sx={{ color: "gray", textAlign: "center" }}
          >
            No friends available
          </Typography>
        )}
      </List>

      {/* User Info Section */}
      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          display: "flex",
          alignItems: "center",
          gap: 1,
          padding: 1,
          backgroundColor: alpha(theme.palette.text.primary, 0.2),
          color: theme.palette.primary.contrastText,
          borderRadius: 2,
          border: `1px solid ${theme.palette.text.primary}`,
          boxShadow: theme.shadows[2],
        }}
      >
        <Avatar
          alt={parsedUser?.fullName || "Unknown User"}
          src={parsedUser?.profilePic || ""}
          sx={{ width: 32, height: 32 }}
        />
        <Typography sx={{ flexGrow: 1, color: theme.palette.text.primary }}>
          {parsedUser?.fullName || "Unknown User"}
        </Typography>

        <Tooltip title="Settings">
          <IconButton
            size="small"
            onClick={onSettings}
            sx={{ color: theme.palette.text.primary }}
          >
            <SettingsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Logout">
          <IconButton
            size="small"
            onClick={onLogout}
            sx={{ color: theme.palette.text.primary }}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default Sidebar;
