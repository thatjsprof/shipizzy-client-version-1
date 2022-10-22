import React from "react";
import Box from "@mui/material/Box";
import PhoneInput from "react-phone-input-2";
import { AsYouType } from "libphonenumber-js";
import "react-phone-input-2/lib/material.css";
import { styled, SxProps } from "@mui/material/styles";

interface Props {
  refs?: any;
  id?: string;
  type: string;
  name: string;
  value: string;
  error: boolean;
  label?: string; 
  ariaLabel?: string;
  disabled?: boolean;
  dataTestId?: string;
  autoFocus?: boolean;
  placeholder?: string;
  customStyles?: SxProps;
  onChange: (field: string, value: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const PhoneInputWrapper = styled(Box)<{ state: { customStyles?: SxProps } }>(
  ({ theme, state }) => ({
    marginBottom: "24px",

    ".input-error": {
      width: "100%",
      border: `1px solid ${theme.palette.error.main} !important`,
    },

    input: {
      minWidth: "100% !important",

      ":focus": {
        border: `1px solid ${theme.palette.primary.main} !important`,
        boxShadow: `0 0 0 1px ${theme.palette.primary.main} !important`,
      },

      ...state.customStyles,
    },
  })
);

const CustomPhoneInput = (props: Props) => {
  return (
    <PhoneInputWrapper state={{ customStyles: props.customStyles }}>
      <PhoneInput
        country={"ng"}
        enableSearch={true}
        onBlur={props.onBlur}
        value={props.value as string}
        inputProps={{ name: props.name }}
        inputClass={props.error ? "input-error" : ""}
        onChange={(phone) =>
          props.onChange(props.name, new AsYouType().input(`+${phone}`))
        }
      />
    </PhoneInputWrapper>
  );
};

export default CustomPhoneInput;
