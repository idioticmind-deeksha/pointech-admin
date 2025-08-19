import { ChangeEvent, ReactNode } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import CommonButton from "../../ui/commonButton/CommonButton";
import CommonModal from "../commonModal";
import "./alertModal.scss";

interface AlertModalProps {
  closeAlertModal: () => void;
  icon: ReactNode;
  onClick: () => void;
  onClickClose: () => void;
  heading: string;
  subheading: string;
  btntitle: string;
  secbtntitle: string;
  textarea?: string;
  className?: string;
  showTextarea?: boolean;
  inputField?: string;
  onInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default NiceModal.create((props: AlertModalProps) => {
  const modal = useModal();

  return (
    <CommonModal
      className={`alertmodal ${props.className ?? ""}`}
      show={modal.visible}
      onHide={() => {
        props.closeAlertModal();
        modal.hide();
      }}
    >
      {props.icon}
      {props.heading && <h5>{props.heading}</h5>}
      {props.subheading && <p>{props.subheading}</p>}
      {props.showTextarea && props.textarea && (
        <textarea rows={3} placeholder={props.textarea} />
      )}
      {props.inputField && (
        <input
          type="text"
          placeholder="Rejected Reason"
          onChange={props.onInputChange}
        />
      )}
      <div className="wrap_btn">
      {props.btntitle && (
        <CommonButton
          title={props.btntitle}
          type="button"
          onClick={props.onClick}
          fluid
        
        />
      )}
         {props.secbtntitle && (
        <CommonButton
          title={props.secbtntitle}
          type="button"
          onClick={props.onClickClose}
          fluid
          className="btn_blue"
        />
      )}
        </div>
      
    </CommonModal>
  );
});
