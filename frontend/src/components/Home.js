import React from "react";
import DishCard from "./DishCard";
import { PageHeader } from "./ui";

const Home = ({ dishes, rateDish, setPopupDish }) => {
  return (
    <div className="space-y-12">
      <PageHeader 
        title="Traditional" 
        highlight="South Spice"
        description="Experience the authentic taste of South India with our hand-picked traditional recipes, crafted with love and organic spices."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {dishes.map((d) => (
          <DishCard
            key={d.id}
            dish={d}
            rateDish={rateDish}
            setPopupDish={setPopupDish}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
