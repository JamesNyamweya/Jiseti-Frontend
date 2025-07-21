import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);

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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Category</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td className="p-2 border">{report.id}</td>
              <td className="p-2 border">{report.title}</td>
              <td className="p-2 border">{report.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
