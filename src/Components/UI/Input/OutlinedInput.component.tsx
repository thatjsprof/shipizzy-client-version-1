import React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

interface UIOutlinedInputProps {
  refs?: any;
  type: string;
  name?: string;
  label?: string;
  value?: string;
  error?: boolean;
  styles?: object;
  required?: boolean;
  defaultValue?: string;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  handleChange?: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  variant?: "outlined" | "filled" | "standard";
}

const UIOutlinedInput = ({
  type,
  name,
  refs,
  label,
  value,
  error,
  styles,
  required,
  defaultValue,
  handleChange,
  endAdornment = null,
  variant = "standard",
  startAdornment = null,
  ...otherInputProps
}: UIOutlinedInputProps) => {
  return (
    <FormControl fullWidth sx={{ marginBottom: 3 }} variant={variant}>
      <InputLabel htmlFor="outlined-adornment" error={error}>
        {label}
      </InputLabel>
      <OutlinedInput
        type={type}
        name={name}
        value={value}
        error={error}
        label={label}
        style={styles}
        inputRef={refs}
        required={required}
        {...otherInputProps}
        onChange={handleChange}
        id="outlined-adornment"
        defaultValue={defaultValue}
        endAdornment={endAdornment}
        startAdornment={startAdornment}
      />
    </FormControl>
  );
};

export default UIOutlinedInput;
