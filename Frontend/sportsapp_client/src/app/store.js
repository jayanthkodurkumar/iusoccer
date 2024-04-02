import { combineReducers, configureStore } from "@reduxjs/toolkit";

import bookingReducer from "../features/Booking/bookingSlice";
import userBookingReducer from "../features/Booking/userBookingSlice";

import loginReducer from "../features/User/loginSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  blacklist: ["error"],
};

const reducer = combineReducers({
  bookings: bookingReducer,
  login: loginReducer,
  userbooking: userBookingReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
