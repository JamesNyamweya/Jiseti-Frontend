import React from "react";
import Header from "../components/Header";
import SideBar from "../components/User_SideBar";
import Footer from "../components/Footer";
import Dashboard from "../components/UserDashTable"

// Replace this with your actual main content component

const UserDash = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] min-h-screen bg-gray-50">
      {/* Header */}
      <header className="col-span-2 row-start-1 row-end-2 sticky top-0 z-50">
        <Header />
      </header>

      {/* Sidebar */}
      <aside className="row-start-2 row-end-3 col-start-1 col-end-2 bg-white border-r shadow-sm">
        <SideBar />
      </aside>

      {/* Main Content */}
      <main className="row-start-2 row-end-3 col-start-2 col-end-3 p-6 overflow-auto">
        <Dashboard />
      </main>

      {/* Footer */}
      <footer className="col-span-2 row-start-3 row-end-4 bg-gray-200 text-center py-4 text-sm text-gray-600">
        <Footer />
      </footer>
    </div>
  );
};

export default UserDash;
