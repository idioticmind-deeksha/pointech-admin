import axios from "axios";

// import { resetUser } from "../(Redux)/Slices/user.slice";
import store from "../(Redux)/store";

import { API_URL } from "../constant/index";
// import { decryptData, encryptData, formatUrl } from "./common.service";
import toaster from "../components/toast/index";

export const storeInstance = store;
axios.defaults.baseURL = API_URL;

/**AXIOS INTERCEPTOR */
axios.interceptors.request.use(
  (config) => {
    const walletAddress: any = storeInstance.getState().user.walletAddress;
    config.headers["userAddress"] = walletAddress;

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    config.headers["Access-Control-Allow-Origin"] = "*";
    return config;
  },
  (error) => {
    return error;
  }
);

/**HANDLE AXIOS RESPONSE */
// axios.interceptors.response.use(
//   async (response) => {
//     response.data = true ? await decryptData(response.data) : response.data;

//     // let refreshedToken: any = response.headers["x-auth-token"];
//     // if (refreshedToken) {
//     // if (API_URL.GET_USER_DATA === response.config.url) {
//     //   response.data.data.token = refreshedToken;
//     // }
//     // storeInstance.dispatch(addAuthToken(refreshedToken));
//     // }
//     return response;
//   },
//   (error) => {
//     if (!error.response) {
//       //   toaster.error("Server not responding. Please try again later.");
//     } else {
//       return manageErrorConnection(error);
//     }
//   }
// );

/**HANDLE AXIOS ERROR */
function manageErrorConnection(err: any) {
  if (
    err?.response &&
    err?.response?.status >= 400 &&
    err?.response?.status <= 500
  ) {
    if (err?.response?.status === 401 || err.response?.data?.status === 401) {
      //   toaster.error(
      //     err?.response?.data?.message ||
      //     "Session has been expired. Please login again."
      //   );
      //   // storeInstance.dispatch(setUpdate(true));
      //   storeInstance.dispatch(resetUser());
      localStorage.clear();

      return Promise.reject(err);
    }

    // let responseMsg = err?.response?.data?.message;

    // let erroMsg: any = Object.keys(err?.response?.data?.message)
    //   .map((field: any) => field)
    //   .join(",");

    // toaster.error(
    //   responseMsg
    //     ? typeof responseMsg !== "string"
    //       ? `Please enter valid ${erroMsg}`
    //       : responseMsg
    //     : "Server not responding. Please try again later."
    // );
    return;
  } else if (err.code === "ECONNREFUSED") {
    // toaster.error("ECONNREFUSED");
    return "nevermind";
  } else {
    // toaster.error(err);
    return Promise.reject(err);
  }
}

/**HANDLE AXIOS SUCCESS */
function handleSuccess(res: any) {
  if (res && res.status === 204) {
    // storeInstance.dispatch(resetUser());
  }
  res?.data?.message && toaster.success(res.data.message);
}

function handleError(res: any) {
  //   res?.response?.data?.message && toaster.error(res?.response?.data?.message);
}

/**METHOD FOR CALL API */
export const apiCallPost = (
  url: string,
  data: any,
  params = {},
  showtoaster = false
) =>
  new Promise((resolve, _reject) => {
    axios
      .post(url, params, data)
      .then((res) => {
        showtoaster && handleSuccess(res);
        resolve(res?.data);
      })
      .catch((error) => {
        showtoaster && handleError(error);
        resolve(error);
      });
  });

/**METHOD FOR SEND API */
export const apiCallGet = (url: string, params = {}, _showtoaster = false) =>
  new Promise((resolve: any, _reject: any) => {
    // let encParams = params
    //   ? { query: isEncrypted ? encryptData(JSON.stringify(params)) : "" }
    //   : { query: "" };

    axios
      .get(url, params)
      .then((res) => {
        resolve(res?.data);
      })
      .catch((error) => {
        resolve(error);
      });
  });

export const apiCallDelete = (url: string, params = {}, _showtoaster = false) =>
  new Promise((resolve) => {
    // let encParams = params
    //   ? { query: isEncrypted && encryptData(JSON.stringify(params)) }
    //   : { query: "" };

    axios
      .delete(url, params)
      .then((res) => {
        resolve(res?.data);
      })
      .catch((_error) => {
        resolve(null);
      });
  });

// export const openNewTab = (url: string, params: any) =>
//   new Promise((_resolve) => {
//     const userDetails: any = storeInstance.getState().user.userDetails;
//     params.auth = userDetails?.token;
//     let encParams = params
//       ? {
//         query: isEncrypted
//           ? encryptData(JSON.stringify(params))
//           : JSON.stringify(params),
//       }
//       : { query: "" };

//     window.open(
//       `${formatUrl(API_HOST + url, isEncrypted ? encParams : params)}`,
//       "_blank"
//     );
//   });

// /** CALL EXPORT CSV*/
// export const openInNewTab = (method: string, parms: any = {}) => {
//   return () =>
//     new Promise(async (resolve, reject) => {
//       Object.keys(parms).forEach((key) =>
//         parms[key] === undefined || parms[key] === null || parms[key] === ""
//           ? delete parms[key]
//           : {}
//       );
//       openNewTab(API_URL[method], parms)
//         .then((result) => {
//           resolve(result);
//         })
//         .catch((err) => {
//           manageErrorConnection(err);
//           reject(err);
//         });
//     });
// };
// //fetch currenty code
// export const getCurrentCountryCode = () => {
//   return fetch("https://get.geojs.io/v1/ip/country.json")
//     .then((response) => response.json())
//     .then((data) => {
//       return data;
//     })
//     .catch((error) => {
//       return error;
//     });
// };
