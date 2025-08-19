import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  claimableAmount: "", // can claim
  claimCount: "", // just counter
  claimdAmount: "", //  amount have to be claimed
  totalTokenAmount: "", // total token claimable and claimed
};

/**USER DETAILS SLICE */
export const privateUserSlice = createSlice({
  name: "privateUser",
  initialState,

  reducers: {
    setClaimDetails: (
      state: any,
      action: PayloadAction<{
        claimableAmount: string;
        claimCount: string;
        claimdAmount: string;
        totalTokenAmount: string;
      }>
    ) => {
      state.claimableAmount = action.payload.claimableAmount;
      state.claimCount = action.payload.claimCount;
      state.claimdAmount = action.payload.claimdAmount;
      state.totalTokenAmount = action.payload.totalTokenAmount;
    },

    resetUser: () => initialState,
  },
});

/**ACTIONS FOR SLICE*/
export const { setClaimDetails } = privateUserSlice.actions;
