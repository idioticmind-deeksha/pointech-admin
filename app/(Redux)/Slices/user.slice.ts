import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  walletAddress: "",
  tokenSymbol: "",
  usdtDecimals: "", // "",
  ponitechDecimals: "", // "",
  idSocket: "",
  isRegisterUser: false,
};

/**USER DETAILS SLICE */
export const UserSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setWalletAddress: (state: any, param: any) => {
      const { payload } = param;
      state.walletAddress = payload;
    },
    setTokenSymbol: (state: any, param: any) => {
      const { payload } = param;
      state.tokenSymbol = payload;
    },

    setUsdtDecimal: (state: any, param: any) => {
      const { payload } = param;
      state.usdtDecimals = payload;
    },
    setponitechDecimal: (state: any, param: any) => {
      const { payload } = param;
      state.ponitechDecimals = payload;
    },

    idSocket: (state: any, param: any) => {
      const { payload } = param;
      state.idSocket = payload;
    },

    setisRegisterUser: (state: any, param: any) => {
      const { payload } = param;
      state.isRegisterUser = payload;
    },

    resetUser: () => initialState,
  },
});

/**ACTIONS FOR SLICE*/
export const {
  setTokenSymbol,
  setWalletAddress,
  setUsdtDecimal,
  idSocket,
  setponitechDecimal,
  setisRegisterUser,
  resetUser,
} = UserSlice.actions;
