import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../User/loginSlice";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Userbooking from "../Booking/Userbooking";

const Home = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (isAuthenticated === true) {
      dispatch(logout());
      navigate("/login");
    }
  };
  const handleCreate = () => {
    if (isAuthenticated === true) {
      navigate("/create");
    }
  };

  const handleLogin = () => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  };

  return (
    <div className="main">
      <div className="parent">
        {isAuthenticated ? (
          <>
            <Button
              variant="contained"
              onClick={() => {
                handleCreate();
              }}
            >
              Create booking
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "red" }}
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            style={{ backgroundColor: "#228B22" }}
            onClick={() => {
              handleLogin();
            }}
          >
            Login
          </Button>
        )}
      </div>
      <div className="user-booking">
        <Userbooking />
      </div>
    </div>
  );
};

export default Home;
