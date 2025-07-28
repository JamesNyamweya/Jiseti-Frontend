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

  return (
    <>
      {/* Summary Cards for Admin */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <h3 className="text-sm text-gray-500 font-medium uppercase">
            📊 Total Reports
          </h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {records.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <h3 className="text-sm text-gray-500 font-medium uppercase">
            🕵️ Under Investigation
          </h3>
          <p className="text-3xl font-bold text-[#2563EB] mt-2">
            {records.filter((r) => r.status === "under-investigation").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <h3 className="text-sm text-gray-500 font-medium uppercase">
            ✅ Resolved
          </h3>
          <p className="text-3xl font-bold text-[#10B981] mt-2">
            {records.filter((r) => r.status === "resolved").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <h3 className="text-sm text-gray-500 font-medium uppercase">
            ❌ Rejected
          </h3>
          <p className="text-3xl font-bold text-[#EF4444] mt-2">
            {records.filter((r) => r.status === "rejected").length}
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
