import { ReactNode } from "react";
import Modal from "react-bootstrap/Modal";
import "./commonModal.scss";

interface CommonModalProps {
  show?: boolean;
  onHide?: () => void;
  heading?: string;
  children?: ReactNode;
  className?: string;
  headerHide?: boolean;
  headingContent?: string;
  backdrop?: boolean;
  keyboard?: boolean;
  noCross?: boolean;
}

export default function CommonModal({
  show,
  onHide,
  heading,
  children,
  className,
  headerHide,
  headingContent,
  backdrop = true,
  keyboard = true,
  noCross = false,
}: CommonModalProps) {
  return (
    <Modal
      centered
      show={show}
      onHide={onHide}
      className={`common_modal ${className}`}
      backdrop={backdrop}
      keyboard={keyboard}
    >
      {headerHide ? (
        ""
      ) : (
        <Modal.Header
          closeButton={!noCross}
          className={heading ? "" : `${headingContent ? "" : "cross-only"}`}
        >
          {heading ? <Modal.Title>{heading}</Modal.Title> : headingContent}
        </Modal.Header>
      )}
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
