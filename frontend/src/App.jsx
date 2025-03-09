import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { SnackbarProvider } from "notistack";
import CustomToast from "./components/CustomToast";

function App() {
  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <Container maxWidth="md" sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </SnackbarProvider>
    </>
  );
}

const Root = () => {

  const isAuthenticated = !!localStorage.getItem("jwt");

  return isAuthenticated ? (
    <Navigate to="/chat" />
  ) : (
    <Navigate to="/login" />
  )
};

export default App;
