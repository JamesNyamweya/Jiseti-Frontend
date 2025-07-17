import React, { useState } from "react";
import AuthModalController from "./AuthModalController";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-50 bg-[#1F2937] font-sans text-white">
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
            <a
              href="#"
              className="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#about_us"
              className="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded transition-colors duration-200"
            >
              About us
            </a>
            <a
              href="#works"
              className="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded transition-colors duration-200"
            >
              How it works
            </a>
            <a
              href="#report_now"
              className="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded transition-colors duration-200"
            >
              Report Now
            </a>
            <button
              onClick={() => setShowLogin(true)}
              className="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded transition-colors duration-200"
            >
              Login
            </button>
          </nav>
        </div>
      </header>
      {showLogin && (
        <AuthModalController
          onClose={() => setShowLogin(false)}
        />
      )}
    </>
  );
};

export default Header;
