import React, { useEffect } from "react";
import Header from "../components/Header";
import SideBar from "../components/User_SideBar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRecords } from "../features/recordSlice";
import { deleteRecord } from "../features/recordSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserDash = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const records = useSelector((state) => state.records.data);
  const loading = useSelector((state) => state.records.loading);
  const error = useSelector((state) => state.records.error);
  const navigate = useNavigate();

const handleDelete = (id) => {
  toast(
    (t) => (
      <span>
        Are you sure you want to delete this record?
        <div className="mt-2 flex gap-3">
          <button
            onClick={() => {
              dispatch(deleteRecord(id));
              toast.dismiss(t.id);
              toast.success("Record deleted successfully");
            }}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm"
          >
            Cancel
          </button>
        </div>
      </span>
    ),
    { duration: 6000 }
  );
};


  // Come back here to ensure that the fields that I can edit are specified
  const handleEdit = (record) => {
    navigate("/report", { state: { record } });
  };
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserRecords(user.id));
    }
  }, [dispatch, user]);

  // Filter logged-in user's records
  const userRecords = records.filter((record) => record.user_id === user?.id);

  // Count summary stats
  const totalRecords = userRecords.length;
  const redFlags = userRecords.filter((r) => r.type === "Red-Flag").length;
  const interventions = userRecords.filter(
    (r) => r.type === "Intervention"
  ).length;
  const resolved = userRecords.filter((r) => r.status === "resolved").length;

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
        <h1 className="text-2xl font-semibold mb-6">
          Welcome to the User Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-lg font-bold text-gray-700">Total</h2>
            <p className="text-2xl text-blue-600">{totalRecords}</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-lg font-bold text-gray-700">Red-Flags</h2>
            <p className="text-2xl text-red-600">{redFlags}</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-lg font-bold text-gray-700">Interventions</h2>
            <p className="text-2xl text-yellow-500">{interventions}</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-lg font-bold text-gray-700">Resolved</h2>
            <p className="text-2xl text-green-600">{resolved}</p>
          </div>
        </div>

        {/* Records Table */}
        {loading && <p>Loading records...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

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
              {userRecords.map((record, index) => (
                <tr key={record.id}>
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{record.type}</td>
                  <td className="px-4 py-2 border">{record.status}</td>
                  <td className="px-4 py-2 border">{record.description}</td>
                  <td className="px-4 py-2 border text-center">
                    {record.status === "pending" && (
                      <>
                        <button onClick={() => handleEdit(record)} className="text-blue-600 hover:underline mr-2">
                          Edit
                        </button>
                        <button onClick={()=> handleDelete(record.id)} className="text-red-600 hover:underline">
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="col-span-2 row-start-3 row-end-4 text-center text-sm text-gray-600">
        <Footer />
      </footer>
    </div>
  );
};

export default UserDash;
