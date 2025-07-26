import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Attach token from localStorage
const authHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch user records
export const fetchUserRecords = createAsyncThunk(
  "records/fetchUserRecords",
  async (userId) => {
    const response = await api.get(`/records?userId=${userId}`, authHeaders());
    return response.data;
  }
);

// Create new record
export const createRecord = createAsyncThunk(
  "records/createRecord",
  async (newRecordData) => {
    const response = await api.post("/records", newRecordData, authHeaders());
    return response.data;
  }
);

export const deleteRecord = createAsyncThunk(
  "records/deleteRecord",
  async (id) => {
    await api.delete(`/records/${id}`, authHeaders());
    return id;
  }
);


// export const updateRecord = createAsyncThunk(
//   "records/updateRecord",
//   async ({ id, updatedData }) => {
//     const response = await api.patch(
//       `/records/${id}`,
//       updatedData,
//       authHeaders()
//     );
//     return response.data;
//   }
// );

export const updateRecord = createAsyncThunk(
  "records/updateRecord",
  async ({ id, updatedData }) => {
    const isFormData = updatedData instanceof FormData;

    const response = await api.patch(
      `/records/${id}`,
      updatedData,
      isFormData
        ? {
          headers: {
            ...authHeaders().headers,
            "Content-Type": "multipart/form-data",
          },
        }
        : authHeaders()
    );
    return response.data;
  }
);


const recordSlice = createSlice({
  name: "records",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchUserRecords.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.records || []; // expecting { records: [...] }
      })
      .addCase(fetchUserRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create
      .addCase(createRecord.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Delete
      .addCase(deleteRecord.fulfilled, (state, action) => {
        state.data = state.data.filter((record) => record.id !== action.payload);
      })

      // Update
      .addCase(updateRecord.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (record) => record.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      });
  },
});

export default recordSlice.reducer;
