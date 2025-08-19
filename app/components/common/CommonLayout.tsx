"use client";

import { ReactNode } from "react";
import StoreProvider from "@/StoreProvider";
import ContextProvider from "@/app/context";
import NiceModal from "@ebay/nice-modal-react";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

interface CommonLayoutProps {
  children: ReactNode;
  cookies?: any | null;
}

export default function CommonLayout({ children, cookies }: CommonLayoutProps) {
  return (
    <StoreProvider>
      <ContextProvider cookies={cookies}>
        <NiceModal.Provider>
          <Toaster position="top-right" />
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </NiceModal.Provider>
      </ContextProvider>
    </StoreProvider>
  );
}
