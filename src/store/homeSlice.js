import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: {
    poster: "",
    backdrop: "",
  },
  genres: {},
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload ?? initialState.url;
    },
    getGenres: (state, action) => {
      state.genres = action.payload ?? {};
    },
  },
});

export const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;
