import React from "react";

const Textarea = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  className = "",
  rows = 4,
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && <label className="input-label">{label}</label>}
      <textarea
        className={`textarea-field ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        {...props}
      />
    </div>
  );
};

export default Textarea;
