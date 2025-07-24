import React, { useEffect, useState } from "react";
import axios from "../axios";

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    axios
      .get("/incidents")
      .then((res) => setIncidents(res.data))
      .catch((err) => console.error(err));
  }, []);

  const total = incidents.length;
  const redFlags = incidents.filter((i) => i.type === "Corruption").length;
  const interventions = incidents.filter(
    (i) => i.type === "Intervention"
  ).length;
  const resolved = incidents.filter((i) => i.status === "Resolved").length;

  const statusColor = (status) => {
    switch (status) {
      case "Under Investigation":
        return "text-[#2563EB]";
      case "Resolved":
        return "text-[#10B981]";
      case "Rejected":
        return "text-[#EF4444]";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="p-8 font-['Inter']">
      <h1 className="text-center text-3xl font-bold text-[#2563EB] mb-8">
        Jiseti Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <div className="bg-white shadow rounded px-6 py-4 w-52 text-center border">
          <span className="text-2xl">📊</span>
          <p className="font-semibold">Total: {total}</p>
        </div>
        <div className="bg-white shadow rounded px-6 py-4 w-52 text-center border">
          <span className="text-2xl">🟥</span>
          <p className="font-semibold">Red Flags: {redFlags}</p>
        </div>
        <div className="bg-white shadow rounded px-6 py-4 w-52 text-center border">
          <span className="text-2xl">🟩</span>
          <p className="font-semibold">Interventions: {interventions}</p>
        </div>
        <div className="bg-white shadow rounded px-6 py-4 w-52 text-center border">
          <span className="text-2xl">✅</span>
          <p className="font-semibold">Resolved: {resolved}</p>
        </div>
      </div>

      {/* Incidents Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#6B7280]/80 text-white font-bold">
              <th className="p-3">#</th>
              <th className="p-3">Title</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Location</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident, index) => (
              <tr
                key={incident.incident_id}
                className="border-b hover:bg-gray-100"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{incident.title}</td>
                <td className="p-3">{incident.type}</td>
                <td
                  className={`p-3 font-semibold ${statusColor(
                    incident.status
                  )}`}
                >
                  {incident.status}
                </td>
                <td className="p-3">
                  Lat: {incident.geolocation.lat}, Long: {incident.geolocation.long}
                </td>
                <td className="p-3">
                  {incident.dateCreated}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
