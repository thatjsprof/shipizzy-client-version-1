import React from "react";
import {
  InputLabel,
  Select,
  FormControl,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";

interface UISelectProps {
  options: { value: string | number; text: string }[];
  style?: object;
  labelID?: string;
  ID?: string;
  label?: string;
  required?: boolean;
  refs?: any;
  size?: "small" | "medium";
  defaultValue?: string;
  emptyValue?: boolean;
  handleChange?: (e: SelectChangeEvent) => void;
}

const UISelect = ({
  labelID,
  label,
  ID,
  options,
  required = false,
  style,
  refs,
  size,
  defaultValue,
  emptyValue = true,
  handleChange,
}: UISelectProps) => {
  return (
    <FormControl sx={{ marginBottom: 2, ...style }} size={size} fullWidth>
      <InputLabel id={ID}>{label}</InputLabel>
      <Select
        labelId={labelID}
        id={ID}
        label={label}
        inputRef={refs}
        defaultValue={defaultValue}
        required={required}
        onChange={handleChange}
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
