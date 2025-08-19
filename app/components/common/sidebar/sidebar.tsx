"use client";
import Logo from "../../../../public/images/logo.svg";
import "./sidebar.scss";
import HeaderMenu from "../header/headerMenu";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar_logo">
        <Image src={Logo} width={170} height={43} quality={100} alt="Logo" />
      </div>
      <HeaderMenu className="sidebar_menu" />
    </div>
  );
}
