"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";

import store from "./app/(Redux)/store";
import Loader from "./app/components/loader/loader";
// import { Web3ModalWrapper } from "./_components/Web3Modal/Web3Modal";

const StoreProvider = ({ children }: { readonly children: ReactNode }) => {
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      {/* <Web3ModalWrapper> */}
      <Loader />
      {children}
      {/* </Web3ModalWrapper> */}

      {/* </PersistGate> */}
    </Provider>
  );
};

export default StoreProvider;
