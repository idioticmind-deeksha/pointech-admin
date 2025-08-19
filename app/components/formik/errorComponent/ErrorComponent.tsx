"use client";
import '../formControl.scss';

interface ErrorComponentProps {
  error?: string | boolean;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
  return error ? <div className="error_text">{error}</div> : null;
};

export default ErrorComponent;
