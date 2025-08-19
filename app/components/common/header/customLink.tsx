'use client';

import { useRouter, usePathname } from 'next/navigation';
import React from 'react';

interface HeaderLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ href, children, isActive, onClick }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.();

    if (pathname !== href) {
      router.push(href);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={isActive ? 'active' : ''}
    >
      {children}
    </a>
  );
};

export default HeaderLink;
