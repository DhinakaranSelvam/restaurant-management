import React from "react";
import { Button, Badge } from "./ui";

const DishDetailsPopup = ({ popupDish, setPopupDish }) => {
  if (!popupDish) return null;

  return (
    <div className="modal-overlay" onClick={() => setPopupDish(null)}>
      <div
        className="bg-white rounded-[3.5rem] shadow-2xl max-w-2xl w-full relative border border-orange-50 overflow-hidden flex flex-col md:flex-row animate-in fade-in slide-in-from-bottom-10 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-spice-saffron transition-colors text-2xl shadow-sm"
          onClick={() => setPopupDish(null)}
        >
          &times;
        </button>
        
        <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
          <img
            src={popupDish.img}
            alt={popupDish.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 p-10 md:p-12 space-y-8 flex flex-col justify-center">
          <div className="space-y-2">
            <Badge className="text-[10px] tracking-[0.3em]">Our Specialty</Badge>
            <h3 className="font-display text-4xl font-black text-spice-forest leading-tight">
              {popupDish.name}
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-display font-black text-spice-clay">{popupDish.price}</span>
              <div className="h-6 w-px bg-gray-200"></div>
              <div className="flex items-center text-spice-saffron">
                {"★".repeat(popupDish.rating)}
                {"☆".repeat(5 - popupDish.rating)}
              </div>
            </div>
            <p className="text-muted leading-relaxed">
              {popupDish.desc}
            </p>
          </div>

          <div className="pt-4">
            <Button
              className="w-full py-4 rounded-2xl shadow-lg shadow-spice-forest/20"
              onClick={() => setPopupDish(null)}
            >
              Order Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetailsPopup;
