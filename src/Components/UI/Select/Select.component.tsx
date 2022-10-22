import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectProps,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

export interface IPayloadType {
  text: string;
  value: string | number;
}

interface UISelectProps extends SelectProps {
  refs?: any;
  ID?: string;
  style?: object;
  label?: string;
  value?: string;
  error?: boolean;
  labelID?: string;
  required?: boolean;
  emptyValue?: boolean;
  defaultValue?: string;
  options: IPayloadType[];
  size?: SelectProps["size"];
  endAdornment?: React.ReactNode;
  variant?: SelectProps["variant"];
  startAdornment?: React.ReactNode;
  handleChange?: (e: SelectChangeEvent) => void;
}

const UISelect = ({
  ID,
  refs,
  size,
  value,
  error,
  label,
  style,
  labelID,
  options,
  variant,
  defaultValue,
  handleChange,
  required = false,
  emptyValue = true,
  endAdornment = null,
  startAdornment = null,
  ...otherProps
}: UISelectProps) => {
  return (
    <FormControl sx={{ marginBottom: 3, ...style }} size={size} fullWidth>
      <InputLabel id={ID} error={error}>
        {label}
      </InputLabel>
      <Select
        id={ID}
        error={error}
        label={label}
        value={value}
        inputRef={refs}
        labelId={labelID}
        variant={variant}
        required={required}
        onChange={handleChange}
        endAdornment={endAdornment}
        defaultValue={defaultValue}
        startAdornment={startAdornment}
        {...otherProps}
      >
        {emptyValue ? <MenuItem value="">None Selected</MenuItem> : []}
        {options.map(({ value, text }, index) => (
          <MenuItem key={index} value={value}>
            {text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default UISelect;
