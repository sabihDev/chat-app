import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8D6E63", // Elegant warm brown
    },
    secondary: {
      main: "#A1887F", // Muted beige-brown
    },
    background: {
      default: "#1C1B1A", // Deep dark with a brownish tint
      paper: "#292826", // Slightly lighter brownish-gray
    },
    text: {
      primary: "#EDE7E3", // Soft off-white for readability
      secondary: "#BCAAA4", // Warm brown-gray for subtle contrast
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 14,
    button: {
      fontWeight: 600, // Slightly bolder buttons
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          padding: "10px 16px",
          backgroundColor: "#8D6E63", // Brown accent
          color: "#fff",
          "&:hover": {
            backgroundColor: "#6D4C41", // Darker brown hover effect
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#292826", // Paper background for contrast
          color: "#EDE7E3", // Matching text
          borderRadius: "12px",
          padding: "16px",
        },
      },
    },
  },
});

export default theme;
