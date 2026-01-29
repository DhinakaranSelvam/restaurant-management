import React from "react";

const Footer = () => {
  return (
    <footer className="bg-spice-forest py-12 px-8 text-white mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-b border-emerald-900/50 pb-12">
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-3xl font-display font-black tracking-tighter">
            South <span className="text-spice-saffron">Spice</span>
          </h3>
          <p className="text-emerald-100/50 text-xs font-medium max-w-[200px]">
            The most authentic South Indian culinary experience in the heart of the city.
          </p>
        </div>
        <div className="flex gap-12 text-xs font-black uppercase tracking-widest text-emerald-100/40">
          <span className="hover:text-spice-saffron transition-colors cursor-pointer">Menu</span>
          <span className="hover:text-spice-saffron transition-colors cursor-pointer">Reservations</span>
          <span className="hover:text-spice-saffron transition-colors cursor-pointer">Privacy</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100/20">
          © 2026 South Spice Restaurant | Handcrafted with ❤️
        </p>
        <div className="flex gap-4 opacity-30">
          <span className="text-xl">𝕏</span>
          <span className="text-xl">📸</span>
          <span className="text-xl">🎦</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
