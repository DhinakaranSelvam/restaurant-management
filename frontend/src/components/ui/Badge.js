import React from "react";

const Badge = ({ 
  children, 
  variant = "primary", 
  className = "",
  ...props 
}) => {
  const variantClasses = {
    primary: "badge-primary",
    price: "badge-price",
    priceWhite: "badge-price-white",
  };

  return (
    <span className={`${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;
