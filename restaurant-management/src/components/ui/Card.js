import React from "react";

const Card = ({ 
  children, 
  variant = "primary", 
  className = "",
  ...props 
}) => {
  const variantClasses = {
    primary: "card-primary",
    hover: "card-hover",
    glass: "card-glass",
  };

  return (
    <div className={`${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
