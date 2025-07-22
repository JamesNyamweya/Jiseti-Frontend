import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserRecords = createAsyncThunk(
    'records/fetchUserRecords',
    async (userId) => {
      const response = await fetch(`http://localhost:5000/records?userId=${userId}`);
      return await response.json();
    }
  );
  
  const recordSlice = createSlice({
    name: 'records',
    initialState: {
      data: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
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
        });
    },
  });
  
  export default recordSlice.reducer;