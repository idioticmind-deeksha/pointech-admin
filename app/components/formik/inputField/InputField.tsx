"use client";
import { ReactNode, useState } from "react";
import { Form } from 'react-bootstrap';
import { CloseEyeIcon, OpenEyeIcon } from "../../../assets/svgIcons/svgIcon";
import ErrorComponent from '../errorComponent/ErrorComponent';
import '../formControl.scss';
interface InputFieldProps {
    label?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    error?: string |  boolean;
    className?: string;
    value?: string;
    disabled?: boolean;
    righttext?: ReactNode;
    righttextOnclick?: ()=> void;
    bottomTitle?: ReactNode
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
    // onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
const InputField: React.FC<InputFieldProps> = ({ label, name, type, placeholder, error, className, value, bottomTitle, righttext,
    righttextOnclick, disabled = false, onChange, onBlur }) => {
    const [active, setActive] = useState(true);
    const handleTogglePassword = () => {
        setActive(!active);
    };
    const inputType = type === 'password' ? (active ? 'password' : 'text') : type || 'text';

    // const restrictHTMLTags = (e: React.KeyboardEvent)  => {
    //     const regex = FORMIK_REGEX.RESTRICT_HTML_TAGS
    //     !regex.test(e.key) && e.preventDefault();
    // }

    // const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //         restrictHTMLTags(e);     
    //         onKeyDown && onKeyDown(e);
    // }   
      
    return (
        <div className={`input_group ${className} ${type === "password" ? "passfield" : ""}`}>
            {label && <Form.Label htmlFor={name}>{label}</Form.Label>}
            <div className={`input_group_inner ${righttext ? "rightpadding" : ""}`}>
                <Form.Control
                    type={inputType}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    isInvalid={!!error}
                    disabled={disabled}
                    // onKeyDown={handleOnKeyDown}
                />
                {type === "password" ?
                    <button
                        type="button"
                        className="input_group_passbtn"
                        onClick={handleTogglePassword}
                    >
                        {active ? <CloseEyeIcon /> : <OpenEyeIcon />}
                    </button>
                    : ""
                }
                {righttext && (
                    <div className="input_group_inner_righttext" onClick={righttextOnclick}>{righttext}</div>
                )}
            </div>
            <ErrorComponent error={error} />
            {bottomTitle &&
                <div className="input_group_btm_title">
                    {bottomTitle}
                </div>}
        </div>
    );
};
export default InputField;
