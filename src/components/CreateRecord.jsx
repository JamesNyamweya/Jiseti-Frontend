import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecord } from "../features/recordSlice";
import { useNavigate } from "react-router-dom";

const CreateRecord = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    type: "Red Flag",
    description: "",
    status: "draft",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecord = {
      ...formData,
      user_id: user.id,
    };

    try {
      await dispatch(createRecord(newRecord)).unwrap();
      navigate("./src/pages/UserDash.jsx");
    } catch (error) {
      console.error("Failed to create record:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create New Record</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Type:
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border p-2 mt-1"
          >
            <option value="Red Flag">Red Flag</option>
            <option value="Intervention">Intervention</option>
          </select>
        </label>

        <label className="block">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 mt-1"
            rows="4"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Record
        </button>
      </form>
    </div>
  );
};

export default CreateRecord;
