import "./Button.module.scss";
import { Modify } from "Utils/Helpers";
import React, { PropsWithChildren } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Button, { ButtonProps } from "@mui/material/Button";

type UIButtonProps = PropsWithChildren<{
  styles?: object;
  classes?: string;
  loading?: boolean;
  disabled?: boolean;
  type: "button" | "submit";
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  size?: "small" | "medium" | "large";
  variant?: "text" | "contained" | "outlined";
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}>;

export type CustomButtonProps = Modify<ButtonProps, UIButtonProps>;

const UIButton = ({
  sx,
  type,
  size,
  styles,
  variant,
  classes,
  endIcon,
  children,
  startIcon,
  handleClick,
  disabled = false,
}: CustomButtonProps) => {
  return (
    <Button
      type={type}
      size={size}
      endIcon={endIcon}
      variant={variant}
      disabled={disabled}
      className={classes}
      startIcon={startIcon}
      onClick={handleClick}
      sx={Object.assign(
        {},
        {
          boxShadow: "none",
          borderRadius: "0px",

          "&:hover": {
            boxShadow: "none",
          },
        },
        styles,
        sx
      )}
    >
      {children}
    </Button>
  );
};

export const UILoadingButton = ({
  sx,
  type,
  size,
  styles,
  variant,
  classes,
  endIcon,
  loading,
  children,
  startIcon,
  handleClick,
  disabled = false,
}: CustomButtonProps) => {
  return (
    <LoadingButton
      type={type}
      size={size}
      loading={loading}
      endIcon={endIcon}
      variant={variant}
      disabled={disabled}
      className={classes}
      startIcon={startIcon}
      onClick={handleClick}
      sx={Object.assign(
        {},
        {
          boxShadow: "none",
          borderRadius: "0px",

          "&:hover": {
            boxShadow: "none",
          },
        },
        styles,
        sx
      )}
    >
      {children}
    </LoadingButton>
  );
};

export default UIButton;
