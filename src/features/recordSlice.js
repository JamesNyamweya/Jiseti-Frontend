import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch records
export const fetchUserRecords = createAsyncThunk(
  "records/fetchUserRecords",
  async (userId) => {
    const response = await fetch(
      `http://localhost:5000/records?userId=${userId}`
    );
    return await response.json();
  }
);

// Create new record
export const createRecord = createAsyncThunk(
  "records/createRecord",
  async (newRecordData) => {
    const response = await fetch(`http://localhost:5000/records`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecordData),
    });
    return await response.json();
  }
);

// Update existing record
export const updateRecord = createAsyncThunk(
  "records/updateRecord",
  async ({ id, updatedData }) => {
    const response = await fetch(`http://localhost:5000/records/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    return await response.json();
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
        state.data = action.payload;
      })
      .addCase(fetchUserRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create
      .addCase(createRecord.fulfilled, (state, action) => {
        state.data.push(action.payload);
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
