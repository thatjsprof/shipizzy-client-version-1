import React from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

interface UIInputProps {
  type: string;
  required?: boolean;
  name?: string;
  refs?: any;
  error?: boolean;
  ID?: string;
  label?: string;
  onBlur?: any;
  defaultValue?: string;
  multiline?: boolean;
  maxRows?: number;
  value?: string;
  styles?: object;
  size?: "small" | "medium";
  handleChange?: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
}

const UIInput = ({
  name,
  type,
  error = false,
  required = false,
  multiline = false,
  maxRows = 0,
  ID,
  label,
  refs,
  onBlur,
  defaultValue,
  value,
  size,
  styles,
  handleChange,
  ...otherInputProps
}: UIInputProps) => {
  return (
    <FormControl fullWidth>
      <TextField
        name={name}
        type={type}
        error={error}
        required={required}
        multiline={multiline}
        rows={maxRows}
        id={ID}
        label={label}
        inputRef={refs}
        onBlur={onBlur}
        defaultValue={defaultValue}
        value={value}
        size={size}
        onChange={handleChange}
        style={styles}
        sx={{ marginBottom: 3 }}
        {...otherInputProps}
      />
    </FormControl>
  );
};

export default UIInput;
