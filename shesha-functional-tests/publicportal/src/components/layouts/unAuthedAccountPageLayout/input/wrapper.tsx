import { FC, Fragment, InputHTMLAttributes, useState } from "react";
import ShaInputRender from "./render";

interface IProps
  extends Pick<InputHTMLAttributes<unknown>, "onChange" | "value"> {
  label?: string;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "password";
}

const ShaInputWrapper: FC<IProps> = ({ label, ...props }) => {
  const [{ error }, setState] = useState({ error: false });

  return (
    <Fragment>
      {label && <label className="sha-input-label">{label}</label>}

      <ShaInputRender
        className={`sha-input ${error ? "sha-input-error" : ""}`}
        setError={(error) => setState((s) => ({ ...s, error }))}
        {...props}
      />
    </Fragment>
  );
};

export default ShaInputWrapper;
