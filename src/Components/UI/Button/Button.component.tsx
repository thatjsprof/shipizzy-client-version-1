import React, { PropsWithChildren } from "react";
import Button from "@mui/material/Button";
import "./Button.module.scss";

type UIButtonProps = PropsWithChildren<{
  type: "button" | "submit";
  variant?: "text" | "contained" | "outlined";
  size?: "small" | "medium" | "large";
  classes?: string;
  styles?: object;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}>;

const UIButton = ({
  type,
  variant,
  size,
  classes,
  styles,
  disabled = false,
  startIcon,
  endIcon,
  handleClick,
  children,
}: UIButtonProps) => {
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      className={classes}
      style={Object.assign({}, styles, { boxShadow: "none" })}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default UIButton;
