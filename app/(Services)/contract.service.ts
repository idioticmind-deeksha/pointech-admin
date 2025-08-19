import Web3 from "web3";
// // import { convertWithDecimal } from "";
import { CONTRACT_ADDRESS, CONTRACT_TYPE, NETWORK } from "../constant/index";
import DynamicABI from "../Abi/dynamicAbi";
import ICO from "../Abi/ICO";
import Ponitech from "../Abi/Ponitech";
import USDTABI from "../Abi/USDTABI";
import { convertWithDecimal } from "./common.service";
// import MASTER_ABI from "../Abi/masterAbi";
// import AUTHORITY_MANAGER_ABI from "../Abi/authorityManagerAbi";
// import USER_MANAGER_ABI from "../Abi/userManagerAbi";

let web3Instance: Web3;
let masterInsance: any;
let icoInstance: any;
let ponitechInstance: any;
let usdtInstance: any;

const initializeWeb3 = (provider: string | any = NETWORK.RPC) => {
  if (!web3Instance || web3Instance.currentProvider !== provider) {
    web3Instance = new Web3(provider);
  }
  return web3Instance;
};

export const createContractInstances = async (
  provider: string | any = NETWORK.RPC
) => {
  const web3 = initializeWeb3(provider);
  icoInstance = new web3.eth.Contract(
    ICO,
    CONTRACT_ADDRESS.ICO_CONTRACT_ADDRESS
  );
  ponitechInstance = new web3.eth.Contract(
    Ponitech,
    CONTRACT_ADDRESS.PONITECH_CONTRACT_ADDRESS
  );
  usdtInstance = new web3.eth.Contract(
    USDTABI,
    CONTRACT_ADDRESS.USDT_CONTRACT_ADDRESS
  );

  return true;
};

createContractInstances();

export const getContractInstance = async (
  provider: string | any = NETWORK.RPC,
  contractType: string,
  dynamicAddress: string
) => {
  await createContractInstances(provider);

  switch (contractType) {
    case CONTRACT_TYPE.ICO:
      return icoInstance;
    case CONTRACT_TYPE.PONITECH:
      return ponitechInstance;
    case CONTRACT_TYPE.USDT:
      return usdtInstance;
    case CONTRACT_TYPE.DYNAMIC:
      return new web3Instance.eth.Contract(DynamicABI, dynamicAddress);
    default:
      throw new Error("Invalid contract type");
  }
};

/**CALL CONTRACT GET METHODS. ALL PARAMS WILL BE DYNAMIC */
export const callGetMethod = (
  method: string,
  data: any,
  contractType: string,
  dynamicAddress: string
) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      /**GET SELECTED CONTRACT INSTANCE */
      const contract: any = await getContractInstance(
        NETWORK.RPC,
        contractType,
        dynamicAddress
      );

      if (contract?.methods) {
        /**CALL GET METHOD */
        contract.methods[method]
          .apply(null, Array.prototype.slice.call(data))
          .call()
          .then((result: object) => {
            resolve(result);
          })
          .catch((error: Error) => {
            reject(error);
          });
      } else {
        reject(new Error("Contract not found."));
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**CALL CONTRACT SEND METHODS. ALL PARAMS WILL BE DYNAMIC */
export const callSendMethod = (
  provider: any,
  method: string,
  data: any,
  walletAddress: string,
  contractType: string,
  value: any,
  dynamicAddress: string
) => {
  // eslint-disable-next-line no-async-promise-executor

  // return;
  return new Promise(async (resolve, reject) => {
    try {
      /**CHECK WALLET IS CONNECTED */
      if (walletAddress === "") {
        reject(new Error("Please connect wallet"));
      }

      /**CREATE DATA FOR CALL SEND METHOD */
      const dataForSend: any = { from: walletAddress };

      /**CHECK IF WE NEED TO SEND VALUE IN SEND METHOD */
      if (value > 0) {
        dataForSend.value = value;
      }
      /**GET SELECTED CONTRACT INSTANCE */
      const contract: any = await getContractInstance(
        provider,
        contractType,
        dynamicAddress
      );

      if (method === "buyTokens" && data[0] === 2) {
        // for usdt
        const allowanceRes = await giveTokenAllowance({
          provider,
          walletAddress,
          contract: dynamicAddress,
          tokenAddress: CONTRACT_ADDRESS.USDT_CONTRACT_ADDRESS,
          method: method,
          amount: data[0],
        });

        if (!allowanceRes) {
          return false;
        }
      }
      // return;
      /**CHECK IF WE NEED TO GIVE APPROVAL TO CONTRACT FOR TOKEN */

      if (contract.methods) {
        /**ESTIMATE GAS FOR TRANSACTION */
        const gasLimit: any = await contract.methods[method]
          .apply(null, Array.prototype.slice.call(data))
          .estimateGas(dataForSend);

        dataForSend.gasPrice = await web3Instance.eth.getGasPrice();
        dataForSend.gasLimit = parseInt(gasLimit) * 2;
        /**CALL SEND METHOD */
        contract.methods[method]
          .apply(null, Array.prototype.slice.call(data))
          .send(dataForSend)
          .then((result: object) => {
            resolve(result);
          })
          .catch((error: Error) => {
            reject(error);
          });
      } else {
        reject(new Error("Contract not found."));
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**FUNCTION FOR GIVE ALLOWANCE TO CONTRACT FOR TOKEN SPEND */
const giveTokenAllowance = (data: any) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      /**GET SELECTED CONTRACT INSTANCE */
      let allowance: any = await callGetMethod(
        "allowance",
        [data.walletAddress, data.contract],
        CONTRACT_TYPE.USDT,
        data.tokenAddress
      );

      /**CHECK ALLOWANCE IS ALREADY GIVEN OR NOT */
      if (parseInt(allowance) < parseInt(data?.amount)) {
        /**SET ALLOWANCE VALUE AS 10**40 */
        const maxlimit: any = convertWithDecimal(10, 40);
        // const maxlimit: any = 10 ** 40;

        await getContractInstance(
          data.provider,
          CONTRACT_TYPE.USDT,
          data.tokenAddress
        );

        /**CALL SEND METHOD */
        const allowanceRes: any = await callSendMethod(
          data.provider,
          "approve",
          [data.contract, maxlimit],
          data.walletAddress,
          CONTRACT_TYPE.USDT,
          null,
          data.tokenAddress
        );

        if (!allowanceRes.status) {
          return false;
        }
        // return;
      }
      // return;
      allowance = await callGetMethod(
        "allowance",
        [data.walletAddress, data.contract],
        CONTRACT_TYPE.USDT,
        data.tokenAddress
      );

      resolve(allowance);
    } catch (error) {
      reject(error);
    }
  });
};

export const getETHBalance = async (userAddress: any) => {
  const balance = await web3Instance.eth.getBalance(userAddress);

  return balance;
};
