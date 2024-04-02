import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CreateBooking from "./features/Booking/CreateBooking";
import Login from "./features/User/Login";
import CreateUser from "./features/User/CreateUser";
import Home from "./features/Home/Home";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  // console.log(isAuthenticated);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateUser />} />
          <Route
            path="/create"
            element={
              isAuthenticated ? <CreateBooking /> : <Navigate to="/login" />
            }
          />
          <Route path="/register" element={<CreateUser />} />
          {/* <Route path="/booking" element={<Booking />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
