import Landing from "./pages/Landing";
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
          <Route path="/user_dash" element={<UserDash/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
