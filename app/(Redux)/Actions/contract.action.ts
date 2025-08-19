import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import {
  callGetMethod,
  callSendMethod,
  createContractInstances,
} from "@/app/(Services)/contract.service";
import { loader } from "../Slices/loader.slice";
import toaster from "@/app/components/toast";
// import toaster from "@/app/_components/Toast";
// import { getError } from "@/app/(Services)/common.service";

/**CALL CONTRACT'S GET METHODS */
export const callContractGetMethod = (
  method: string,
  data: any[] = [],
  contractType: string,
  loading = true,
  dynamicAddress: string = "",
  showError: boolean = true
) => {
  return async (dispatch: Dispatch<any> = useDispatch()) => {
    if (loading) dispatch(loader(true));

    try {
      /**CALL GET METHOD */
      const result = await callGetMethod(
        method,
        data,
        contractType,
        dynamicAddress
      );
      return result;
    } catch (error: any) {
      // if (showError) toaster.error(error);
      // if (showError) toaster.error(getError(error));
    } finally {
      if (loading) dispatch(loader(false));
    }
  };
};

/**CALL CONTRACT'S SEND METHODS */
export const callContractSendMethod = (
  provider: any,
  method: string,
  data: any[] = [],
  walletAddress: string,
  contractType: string,
  value: string = "",
  dynamicAddress: string = ""
) => {
  return async (dispatch: Dispatch<any> = useDispatch()) => {
    dispatch(loader(true));

    try {
      /**CREATE INSTANCE WITH WALLET */
      const contractInstance: any = await createContractInstances(provider);
      if (!contractInstance) {
        throw new Error(
          "Error creating contract instance. Please reload the page."
        );
      }

      /**CALL SEND METHOD */
      const result = await callSendMethod(
        provider,
        method,
        data,
        walletAddress,
        contractType,
        value,
        dynamicAddress
      );
      dispatch(loader(false));
      return result;
    } catch (error: any) {
      console.log({ error });

      // toaster.error(error);
      // toaster.error(getError(error));
    } finally {
      dispatch(loader(false));
    }
  };
};
