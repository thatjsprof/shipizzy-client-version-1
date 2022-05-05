import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

interface UIOutlinedInputProps {
  type: string;
  required?: boolean;
  name?: string;
  refs?: any;
  error?: boolean;
  label?: string;
  defaultValue?: string;
  value?: string;
  styles?: object;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  variant?: "outlined" | "filled" | "standard";
  handleChange?: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
}

const UIOutlinedInput = ({
  label,
  type,
  name,
  value,
  defaultValue,
  error,
  refs,
  styles,
  required,
  handleChange,
  startAdornment = null,
  endAdornment = null,
  variant = "standard",
  ...otherInputProps
}: UIOutlinedInputProps) => {
  return (
    <FormControl fullWidth sx={{ marginBottom: 3 }} variant={variant}>
      <InputLabel htmlFor="outlined-adornment" error={error}>
        {label}
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment"
        type={type}
        name={name}
        value={value}
        defaultValue={defaultValue}
        error={error}
        inputRef={refs}
        style={styles}
        required={required}
        onChange={handleChange}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        label={label}
        {...otherInputProps}
      />
    </FormControl>
  );
};

export default UIOutlinedInput;
