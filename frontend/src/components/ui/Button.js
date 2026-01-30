import React from "react";

const Button = ({ 
  children, 
  variant = "primary", 
  onClick, 
  className = "",
  type = "button",
  ...props 
}) => {
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
  };

  return (
    <button
      type={type}
      className={`${variantClasses[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
