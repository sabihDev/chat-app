import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";

import {Toaster} from "react-hot-toast";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(); // Ensure checkAuth is memoized in the store
  }, [checkAuth]);

  if (isCheckingAuth)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!authUser ? <Register /> : <Navigate to="/" />} />
        <Route path="/chat" element={authUser ? <Chat /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/settings" element={authUser ? <Settings /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster/>
    </div>
  );
}

export default App;
