import React from "react";
import { Modify } from "Utils/Helpers";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";

interface UIOutlinedInputProps {
  refs?: any;
  error?: boolean;
  styles?: object;
  errorMessage?: string;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  variant?: "outlined" | "filled" | "standard";
}

export type CustomTextFieldProps = Modify<
  UIOutlinedInputProps,
  OutlinedInputProps
>;

const UIOutlinedInput = React.forwardRef(
  (
    {
      type,
      name,
      refs,
      label,
      value,
      error,
      styles,
      required,
      onChange,
      defaultValue,
      errorMessage,
      endAdornment = null,
      variant = "standard",
      startAdornment = null,
      ...otherInputProps
    }: CustomTextFieldProps,
    ref
  ) => {
    return (
      <>
        <FormControl fullWidth sx={{ marginBottom: 3 }} variant={variant}>
          <InputLabel htmlFor="outlined-adornment" error={error}>
            {label}
          </InputLabel>
          <OutlinedInput
            ref={ref}
            type={type}
            name={name}
            value={value}
            error={error}
            label={label}
            style={styles}
            inputRef={refs}
            onChange={onChange}
            required={required}
            {...otherInputProps}
            id="outlined-adornment"
            defaultValue={defaultValue}
            endAdornment={endAdornment}
            startAdornment={startAdornment}
          />
        </FormControl>
        {/* {error && <span className="v-error">{errorMessage}</span>} */}
      </>
    );
  }
);

export default UIOutlinedInput;
