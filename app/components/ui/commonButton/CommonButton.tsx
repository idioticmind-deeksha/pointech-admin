import Image from "next/image";
import Link from "next/link";
import { ReactNode, Ref } from "react";
import { Spinner } from "react-bootstrap";
import "./CommonButton.scss";
export default function CommonButton({ title,
  className,
  svgIcon,
  imageIcon,
  onClick,
  to,
  role,
  type,
  disabled,
  isLoading,
  fluid,
  text,
  children,
  ref,
  target
}
  : {
    title?: string;
    className?: string;
    svgIcon?: ReactNode;
    imageIcon?: string;
    onClick?: () => void;
    to?: string | URL;
    id?: string;
    role?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    isLoading?: boolean;
    fluid?: boolean;
    text?: string;
    children?: ReactNode;
    ref?: Ref<HTMLButtonElement | HTMLAnchorElement>;
    target?: string;
  }) {
  return (
    <>
      {(() => {
        switch (role) {
          case "link":
            return (
              <Link
                href={to ?? '#'}
                className={`common_btn ${fluid ? "full" : ""} ${className}`}
                ref={ref as Ref<HTMLAnchorElement> | undefined}
                onClick={onClick}
                target={target}
              >
                {svgIcon && (
                  <>
                    <span className="common_btn_icon">{svgIcon}</span>
                  </>
                )}
                {imageIcon && (
                  <>
                    <span className="common_btn_icon"><Image fetchPriority="high" src={imageIcon} alt="" quality={100} /></span>
                  </>
                )}
                {title && <>{title}</>}
                {isLoading ? <Spinner /> : text}
                {children}
              </Link>
            );
          default:
            return (
              <button
                className={`common_btn ${fluid ? "full" : ""} ${className}`}
                onClick={onClick}
                disabled={disabled}
                type={type ? type : "button"}
                ref={ref as Ref<HTMLButtonElement> | undefined}
              >
                {svgIcon && (
                  <>
                    <span className="common_btn_icon">{svgIcon}</span>
                  </>
                )}
                {imageIcon && (
                  <>
                    <span className="common_btn_icon"><Image fetchPriority="high" src={imageIcon} alt="" quality={100} /></span>
                  </>
                )}
                {title && <>{title}</>}
                {isLoading ? <Spinner /> : text}
                {children}
              </button>
            );
        }
      })()}
    </>
  );
}
