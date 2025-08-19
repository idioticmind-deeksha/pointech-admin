"use client";
import { useDisconnect } from "@reown/appkit/react";

import { CopyIcon, LogoutIcon } from "@/app/assets/svgIcons/svgIcon";
import { useModal } from "@ebay/nice-modal-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Col, Dropdown, Offcanvas, Row } from "react-bootstrap";
import Logo from "../../../../public/images/logo.svg";
import CommonButton from "../../ui/commonButton/CommonButton";
import HeaderLink from "./customLink";
import "./header.scss";
import HeaderMenu from "./headerMenu";

import { useDispatch } from "react-redux";
import { setWalletAddress } from "@/app/(Redux)/Slices/user.slice";
export default function Header({ logoClick }: { logoClick?: () => void }) {
  const { disconnect } = useDisconnect();
  const dispatch = useDispatch();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState(true);
  const AlertModal = useModal("AlertModal");
  const closeAlertModal = useCallback(() => {
    AlertModal.remove();
  }, [AlertModal]);

  const handleResize = () => {
    if (window.innerWidth < 1280) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onLogout = async () => {
    try {
      await disconnect();
      dispatch(setWalletAddress(undefined));
      router.push("/");
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <header className={"header innerheader"}>
      <Row className="header_row">
        <Col xs={5} lg={3}>
          <div data-animate className="header_left">
            <HeaderLink href="/#home" onClick={logoClick}>
              <Image
                src={Logo}
                width={144}
                height={30}
                quality={100}
                alt="Logo"
              />
            </HeaderLink>
            <h4 className="header_heading">Dashboard</h4>
          </div>
        </Col>
        <Col xs={7} lg={9} className="header_mid_outer ps-0">
          {/* <div className="header_mid"> */}
          <div className="header_right">
            {menu ? (
              <></>
            ) : (
              <Offcanvas
                show={show}
                onHide={() => {
                  setShow(false);
                }}
                placement="end"
                className="header_canvas"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>
                    <Image
                      src={Logo}
                      width={201}
                      height={51}
                      quality={100}
                      alt="Logo"
                    />
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <HeaderMenu
                    className="header_menu_canvas header_menu"
                    menuClick={() => {
                      setShow(!show);
                    }}
                  />
                </Offcanvas.Body>
              </Offcanvas>
            )}
            {true ? (
              <CommonButton
                title="Logout"
                onClick={() => {
                  closeAlertModal();
                  AlertModal.show({
                    closeAlertModal,
                    heading: "Are you sure you want to log out?",
                    subheading: "You will be logged out of your account.",
                    btntitle: "Confirm Logout",
                    onClick: () => {
                      closeAlertModal(); // Close modal
                      onLogout();
                      // router.push("/"); // Redirect to homepage
                    },
                  });
                }}
              />
            ) : (
              <Dropdown className="wallet-drop">
                <Dropdown.Toggle
                  id="wallet-drop"
                  className="common_btn btn-secondry"
                >
                  5x764345....7645
                </Dropdown.Toggle>
                <Dropdown.Menu align={"end"}>
                  <Dropdown.Item as={"button"}>
                    5x764345....7645 <CopyIcon />
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2" as={"button"}>
                    Disconnect Wallet <LogoutIcon />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
            {menu ? (
              ""
            ) : (
              <div
                className="header_right_toggler"
                onClick={() => {
                  setShow(true);
                }}
              >
                <button
                  type="button"
                  className="header_right_toggler_btn"
                ></button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </header>
  );
}
