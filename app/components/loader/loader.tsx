import { loader } from "@/app/(Redux)/Slices/loader.slice";
import { Fragment, useEffect } from "react";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import "./loader.scss";
export default function Loader() {
  const dispatch: any = useDispatch();
  /**GET STATES FROM STORE */
  const isLoading = useSelector((state: any) => state.loader.isLoading);
  //   const isLoading = true;
  useEffect(() => {
    dispatch(loader(false));
  }, []);
  return (
    <Fragment>
      {isLoading && (
        <section className="loader_handle">
          <div className="loader">
            <Bars
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        </section>
      )}
    </Fragment>
  );
}
