import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingsbyUserId } from "./userBookingSlice";
import { getBookingsStatus, fetchBookings } from "./bookingSlice";

// mui
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import axios from "axios";

const Userbooking = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  // console.log(isAuthenticated);

  const user = useSelector((state) => state.login.user);

  const userbookingsStatus = useSelector((state) => state.userbooking.status);
  // console.log(user);
  // console.log(userbookingsStatus);
  const user_id = user?.userId;
  // console.log(user_id);
  const first_name = user?.first_name;

  useEffect(() => {
    if (user_id && isAuthenticated && userbookingsStatus === "idle") {
      dispatch(fetchBookingsbyUserId(user_id));
    }
  }, [user_id, isAuthenticated, userbookingsStatus, dispatch]);

  useEffect(() => {
    // Fetch user bookings when the component mounts (initial load or refresh)
    if (user_id && isAuthenticated) {
      dispatch(fetchBookingsbyUserId(user_id));
    }
  }, [user_id, isAuthenticated, dispatch]);

  const bookingsStatus = useSelector(getBookingsStatus);

  useEffect(() => {
    if (bookingsStatus === "idle") {
      dispatch(fetchBookings());
    }
  }, [bookingsStatus, dispatch]);

  const userbookings = useSelector((state) => state.userbooking.userBookings);
  const handleDelete = async (bookingId, e) => {
    e.stopPropagation();

    const DELETE_URL = `http://localhost:8080/users/booking/${bookingId}`;
    try {
      await axios.delete(DELETE_URL);

      dispatch(fetchBookingsbyUserId(user_id));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  //   table
  const columns = [
    { field: "id", headerName: "BOOKING ID", width: 100 },
    { field: "first_name", headerName: "FIRST NAME", width: 130 },
    { field: "last_name", headerName: "LAST NAME", width: 130 },
    {
      field: "date",
      headerName: "DATE",
      type: new Date(userbookings.date),
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
      field: "DELETE",
      headerName: "",
      type: "button",
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          style={{ backgroundColor: "#ed3235" }}
          onClick={(e) => handleDelete(params.row.id, e)}
        >
          CANCEL BOOKING
        </Button>
      ),
    },
  ];

  const rows = userbookings.map((booking) => ({
    id: booking.bookingId,
    last_name: booking.last_name,
    first_name: booking.first_name,
    date: booking.date,
    start_time: booking.start_time,
    end_time: booking.end_time,
  }));
  //   console.log(bookings);

  return (
    <div className="parent">
      {userbookings.length === 0 ? (
        <p>You have no bookings.</p>
      ) : (
        <div className="parent">
          <h2>Welcome {user.userDetails.username}</h2>
          <p>Your current reservations</p>
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
      )}
    </div>
  );
};

export default Userbooking;
