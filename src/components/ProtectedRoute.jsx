import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useLoginModal } from "../contexts/LoginModalContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);
  const { openLogin, setOnCloseRedirect } = useLoginModal();
  const hasWarned = useRef(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if ((!user || !token) && !hasWarned.current) {
      toast.error("You must be logged in to access this page.");
      openLogin();
      setOnCloseRedirect(() => () => navigate("/"));
      hasWarned.current = true;
    }
  }, [user, token, openLogin, navigate, setOnCloseRedirect]);

  if (!user || !token) {
    return null; 
  }

  return children;
};

export default ProtectedRoute;
