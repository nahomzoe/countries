import { createSlice } from "@reduxjs/toolkit";
import getAll from "../../services/countries";
// import getAll from "../../services/countries";
export const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    isLoading: true,
    search: "",
  },
  reducers: {
    getCountires(state, action) {
      state.countries = action.payload;
    },

    isLoading(state, action) {
      state.isLoading = action.payload;
    },
    search(state, action) {
      state.search = action.payload;
    },
  },
});

export const initializeCountries = () => {
  return async (dispatch) => {
    const countries = await getAll();
    dispatch(getCountires(countries));
    dispatch(isLoading(false));
  };
};

export const { getCountires, isLoading, search } = countriesSlice.actions;

export default countriesSlice.reducer;
