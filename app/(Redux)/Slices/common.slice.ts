import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usdtDecimals: "", // "",
  phase: "1",
  defaultPhase: "0",
  defaulTimer: "",
};

export const CommonSlice = createSlice({
  name: "common",
  initialState,

  reducers: {
    setPhase: (state: any, param: any) => {
      const { payload } = param;
      state.phase = payload.phase;
      state.defaultPhase = payload.defaultPhase;
      state.defaulTimer = payload.defaulTimer;
    },

    resetIssuer: () => initialState,
  },
});

/**ACTIONS FOR SLICE*/
export const { resetIssuer, setPhase } = CommonSlice.actions;
