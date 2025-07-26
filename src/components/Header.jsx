import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthModalController from "./AuthModalController";

const Header = () => {

  const [showLogin, setShowLogin] = useState(false);


  return (
    <>
      <header
        className="sticky top-0 z-50 bg-[#1F2937] font-sans text-white"
      >
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3 scroll-smooth">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              <img
                src="src/assets/Jiseti_logo.png"
                alt="Jiseti"
                className="h-[30px] w-auto"
              />
            </Link>
          </div>

          <nav className="hidden space-x-6 md:flex">
            <Link
              to="/"
              onClick={() => {
                setTimeout(() => {
                  const el = document.getElementById("home");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 0);
              }}
              className="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded"
            >
              Home
            </Link>

            <Link
              to="/#about_us"
              className="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded"
            >
              About us
            </Link>

            <Link
              to="/#works"
              className="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded"
            >
              How it works
            </Link>

            <Link
              to="/user_dash"
              className="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded"
            >
              Report Now
            </Link>

            {/* <Link
              to="/report_form"
              className="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded"
            >
              Report Form
            </Link>

            <Link
              to="/admin_dashboard"
              className="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded"
            >
              Admin
            </Link> */}

            <button
              onClick={() => setShowLogin(true)}
              className="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded"
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
