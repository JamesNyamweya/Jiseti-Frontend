"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecord } from "../features/recordSlice";
import { useNavigate } from "react-router-dom";

const red_flag_titles = [
  "corruption",
  "theft",
  "land-grabbing",
  "mismanagement of resources",
  "bribery",
  "embezzlement",
  "fraud",
  "other",
];

const intervention_titles = [
  "repair bad road sections",
  "collapsed bridges",
  "flooding",
  "sewage",
  "water shortage",
  "electricity issues",
  "healthcare facilities",
  "education facilities",
  "waste management",
  "other",
];

const ReportForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [formType, setFormType] = useState("Red-Flag");
  const [useManualLocation, setUseManualLocation] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    location: { latitude: "", longitude: "" },
    priority: "Low",
    duration: "",
    media: null,
    type: "Red-Flag",
    status: "pending",
  });

  const [showLocationPopup, setShowLocationPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "latitude" || name === "longitude") {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMediaUpload = (e) => {
    setFormData((prev) => ({ ...prev, media: e.target.files[0] }));
  };

  const handleUseLocation = () => {
    setShowLocationPopup(true);
  };

  const handleLocationPermission = (permission) => {
    setShowLocationPopup(false);

    if (permission === "allow") {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setFormData((prev) => ({
              ...prev,
              location: { latitude, longitude },
            }));
            setUseManualLocation(false);
          },
          (error) => {
            alert(
              "Unable to retrieve location. Please try again or enter manually."
            );
          }
        );
      } else {
        alert("Geolocation is not supported.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append(
      "type",
      formType === "Red-Flag" ? "Red-Flag" : "Intervention"
    );
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("latitude", formData.location.latitude);
    payload.append("longitude", formData.location.longitude);

    if (formData.media) {
      payload.append("images", formData.media);
    }

    try {
      await dispatch(createRecord(payload)).unwrap();
      navigate("/user_dash");
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Jiseti Report Form
          </h1>
          <p className="text-slate-600">
            Help improve your community by reporting issues
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 overflow-hidden">
          {/* Form Type Toggle */}
          <div className="bg-gradient-to-r from-slate-100 to-slate-50 p-6 border-b border-slate-200">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setFormType("Red-Flag")}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  formType === "Red-Flag"
                    ? "bg-rose-100 text-rose-700 shadow-md ring-2 ring-rose-200"
                    : "text-slate-600 hover:bg-white hover:shadow-sm"
                }`}
              >
                <span>🚩</span>
                <span>Red-Flag</span>
              </button>
              <button
                onClick={() => setFormType("Intervention")}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  formType === "Intervention"
                    ? "bg-emerald-100 text-emerald-700 shadow-md ring-2 ring-emerald-200"
                    : "text-slate-600 hover:bg-white hover:shadow-sm"
                }`}
              >
                <span>🛠️</span>
                <span>Intervention</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Report Title
              </label>
              <input
                name="title"
                placeholder="Enter a descriptive title"
                className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50"
                onChange={handleChange}
                value={formData.title}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category
              </label>
              <select
                name="category"
                className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50"
                onChange={handleChange}
                value={formData.category}
                required
              >
                <option value="">Select Category</option>
                {(formType === "Red-Flag"
                  ? red_flag_titles
                  : intervention_titles
                ).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                placeholder={
                  formType === "Red-Flag"
                    ? "Provide detailed information about the corrupt incident"
                    : "Describe the issue and its impact on the community"
                }
                className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 resize-none"
                rows={4}
                onChange={handleChange}
                value={formData.description}
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Location
              </label>
              <div className="flex gap-3 mb-4">
                <button
                  type="button"
                  className="flex-1 px-4 py-3 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                  onClick={handleUseLocation}
                >
                  📍 Use Live Location
                </button>
                <button
                  type="button"
                  className="flex-1 px-4 py-3 rounded-xl text-sm font-medium bg-slate-600 text-white hover:bg-slate-700 transition-colors duration-200 shadow-sm"
                  onClick={() => setUseManualLocation(true)}
                >
                  ✏️ Enter Manually
                </button>
              </div>
              {useManualLocation && (
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="latitude"
                    placeholder="Latitude"
                    className="border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50"
                    value={formData.location.latitude}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="longitude"
                    placeholder="Longitude"
                    className="border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50"
                    value={formData.location.longitude}
                    onChange={handleChange}
                  />
                </div>
              )}
              {!useManualLocation && formData.location.latitude && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700 font-medium">
                  📍 Location captured: {formData.location.latitude},{" "}
                  {formData.location.longitude}
                </div>
              )}
            </div>

            {/* Media */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Media (Image/Video)
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors duration-200">
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="w-full text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={handleMediaUpload}
                />
                <p className="text-xs text-slate-500 mt-2">
                  Upload images or videos as evidence
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-medium hover:bg-slate-300 transition-colors duration-200 shadow-sm"
              >
                ← Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg"
              >
                ✅ Submit Report
              </button>
            </div>
          </form>
        </div>
        {/* Location Permission Popup */}
        {showLocationPopup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Location Access
                </h3>
                <p className="text-slate-600 text-sm">
                  Jiseti Report Form would like to access your location to
                  automatically fill in your coordinates.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleLocationPermission("allow")}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Allow Now
                </button>
                <button
                  onClick={() => handleLocationPermission("allow")}
                  className="w-full bg-blue-100 text-blue-700 py-3 px-4 rounded-xl font-medium hover:bg-blue-200 transition-colors duration-200"
                >
                  Allow When in App
                </button>
                <button
                  onClick={() => handleLocationPermission("deny")}
                  className="w-full bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-medium hover:bg-slate-300 transition-colors duration-200"
                >
                  Don't Allow
                </button>
              </div>

              <button
                onClick={() => setShowLocationPopup(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportForm;
