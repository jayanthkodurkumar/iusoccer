import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { addBookings } from "./bookingSlice";

const CreateBooking = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const user = useSelector((state) => state.login.user);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date: "",
    start_time: "",
    end_time: "",
    user_name: user.user_name,
  });

  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    try {
      const formattedDate = dayjs(formData.date).format("YYYY-MM-DD");
      const formattedStartTime = dayjs(formData.start_time).format("HH:mm:ss");
      const formattedEndTime = dayjs(formData.end_time).format("HH:mm:ss");

      formData.date = formattedDate;
      formData.start_time = formattedStartTime;
      formData.end_time = formattedEndTime;

      const updatedFormData = {
        ...formData,
        date: formattedDate,
        start_time: formattedStartTime,
        end_time: formattedEndTime,
      };
      setAddRequestStatus("pending");
      dispatch(addBookings({ data: updatedFormData, isAuthenticated, user }));

      navigate("/");
    } catch (error) {
      // console.log(error);
    } finally {
      setAddRequestStatus("idle");
    }
  };

  const nineAM = dayjs().set("hour", 9).set("minute", 0).set("second", 0);
  const tenPM = dayjs().set("hour", 22).set("minute", 0).set("second", 0);
  return (
    <div>
      <h1>Create A New Booking</h1>
      <Container>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
        >
          <TextField
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={(e) => handleChange("first_name", e.target.value)}
            required
          />
          <TextField
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={(e) => handleChange("last_name", e.target.value)}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              disablePast
              onChange={(date) => {
                handleChange("date", date);
              }}
              required
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Select Start Time"
              name="start_time"
              minTime={nineAM}
              maxTime={tenPM}
              // value={formData.start_time}
              onChange={(start_time) => handleChange("start_time", start_time)}
              required
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Select End Time"
              minTime={nineAM}
              maxTime={tenPM}
              onChange={(end_time) => {
                handleChange("end_time", end_time);
              }}
              required
            />
          </LocalizationProvider>

          <Button
            variant="contained"
            style={{ backgroundColor: "#228B22" }}
            onClick={() => {
              handleSubmit();
            }}
          >
            BOOK YOUR SLOT
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default CreateBooking;
