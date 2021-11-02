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
  defaultValue,
  value,
  size,
  styles,
  handleChange,
  ...otherInputProps
}: UIInputProps) => {
  return (
    <FormControl fullWidth sx={{ marginBottom: 2 }}>
      <TextField
        name={name}
        type={type}
        error={error}
        required={required}
        multiline={multiline}
        maxRows={maxRows}
        id={ID}
        label={label}
        inputRef={refs}
        defaultValue={defaultValue}
        value={value}
        size={size}
        onChange={handleChange}
        style={styles}
        {...otherInputProps}
      />
    </FormControl>
  );
};

export default UIInput;