import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllBookings,
  getBookingsStatus,
  fetchBookings,
} from "./bookingSlice";

// mui
import { DataGrid } from "@mui/x-data-grid";

import Button from "@mui/material/Button";

const Booking = () => {
  const dispatch = useDispatch();

  const bookings = useSelector(selectAllBookings);
  const bookingsStatus = useSelector(getBookingsStatus);
  // const bookingsError = useSelector(getBookingsError);

  useEffect(() => {
    if (bookingsStatus === "idle") {
      dispatch(fetchBookings());
      //   console.log(fetchBookings);
    }
  }, [bookingsStatus, dispatch]);

  //   table
  const columns = [
    { field: "id", headerName: "BOOKING ID", width: 100 },
    { field: "first_name", headerName: "FIRST NAME", width: 130 },
    { field: "last_name", headerName: "LAST NAME", width: 130 },
    {
      field: "date",
      headerName: "DATE",
      type: new Date(bookings.date),
      width: 120,
    },
    {
      field: "start_time",
      headerName: "START TIME",
      type: "time",
      width: 150,
    },
    {
      field: "end_time",
      headerName: "END_TIME",
      type: "time",
      width: 120,
    },
    {
      field: "VIEW",
      headerName: "",
      type: "button",
      width: 80,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            // console.log("view clicked");
          }}
        >
          VIEW
        </Button>
      ),
    },
    {
      field: "DELETE",
      headerName: "",
      type: "button",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          style={{ backgroundColor: "#ed3235" }}
          onClick={(e) => {
            e.stopPropagation();
            // console.log("çancel clicked");
          }}
        >
          CANCEL
        </Button>
      ),
    },
  ];

  const rows = bookings.map((booking) => ({
    id: booking.bookingId,
    last_name: booking.last_name,
    first_name: booking.first_name,
    date: booking.date, // Replace this with the actual property from your booking data
    start_time: booking.start_time,
    end_time: booking.end_time,
  }));
  //   console.log(bookings);
  return (
    <div>
      <h1> Your Bookings </h1>

      <div style={{ display: "inline-block" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default Booking;
