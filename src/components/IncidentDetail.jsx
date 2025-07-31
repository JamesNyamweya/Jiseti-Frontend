import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleRecord } from "../features/recordSlice";
import Header from "../components/Header";
import SideBar from "../components/Admin_SideBar";
import Footer from "../components/Footer";

const IncidentDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    singleRecord: incident,
    loading,
    error,
  } = useSelector((state) => state.records);

  useEffect(() => {
    dispatch(fetchSingleRecord(id));
  }, [dispatch, id]);

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
      <main className="row-start-2 row-end-3 col-start-2 col-end-3 p-6 overflow-auto font-['Inter']">
        {loading && <p>Loading incident details...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!incident && !loading && <p>No incident found.</p>}

        {incident && (
          <>
            <h2 className="text-3xl font-bold mb-4 text-[#2563EB]">
              Incident #{incident.id}
            </h2>
            <div className="bg-white shadow rounded-lg p-6 space-y-4 max-w-4xl">
              <p>
                <strong>Title:</strong> {incident.title}
              </p>
              <p>
                <strong>Type:</strong> {incident.type}
              </p>
              <p>
                <strong>Description:</strong> {incident.description}
              </p>
              <p>
                <strong>Status:</strong> {incident.status}
              </p>
              <p>
                <strong>Latitude:</strong> {incident.latitude}
              </p>
              <p>
                <strong>Longitude:</strong> {incident.longitude}
              </p>
              <p>
                <strong>User ID:</strong> {incident.user_id}
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {new Date(incident.created_at).toLocaleString()}
              </p>
              <p>
                <strong>Updated:</strong>{" "}
                {new Date(incident.updated_at).toLocaleString()}
              </p>

              {incident.images && incident.images.length > 0 && (
                <div>
                  <strong>Images:</strong>
                  <div className="flex gap-4 flex-wrap mt-2">
                    {incident.images.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt={`incident-img-${i}`}
                        className="w-100 h-100 object-cover rounded border"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="col-span-2 row-start-3 row-end-4 text-center text-sm text-gray-600">
        <Footer />
      </footer>
    </div>
  );
};

export default IncidentDetail;
