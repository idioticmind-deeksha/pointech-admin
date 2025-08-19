"use client";

import { useAppKitAccount } from "@reown/appkit/react";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { callContractGetMethod } from "../(Redux)/Actions/contract.action";
import Logo from "../../public/images/logo.svg";
import AuthCard from "../components/common/authCard/authCard";
import toaster from "../components/toast";
import CommonButton from "../components/ui/commonButton/CommonButton";
import ConnectButton from "../components/walletConnect";
import { CONTRACT_METHODS, CONTRACT_TYPE } from "../constant";
import "./page.scss";

interface LoginFormValues {
  walletaddress: string;
}

export default function Home() {
  const { address }: any = useAppKitAccount();
  const dispatch = useDispatch();
  const router = useRouter();

  const initialValues: LoginFormValues = {
    walletaddress: "",
  };

  const onSubmit = () => {
    checkOwner();
  };

  /**
   * check this is owner
   */
  const checkOwner = async () => {
    try {
      const ponitechVal = await dispatch(
        callContractGetMethod(
          CONTRACT_METHODS.OWNER,
          [],
          CONTRACT_TYPE.ICO,
          true,
          "",
          true
        ) as any
      );

      if (ponitechVal !== address) {
        toaster.error("Invalid login credentials");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      toaster.error("Error checking owner");
    }
  };

  const formik = useFormik<LoginFormValues>({
    initialValues,
    onSubmit,
  });

  /* useEffect(() => {
    dispatch(setWalletAddress(address));
    formik.setFieldValue("walletaddress", address);
  }, [address]); */

  return (
    <section className="login_page">
      <div className="login_page_logo">
        <Image src={Logo} width={170} height={43} quality={100} alt="Logo" />
      </div>
      <AuthCard title="Login to Ponitech">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          {/* <FormControl
            name="walletaddress"
            placeholder="Enter your wallet address"
            value={formik.values.walletaddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.walletaddress && formik.errors.walletaddress}
            label="Wallet Address"
            disabled={true}
          /> */}
          {/* <CommonButton title="Connect Wallet" fluid className="mb-4" /> */}
          <ConnectButton />
          <CommonButton title="Login" type="submit" fluid />
        </form>
      </AuthCard>
    </section>
  );
}
