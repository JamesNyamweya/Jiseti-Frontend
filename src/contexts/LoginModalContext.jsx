import { createContext, useContext, useState } from "react";

const LoginModalContext = createContext();

export const useLoginModal = () => useContext(LoginModalContext);

export const LoginModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [onCloseRedirect, setOnCloseRedirect] = useState(null); // 🔁

  const openLogin = () => {
    setMode("login");
    setIsOpen(true);
  };

  const openSignup = () => {
    setMode("signup");
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onCloseRedirect) {
      onCloseRedirect(); 
      setOnCloseRedirect(null); 
    }
  };

  return (
    <LoginModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        mode,
        setMode,
        openLogin,
        openSignup,
        handleClose, 
        setOnCloseRedirect, 
      }}
    >
      {children}
    </LoginModalContext.Provider>
  );
};
