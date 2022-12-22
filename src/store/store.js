import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "./countries/countriesSlice";

export default configureStore({
  reducer: {
    countries: countriesSlice,
  },
});
