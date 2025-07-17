import React, { useState, useEffect } from "react";
import AuthModalController from "./AuthModalController";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


const Header = () => {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  useEffect(() => {
    if (location.state?.scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);
  return (
    <>
      <header
        id="home"
        className="sticky top-0 z-50 bg-[#1F2937] font-sans text-white"
      >
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3 scroll-smooth">
          <div className="flex items-center">
            <a href="#" className="text-xl font-bold">
              <img
                src="src/assets/Jiseti_logo.png"
                alt="Jiseti"
                className="h-[30px] w-auto"
              />
            </a>
          </div>

          <nav className="hidden space-x-6 md:flex">
            <Link
              to="/"
              state={{ scrollToTop: true }}
              className="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded transition-colors duration-200"
            >
              Home
            </Link>

            <Link
              to="/#about_us"
              className="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded transition-colors duration-200"
            >
              About us
            </Link>

            <Link
              to="/#works"
              className="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded transition-colors duration-200"
            >
              How it works
            </Link>

            <Link
              to="/user_dash"
              className="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded transition-colors duration-200"
            >
              Report Now
            </Link>

            <button
              onClick={() => setShowLogin(true)}
              className="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded transition-colors duration-200"
            >
              Login
            </button>
          </nav>
        </div>
      </header>
      {showLogin && <AuthModalController onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Header;
