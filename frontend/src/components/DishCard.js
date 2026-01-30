import React from "react";
import { Button, Badge } from "./ui";

const DishCard = ({ dish, rateDish, setPopupDish }) => {
  return (
    <div className="group card-hover flex flex-col h-full overflow-hidden">
      <div className="relative overflow-hidden h-48">
        <img 
          src={dish.img} 
          alt={dish.name} 
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="price">
            <p className="font-bold text-sm">{dish.price}</p>
          </Badge>
          <h4 className="font-display text-xl font-extrabold text-spice-forest group-hover:text-spice-saffron transition-colors">
            {dish.name}
          </h4>
        </div>
        <div className="flex items-center gap-1 mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              className={`star-icon ${
                s <= dish.rating ? "text-spice-saffron scale-110" : "text-gray-200"
              }`}
              onClick={() => rateDish(dish.id, s)}
            >
              ★
            </span>
          ))}
          <span className="text-xs text-gray-400 ml-2 font-medium">({dish.rating}.0)</span>
        </div>
        <Button
          className="mt-auto w-full py-3 flex items-center justify-center gap-2"
          onClick={() => setPopupDish(dish)}
        >
          View Details
          <span className="text-lg">→</span>
        </Button>
      </div>
    </div>
  );
};

export default DishCard;
