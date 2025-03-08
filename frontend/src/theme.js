import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4caf50", // Green
    },
    secondary: {
      main: "#ff9800", // Orange
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.3s ease-in-out",
        },
        contained: {
          background: "linear-gradient(90deg, #43a047, #66bb6a)",
          backgroundSize: "200% 100%",
          transition: "background-position 0.5s ease-in-out, transform 0.3s",
          color: "#fff",
          "&:hover": {
            backgroundPosition: "-100% 0", // Sliding effect
            transform: "scale(1.05)", // Small grow effect
            boxShadow: "0px 4px 12px rgba(76, 175, 80, 0.4)",
          },
        },
        outlined: {
          borderColor: "#4caf50",
          color: "#4caf50",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.3s ease-in-out, border-color 0.3s",
          "&:hover": {
            borderColor: "#388E3C",
            transform: "scale(1.05)",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "300%",
            height: "100%",
            background: "linear-gradient(90deg, rgba(76, 175, 80, 0.4), transparent, rgba(76, 175, 80, 0.4))",
            transition: "left 1.5s ease-in-out",
          },
          "&:hover::after": {
            left: "0%",
          },
        },
      },
    },
  },
});

export default theme;
