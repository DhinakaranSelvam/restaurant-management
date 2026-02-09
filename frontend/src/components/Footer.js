import React from "react";

const Footer = () => {
  return (
    <footer className="bg-spice-forest py-6 px-8 text-white mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        <div className="space-y-1 text-center">
          <h3 className="text-xl font-display font-black tracking-tighter">
            South <span className="text-spice-saffron">Spice</span>
          </h3>
          <p className="text-emerald-100/50 text-xs font-medium max-w-[200px]">
            The most authentic South Indian culinary experience in the heart of the city.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-4 flex justify-center">
        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100/20 mt-4">
          © 2026 South Spice Restaurant
        </p>
      </div>
    </footer>
  );
};

export default Footer;