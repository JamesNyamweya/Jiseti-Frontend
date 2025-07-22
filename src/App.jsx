import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Landing from "./pages/Landing";
import UserDash from "./pages/UserDash";
import ReportForm from "./pages/ReportForm";
import AdminDashboard from "./pages/AdminDashboard";
import CreateRecord from "./components/CreateRecord";
import EditRecord from "./components/EditRecord";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user_dash" element={<UserDash />} />
        <Route path="/report_form" element={<ReportForm />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
