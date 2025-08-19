import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

/**LOADER SLICE */
export const LoaderSlice = createSlice({
  name: "loader",

  initialState,

  reducers: {
    loader: (state, param) => {
      const { payload } = param;
      state.isLoading = payload;
    },

    resetLoader: () => initialState,
  },
});

/**ACTION FOR SLICE*/
export const { loader, resetLoader } = LoaderSlice.actions;
