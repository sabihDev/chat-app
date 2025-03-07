import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

function App() {
  return (
    <Container maxWidth="md" sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
}

export default App;
