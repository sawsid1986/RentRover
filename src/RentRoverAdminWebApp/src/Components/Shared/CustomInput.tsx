import React, {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from "react";

export interface CustomInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  update: (key: string, value: string) => void;
  validate?: (value: string) => string | null;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, update, validate, ...rest }, ref) => {
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      update(rest.id || label, newValue);

      if (validate) {
        setError(validate(newValue));
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (validate) {
        const newValue = e.target.value;
        setError(validate(newValue));
      }
    };

    return (
      <>
        <label htmlFor={rest.id || rest.name} className="form-label">
          {label}
        </label>
        <input
          ref={ref}
          className={error ? "form-control is-invalid" : "form-control"}
          onChange={handleChange}
          onFocus={handleFocus}
          {...rest}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </>
    );
  }
);
export default CustomInput;
