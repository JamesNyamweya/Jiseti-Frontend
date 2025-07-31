import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import UserDash from "./pages/UserDash";
import ReportForm from "./pages/ReportForm";
import AdminDash from "./pages/Admin";
import Logout from "./pages/Logout";
import { LoginModalProvider, useLoginModal } from "./contexts/LoginModalContext";
import UserProfile from "./components/UserProfile";
import IncidentDetail from "./components/IncidentDetail";
// import CreateRecord from "./components/CreateRecord";
// import EditRecord from "./components/EditRecord";

function AuthModalContainer() {
  const { isOpen, handleClose, mode, setMode } = useLoginModal();

  if (!isOpen) return null;

  const onSwitch = () => setMode(mode === "login" ? "signup" : "login");

  return mode === "login" ? (
    <Login onClose={handleClose} onSwitch={onSwitch} />
  ) : (
    <Signup onClose={handleClose} onSwitch={onSwitch} />
  );
}


function App() {
  return (
    <LoginModalProvider>
      <Router>
        <Toaster position="top-center" />
        <AuthModalContainer />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <ReportForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user_dash"
            element={
              <ProtectedRoute>
                <UserDash />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/incidents/:id"
            element={
              <ProtectedRoute>
                <IncidentDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <AdminDash />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </LoginModalProvider>
  );
}

export default App;
