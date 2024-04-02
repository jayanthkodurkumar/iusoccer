import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  userBookings: [],
  status: "idle",
  error: null,
};

export const fetchBookingsbyUserId = createAsyncThunk(
  "bookings/fetchBookingsbyUserId",
  async (user_id) => {
    try {
      // const { user_id } = user;
      // console.log(user_id);
      const USER_BOOKINGS_URL = `http://localhost:8080/users/${user_id}/bookings`;
      // console.log(USER_BOOKINGS_URL);
      const response = await axios.get(USER_BOOKINGS_URL);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching bookings:", error);

      throw error;
    }
  }
);
export const userbookingSlice = createSlice({
  name: "userbookings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBookingsbyUserId.pending, (state, action) => {
        state.status = "loading";
        state.userBookings = [];
        state.error = null;
      })
      .addCase(fetchBookingsbyUserId.fulfilled, (state, action) => {
        state.status = "suceeded";
        state.userBookings = action.payload;
        state.error = null;
      })
      .addCase(fetchBookingsbyUserId.rejected, (state, action) => {
        state.status = "failed";
        state.userBookings = [];
        state.error = action.error.message;
      });
  },
});

export default userbookingSlice.reducer;
