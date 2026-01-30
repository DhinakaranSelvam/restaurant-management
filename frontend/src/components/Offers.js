import React from "react";
import { PageHeader, Badge } from "./ui";

const Offers = ({ offers }) => {
  return (
    <div className="space-y-12">
      <PageHeader 
        title="Exclusive" 
        highlight="Spice Deals"
        description="Grab these limited-time offers and treat yourself to a flavorful journey."
        showDivider={false}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((o, i) => (
          <div
            key={o.id}
            className="group relative card-hover p-8 hover:border-spice-saffron hover:-translate-y-2"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="text-6xl text-spice-saffron italic font-display font-black">
                #{i + 1}
              </span>
            </div>
            <div className="relative space-y-4">
              <div className="w-12 h-12 bg-spice-saffron/10 rounded-2xl flex items-center justify-center text-2xl">
                🎁
              </div>
              <h4 className="font-display text-2xl font-black text-spice-forest">
                Special Offer
              </h4>
              <p className="text-gray-600 font-medium leading-relaxed">
                {o.content}
              </p>
              <div className="pt-4">
                <Badge>Limited Time</Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
