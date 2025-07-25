import Landing from "./pages/Landing";
import Login from "./pages/Login"
import Signup from "./pages/SignUp"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React from "react";
import UserDash from "./pages/UserDash";
import ReportForm from "./pages/ReportForm";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./components/UserDashTable";
// import CreateRecord from "./components/CreateRecord";
// import EditRecord from "./components/EditRecord";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user_dash" element={<UserDash />} />
        <Route path="/report_form" element={<ReportForm />} />
        <Route path="/admin_dashboard" element={<AdminDashboard  />} />
          {/* <Route path="/report" element={<ReportForm/>} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dash" element={<Dashboard />}/>
      </Routes>
    </Router>
  );
}

export default App;
