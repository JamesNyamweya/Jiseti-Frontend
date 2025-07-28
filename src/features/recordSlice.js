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



export const updateRecord = createAsyncThunk(
  "records/updateRecord",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const isFormData = updatedData instanceof FormData;

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      };

      const response = await api.put(`/records/${id}`, updatedData, { headers });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
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
      })
      // Admin - Fetch all
      .addCase(fetchAllRecords.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      // Admin - Patch status
      .addCase(patchRecordStatus.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (record) => record.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = {
            ...state.data[index],
            ...action.payload,
          };
        }
      });
  },
});


export const fetchAllRecords = createAsyncThunk(
  "records/fetchAllRecords",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/records", authHeaders());
      return response.data.records;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Fetch failed");
    }
  }
);


export const patchRecordStatus = createAsyncThunk(
  "records/patchRecordStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/admin/records/${id}`,
        { status },
        authHeaders()
      );
      return response.data.record;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Status update failed");
    }
  }
);


export default recordSlice.reducer;
