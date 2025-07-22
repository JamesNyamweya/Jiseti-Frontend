import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRecord } from "../features/recordSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditRecord = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const records = useSelector((state) => state.records.items);
  const record = records.find(r => r.id === parseInt(id));

  const [formData, setFormData] = useState({
    type: "",
    description: "",
    status: "draft",
  });

  useEffect(() => {
    if (record) {
      setFormData({
        type: record.type,
        description: record.description,
        status: record.status,
      });
    }
  }, [record]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updated = {
      ...formData,
      id: record.id,
    };

    try {
      await dispatch(updateRecord(updated)).unwrap();
      navigate("./src/pages/UserDash.jsx");
    } catch (error) {
      console.error("Failed to update record:", error);
    }
  };

  if (!record) return <p className="text-center mt-10">Record not found</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Record</h2>
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

        <label className="block">
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 mt-1"
          >
            <option value="draft">Draft</option>
            <option value="under investigation">Under Investigation</option>
            <option value="resolved">Resolved</option>
          </select>
        </label>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update Record
        </button>
      </form>
    </div>
  );
};

export default EditRecord;
