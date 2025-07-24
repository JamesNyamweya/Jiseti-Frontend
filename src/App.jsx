import Landing from "./pages/Landing";
import Login from "./pages/Login"
import Signup from "./pages/SignUp"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserDash from "./pages/UserDash";
function App() {
  return (
    <>
      <Toaster position="top-center" />
      {/* <Landing /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/user_dash" element={<UserDash />} />
          {/* <Route path="/report" element={<ReportForm/>} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
