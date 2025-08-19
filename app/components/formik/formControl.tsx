// "use client";
// import CheckboxField from "./checkboxField/checkboxField";
// import FileUploadField from "./fileUploadFiled/FileUploadField";
import InputField from "./inputField/InputField";
// import RadioField from "./radioField/RadioField";
// import TextareaField from "./textareaField/textareaField";
// import PhoneInputField from "./phone/PhoneInputField";
import './formControl.scss';
import CheckboxField from "./checkboxField/checkboxField";
// import SelectField from "./selectField/selectField";
// import DatePickerr from "./datepickerr/datePickerr";

interface FormControlProps {
  control?: string;
  error?: string | boolean;
  [key: string]: unknown;
}

export default function FormControl ({ control, error, ...props } :FormControlProps) {
  switch (control) {
    // case 'phone':
    //   return <PhoneInputField {...props} error={error} />;
    // case 'textarea':
    //   return <TextareaField {...props} error={error} />;
    case 'checkbox':
      return <CheckboxField {...props} error={error} />;
    // case 'radio':
    //   return <RadioField {...props} error={error} />;
    // case 'select':
    //   return <SelectField {...props} error={error} />;
    // case 'file':
    //   return <FileUploadField {...props} error={error} />;
    //   case "date":
    //   return <DatePickerr {...props}  error={error}/>;
    default:
      return <InputField {...props} error={error} />;
  }
};

