import "./Button.module.scss";
import Button from "@mui/material/Button";
import React, { PropsWithChildren } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

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

const UIButton = ({
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
}: UIButtonProps) => {
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
        styles
      )}
    >
      {children}
    </Button>
  );
};

export const UILoadingButton = ({
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
}: UIButtonProps) => {
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
        styles
      )}
    >
      {children}
    </LoadingButton>
  );
};

export default UIButton;
