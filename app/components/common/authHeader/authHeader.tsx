"use client";
import Image from "next/image";
import { Col, Container,Row } from "react-bootstrap";
import Logo from "../../../../public/images/logo.svg";
import "../header/header.scss";
import HeaderLink from "../header/customLink";
import CommonButton from "../../ui/commonButton/CommonButton";
export default function AuthHeader({ logoClick }: { logoClick?: () => void }) {
  
  return (
    <header className={"header"}>
      <Container>
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
            </div>
          </Col>
          <Col xs={7} lg={9} className="header_mid_outer ps-0">
            <div className="header_right">
              <CommonButton title="Connect Wallet" />
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}
