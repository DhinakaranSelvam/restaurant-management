import React from "react";

const Input = ({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  className = "",
  id,
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`input-field ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Input;
