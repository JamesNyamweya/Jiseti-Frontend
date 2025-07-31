import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../features/profileSlice";
import Header from "../components/Header";
import SideBar from "../components/User_SideBar";
import Footer from "../components/Footer";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

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

      {/* Main */}
      <main className="row-start-2 row-end-3 col-start-2 col-end-3 p-6 overflow-auto">
        <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

        {loading && <p>Loading profile...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {user && (
          <div className="bg-white p-6 rounded shadow space-y-4 max-w-md">
            <div>
              <strong>ID:</strong> {user.id}
            </div>
            <div>
              <strong>Username:</strong> {user.username}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>First Name:</strong> {user.first_name}
            </div>
            <div>
              <strong>Last Name:</strong> {user.last_name}
            </div>
            <div>
              <strong>Role:</strong> {user.role}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="col-span-2 row-start-3 row-end-4 text-center text-sm text-gray-600">
        <Footer />
      </footer>
    </div>
  );
};

export default UserProfile;
