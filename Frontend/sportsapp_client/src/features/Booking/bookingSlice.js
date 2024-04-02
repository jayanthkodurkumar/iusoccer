import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BOOKINGS_URL = "http://localhost:8080/booking";

const initialState = {
  bookings: [],
  status: "idle",
  error: null,
};
export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async () => {
    try {
      const response = await axios.get(BOOKINGS_URL);

      return response.data;
    } catch (error) {
      console.error("Error fetching bookings:", error);

      throw error;
    }
  }
);

export const addBookings = createAsyncThunk(
  "bookings/addBookings",
  async ({ data, isAuthenticated, user }) => {
    try {
      const user_id = user.userId;
      const username = user.userDetails.username;
      data = { ...data, user_name: username };
      // console.log("first", user);

      if (isAuthenticated) {
        const ADD_BOOKINGS_URL = `http://localhost:8080/users/${user_id}/booking`;
        // console.log(data);
        const response = await axios.post(ADD_BOOKINGS_URL, data);
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

export const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBookings.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "suceeded";

        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addBookings.fulfilled, (state, action) => {
        // console.log("Received Payload:", action.payload);
        state.bookings.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(addBookings.rejected, (state, action) => {
        state.status = "failed";
        state.bookings = [];
        state.error = action.error.message;
      });
  },
});

export const selectAllBookings = (state) => state.bookings.bookings;
export const getBookingsStatus = (state) => state.bookings.status;
export const getBookingsError = (state) => state.bookings.error;

export const { bookingAdded } = bookingSlice.actions;

export default bookingSlice.reducer;
