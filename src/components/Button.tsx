import React, { PropsWithChildren } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "navy";
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  variant = "primary",
  disabled,
  children,
  className = "",
  ...props
}) => {
  const classes = [
    styles.button,
    variant === "primary" ? styles["button--primary"] : "",
    variant === "navy" ? styles["button--navy"] : "",
    disabled ? styles["button--disabled"] : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;