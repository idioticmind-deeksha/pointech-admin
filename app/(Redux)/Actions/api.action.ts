import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import {
  apiCallDelete,
  apiCallGet,
  apiCallPost,
} from "../../(Services)/axios.service";
import { loader } from "../Slices/loader.slice";
import { API_URL } from "@/app/constant";

/**CALL API'S GET METHODS */
// export const callApiGetMethod = (
//   method: string,
//   parms: any = {},
//   loading = true,
//   showtoaster: boolean = true,
//   isPathParam: boolean = false
// ) => {
//   return (dispatch: Dispatch<any> = useDispatch(), _getState: any) =>
//     new Promise(async (resolve, reject) => {
//       const apiUrl: any = formatPathParams(API_URL[method], parms, isPathParam)
//       // return
//       /**SHOW LOADER */
//       if (loading) dispatch(loader(true));
//       /**CALL METHOD */
//       apiCallGet(isPathParam ? apiUrl : API_URL[method],isPathParam ?{}: parms, showtoaster)
//         .then((result) => {
//           if (loading) dispatch(loader(false));
//           resolve(result);
//         })
//         .catch((err) => {
//           if (loading) dispatch(loader(false));
//           reject(err);
//         });
//     });
// };

export const callApiGetMethod = (
  method: any,
  parms: any = {},
  loading = true,
  showtoaster: boolean = true,
  isPathParam: boolean = false,
  pathParamsName: any = {}
) => {
  return (dispatch: Dispatch<any> = useDispatch(), _getState: any) =>
    new Promise(async (resolve, reject) => {
      const apiUrl: any = formatPathParams(
        API_URL[method],
        parms,
        isPathParam,
        pathParamsName
      ); // send pathParamsName as object If you have both query and path params
      // return
      /**SHOW LOADER */
      if (loading) dispatch(loader(true));
      /**CALL METHOD */
      apiCallGet(
        isPathParam ? apiUrl : API_URL[method],
        isPathParam ? {} : parms,
        showtoaster
      )
        .then((result: any) => {
          if (loading) dispatch(loader(false));
          resolve(result);
        })
        .catch((err: any) => {
          if (loading) dispatch(loader(false));
          reject(err);
        });
    });
};

/**CALL API'S SEND METHOD */
export const callApiPostMethod = (
  method: any,
  data: any = {},
  parms: any = {},
  showtoaster: boolean = true,
  loading: boolean = true
) => {
  return (dispatch: Dispatch<any> = useDispatch(), _getState: any) =>
    new Promise(async (resolve, reject) => {
      /**SHOW LOADER */
      if (loading) dispatch(loader(true));

      /**CALL METHOD */
      apiCallPost(API_URL[method], data, parms, showtoaster)
        .then((result: any) => {
          if (loading) dispatch(loader(false));
          resolve(result);
        })
        .catch((err: any) => {
          if (loading) dispatch(loader(false));
          reject(err);
        });
    });
};

/**CALL API'S GET METHODS */
export const callApiDeleteMethod = (
  method: any,
  parms: any = {},
  loading = true,
  showtoaster: boolean = true
) => {
  return (dispatch: Dispatch<any> = useDispatch(), _getState: any) =>
    new Promise(async (resolve, reject) => {
      /**SHOW LOADER */
      if (loading) dispatch(loader(true));
      /**CALL METHOD */
      apiCallDelete(API_URL[method], parms, showtoaster)
        .then((result: any) => {
          if (loading) dispatch(loader(false));
          resolve(result);
        })
        .catch((err: any) => {
          if (loading) dispatch(loader(false));
          reject(err);
        });
    });
};

//  const  formatPathParams =(apiUrl :string , params :any, isPathParam :boolean)=>{
//    /** Construct the URL */
//    if (isPathParam) {
//      // Interpolate parms as path parameters (e.g., `/users/:userId`)
//      const key :any = Object.keys(params);
//      //  return apiUrl+"/"+params[key]
//      return apiUrl.replace(key ,params[key])
//    }
//  }

const formatPathParams = (
  apiUrl: string,
  params: any,
  isPathParam: boolean,
  pathParamsName: any
) => {
  /** Construct the URL */
  if (isPathParam && Object.keys(pathParamsName).length <= 0) {
    // Interpolate params as path parameters (e.g., `/users/:userId`)
    Object.keys(params).forEach((key) => {
      apiUrl = apiUrl.replace(`:${key}`, params[key]);
    });
    return apiUrl;
  } else if (Object.keys(pathParamsName).length > 0 && isPathParam) {
    Object.keys(pathParamsName).forEach((key) => {
      apiUrl = apiUrl.replace(`:${key}`, pathParamsName[key]);
    });

    const queryString = Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&");

    // Append query params to the URL
    apiUrl += apiUrl.includes("?") ? `&${queryString}` : `?${queryString}`;
  }

  return apiUrl; // Return the original URL if `isPathParam` is false
};
