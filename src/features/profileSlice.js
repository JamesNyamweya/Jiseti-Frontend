import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Axios instance
const api = axios.create({
    baseURL: "https://jiseti-backend-nwg1.onrender.com",
});

// Auth headers helper
const authHeaders = () => {
    const token = localStorage.getItem("access_token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// Fetch current user profile
export const fetchUserProfile = createAsyncThunk(
    "profile/fetchUserProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/profile", authHeaders());
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Profile fetch failed");
        }
    }
);

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching profile";
            });
    },
});

export default profileSlice.reducer;
