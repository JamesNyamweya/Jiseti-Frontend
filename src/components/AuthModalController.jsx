import { useState } from "react";
import Signup from "../pages/SignUp";
import Login from "../pages/Login";

export default function AuthModalController({ imagePath, onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <Login
      imagePath={imagePath}
      onClose={onClose}
      onSwitch={() => setIsLogin(false)}
    />
  ) : (
    <Signup
      imagePath={imagePath}
      onClose={onClose}
      onSwitch={() => setIsLogin(true)}
    />
  );
}
