// Logout.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate("/");
  }, [dispatch, navigate]);

  return null; // or a spinner/loading text
};

export default Logout;
