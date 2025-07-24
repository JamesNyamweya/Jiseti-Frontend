import React from "react";
import Header from "../components/Header";
import SideBar from "../components/User_SideBar";
import Footer from "../components/Footer";
import Dashboard from "../components/UserDashTable"

// Replace this with your actual main content component
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRecords } from '../features/recordSlice';

const UserDash = () => {
  const dispatch = useDispatch();

  // Get user and records from Redux
  const user = useSelector((state) => state.auth.user);
  const records = useSelector((state) => state.records.items);
  const status = useSelector((state) => state.records.status);
  const error = useSelector((state) => state.records.error);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserRecords(user.id));
    }
  }, [dispatch, user]);

  // Filter records belonging to logged-in user
  const userRecords = records.filter(record => record.user_id === user?.id);

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
        <h1 className="text-2xl font-semibold mb-4">Welcome to the User Dashboard</h1>

        {status === 'loading' && <p>Loading records...</p>}
        {status === 'failed' && <p className="text-red-600">Error: {error}</p>}

        {status === 'succeeded' && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Type</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userRecords.map(record => (
                  <tr key={record.id}>
                    <td className="px-4 py-2 border">{record.id}</td>
                    <td className="px-4 py-2 border">{record.type}</td>
                    <td className="px-4 py-2 border">{record.status}</td>
                    <td className="px-4 py-2 border">{record.description}</td>
                    <td className="px-4 py-2 border text-center">
                      {record.status === "draft" && (
                        <>
                          <button className="text-blue-600 hover:underline mr-2">Edit</button>
                          <button className="text-red-600 hover:underline">Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="col-span-2 row-start-3 row-end-4 bg-gray-200 text-center py-4 text-sm text-gray-600">
        <Footer />
      </footer>
    </div>
  );
};

export default UserDash;