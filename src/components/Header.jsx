import React from "react";


const Header = () => {
  return (
    <header class="sticky top-0 z-50 bg-[#1F2937] font-sans text-white">
      <div class="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3">
        <div class="flex items-center">
          <a href="#" class="text-xl font-bold">
            <img
              src="src/assets/Jiseti_logo.png"
              alt="Jiseti"
              class="h-[30px] w-auto"
            />
          </a>
        </div>

        <nav class="hidden space-x-6 md:flex">
          <a
            href="#"
            class="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#"
            class="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded transition-colors duration-200"
          >
            About us
          </a>
          <a
            href="#"
            class="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded transition-colors duration-200"
          >
            How it works
          </a>
          <a
            href="#"
            class="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded transition-colors duration-200"
          >
            Report Now
          </a>
          <a
            href="#"
            class="hover:text-gray-300 hover:bg-[#6B7280] px-3 py-2 rounded transition-colors duration-200"
          >
            Login
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
