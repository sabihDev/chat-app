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
  shadows: [
    "none",
    "0px 1px 3px rgba(0, 0, 0, 0.2)",
    "0px 4px 6px rgba(0, 0, 0, 0.3)",
    "0px 5px 15px rgba(0, 0, 0, 0.4)",
    "0px 10px 24px rgba(0, 0, 0, 0.5)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
          "&:hover": {
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.4)",
          },
        },
        contained: {
          background: "linear-gradient(90deg, #43a047, #66bb6a)",
          backgroundSize: "200% 100%",
          transition: "background-position 0.5s ease-in-out, transform 0.3s, box-shadow 0.3s",
          color: "#fff",
          boxShadow: "0px 4px 12px rgba(76, 175, 80, 0.4)",
          "&:hover": {
            backgroundPosition: "-100% 0", // Sliding effect
            transform: "scale(1.05)", // Small grow effect
            boxShadow: "0px 6px 16px rgba(76, 175, 80, 0.5)",
          },
        },
        outlined: {
          borderColor: "#4caf50",
          color: "#4caf50",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.3s ease-in-out, border-color 0.3s, box-shadow 0.3s",
          boxShadow: "0px 2px 6px rgba(76, 175, 80, 0.2)",
          "&:hover": {
            borderColor: "#388E3C",
            transform: "scale(1.05)",
            boxShadow: "0px 4px 10px rgba(76, 175, 80, 0.3)",
          },
          "&::after": {
            content: "''",
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
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.5)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.6)",
        },
      },
    },
  },
});

export default theme;
