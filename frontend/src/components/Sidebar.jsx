import React from "react";
import { Avatar, Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = ({ user, onSettings }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const parsedUser = JSON.parse(user || "{}");

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[4],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
        borderRight: `2px solid ${theme.palette.primary.main}`,
      }}
    >
      {/* App Title */}
      <Typography
        variant="h5"
        fontWeight={700}
        color={theme.palette.primary.main}
        mb={3}
      >
        Chat App
      </Typography>

      {/* User Avatar */}
      <Avatar
        sx={{ width: 80, height: 80, mb: 2 }}
        src={parsedUser.profilePic}
      />
      <Typography variant="h6" fontWeight={600} mb={3}>
        {parsedUser?.fullName || "User"}
      </Typography>

      <Divider sx={{ width: "80%", mb: 3 }} />

      {/* Navigation Buttons */}
      <Button
        variant="contained"
        fullWidth
        startIcon={<ChatIcon />}
        sx={{ mb: 2 }}
        onClick={() => navigate("/chat")}
      >
        Chats
      </Button>

      <Button
        variant="outlined"
        fullWidth
        startIcon={<SettingsIcon />}
        onClick={onSettings}
        sx={{ mb: 2 }}
      >
        Settings
      </Button>

      <Button
        variant="outlined"
        color="error"
        fullWidth
        startIcon={<LogoutIcon />}
        onClick={onLogout}
        sx={{ mt: "auto", mb: 2 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;
