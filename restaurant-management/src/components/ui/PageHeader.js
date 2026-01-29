import React from "react";

const PageHeader = ({ title, highlight, description, showDivider = true }) => {
  return (
    <div className="section-header">
      <h2 className="heading-primary">
        {title} {highlight && <span className="text-spice-saffron">{highlight}</span>}
      </h2>
      {description && (
        <p className="text-muted max-w-lg mx-auto">
          {description}
        </p>
      )}
      {showDivider && (
        <div className="flex justify-center">
          <div className="section-divider"></div>
        </div>
      )}
    </div>
  );
};

export default PageHeader;
