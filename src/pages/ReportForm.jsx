import React, { useState } from "react";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    customCategory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      category:
        formData.category === "other" && formData.customCategory
          ? formData.customCategory
          : formData.category,
    };
    console.log("Submitting Report:", payload);
    // Submit to backend...
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Submit a Report</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Report Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* ✅ Corrected Category Dropdown */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="corruption">Corruption</option>
          <option value="complain">Complain</option>
          <option value="misconduct">Misconduct</option>
          <option value="abuse_of_office">Abuse of Office</option>
          <option value="neglect">Neglect</option>
          <option value="fraud">Fraud</option>
          <option value="other">Other</option>
        </select>

        {/* ✅ Conditional Custom Category Input */}
        {formData.category === "other" && (
          <input
            type="text"
            name="customCategory"
            placeholder="Please specify category"
            value={formData.customCategory}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
