'use client';

import HeaderLink from "./customLink";
import './header.scss';
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Dashboard",
    route: "/dashboard",
  },
  {
    title: "User Management",
    route: "/user-management",
  },
  {
    title: "History",
    route: "/history",
  },
  {
    title: "Admin Settings",
    route: "/admin-settings",
  },
];

const HeaderMenu = ({
  className = "",
  menuClick,
}: {
  className?: string;
  menuClick?: () => void;
}) => {
  const pathname = usePathname();

  return (
    <ul className={`${className? className : "header_menu"}`}>
      {menuItems.map(({ title, route }) => (
        <li key={route}>
          <HeaderLink
            href={route}
            isActive={pathname === route}
            onClick={menuClick}
          >
            {title}
          </HeaderLink>
        </li>
      ))}
    </ul>
  );
};

export default HeaderMenu;
