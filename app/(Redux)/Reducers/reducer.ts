import { combineReducers } from "redux";
import { CommonSlice } from "../Slices/common.slice";
import { LoaderSlice } from "../Slices/loader.slice";
import { UserSlice } from "../Slices/user.slice";
import { privateUserSlice } from "../Slices/privateuser.slice";

/**COMBINE ALL REDUCERS */
export const reducers = combineReducers({
  admin: UserSlice.reducer,
  loader: LoaderSlice.reducer,
  common: CommonSlice.reducer,
  privateUser: privateUserSlice.reducer,
});
