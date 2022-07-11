import React from "react";
import { Modify } from "Utils/Helpers";
import FormControl from "@mui/material/FormControl";
import TextField, { TextFieldProps } from "@mui/material/TextField";

interface UIInputProps {
  refs?: any;
  ID?: string;
  onBlur?: any;
  type: string;
  name?: string;
  label?: string;
  value?: string;
  error?: boolean;
  styles?: object;
  maxRows?: number;
  required?: boolean;
  multiline?: boolean;
  defaultValue?: string;
  size?: "small" | "medium";
  handleChange?: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
}

export type CustomTextFieldProps = Modify<UIInputProps, TextFieldProps>;

const UIInput = ({
  ID,
  name,
  type,
  refs,
  size,
  label,
  value,
  onBlur,
  styles,
  maxRows = 0,
  defaultValue,
  handleChange,
  error = false,
  required = false,
  multiline = false,
  ...otherInputProps
}: CustomTextFieldProps) => {
  return (
    <FormControl fullWidth>
      <TextField
        id={ID}
        name={name}
        size={size}
        type={type}
        error={error}
        label={label}
        value={value}
        style={styles}
        rows={maxRows}
        inputRef={refs}
        onBlur={onBlur}
        required={required}
        {...otherInputProps}
        multiline={multiline}
        onChange={handleChange}
        sx={{ marginBottom: 3 }}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};

export default UIInput;
