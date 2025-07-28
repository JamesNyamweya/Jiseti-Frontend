import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [records, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const dummyReports = [
        { id: 1, title: "Bug in login", category: "bug" },
        { id: 2, title: "Feature request: dark mode", category: "feature" },
      ];
      setReports(dummyReports);
    };
    fetchReports();
  }, []);

  const allRecords = records;
  return (
    <main className="row-start-2 row-end-3 col-start-2 col-end-3 p-6 overflow-auto">
      <h1 className="text-2xl font-semibold mb-6">
        Welcome to the Admin Dashboard
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-lg font-bold text-gray-700">Total</h2>
          <p className="text-2xl text-blue-600">{records.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-lg font-bold text-gray-700">Investigation</h2>
          <p className="text-2xl text-blue-600">
            {records.filter((r) => r.status === "under investigation").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-lg font-bold text-gray-700">Resolved</h2>
          <p className="text-2xl text-green-600">
            {records.filter((r) => r.status === "resolved").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-lg font-bold text-gray-700">Rejected</h2>
          <p className="text-2xl text-red-600">
            {records.filter((r) => r.status === "rejected").length}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">User ID</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allRecords.map((record, index) => (
              <tr key={record.id}>
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{record.user_id}</td>
                <td className="px-4 py-2 border">{record.type}</td>
                <td className="px-4 py-2 border">{record.status}</td>
                <td className="px-4 py-2 border">{record.description}</td>
                <td className="px-4 py-2 border text-center">
                  {record.status != "resolved" && (
                    <>
                      <button
                        onClick={() => handleStatus(record)}
                        className="text-blue-600 hover:underline mr-2"
                      >
                        Edit Status
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
  );
};

export default AdminDashboard;
