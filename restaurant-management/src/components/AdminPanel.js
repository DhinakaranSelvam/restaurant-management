import React from "react";
import { PageHeader, Card, Badge, Button } from "./ui";

const AdminPanel = ({
  offers,
  handleAddOffer,
  handleDeleteOffer,
  newOffer,
  setNewOffer,
  dishes,
  handleDeleteDish,
  setEditId,
  setEditDish,
}) => {
  return (
    <div className="space-y-16">
      <PageHeader 
        title="System" 
        highlight="Management"
        description="Control the heart of South Spice. Manage your daily offers and dish availability."
        showDivider={false}
      />

      <div className="grid lg:grid-cols-2 gap-12">
        <Card className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="heading-tertiary">Live Offers</h3>
            <Badge>{offers.length} Active</Badge>
          </div>
          
          <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl border border-gray-100">
            <input
              className="flex-1 bg-transparent px-4 py-3 outline-none text-sm font-medium text-gray-700 placeholder:text-gray-400"
              placeholder="Announce something new..."
              value={newOffer}
              onChange={(e) => setNewOffer(e.target.value)}
            />
            <Button
              className="px-6 py-3"
              onClick={handleAddOffer}
            >
              Post
            </Button>
          </div>

          <div className="space-y-3">
            {offers.map((o) => (
              <div
                key={o.id}
                className="flex justify-between items-center p-5 bg-gray-50/50 hover:bg-white rounded-2xl border border-transparent hover:border-orange-100 transition-all group"
              >
                <span className="text-sm font-medium text-gray-600">{o.content}</span>
                <button
                  className="btn-delete opacity-0 group-hover:opacity-100"
                  onClick={() => handleDeleteOffer(o.id)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-8 overflow-hidden">
          <div className="flex items-center justify-between">
            <h3 className="heading-tertiary">Dish Manager</h3>
            <button className="text-xs font-black uppercase tracking-widest text-spice-saffron hover:underline">
              Add New Dish +
            </button>
          </div>
          
          <div className="overflow-x-auto -mx-10 px-10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="pb-6 text-small-caps">Details</th>
                  <th className="pb-6 text-small-caps">Price</th>
                  <th className="pb-6 text-small-caps text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {dishes.map((d) => (
                  <tr key={d.id} className="group transition-colors hover:bg-gray-50/30">
                    <td className="py-4 font-bold text-spice-forest text-sm">{d.name}</td>
                    <td className="py-4">
                      <Badge variant="price">{d.price}</Badge>
                    </td>
                    <td className="py-4 text-right space-x-4">
                      <button
                        className="text-xs font-bold text-spice-clay hover:text-spice-saffron transition-colors"
                        onClick={() => {
                          setEditId(d.id);
                          setEditDish({ name: d.name, price: d.price, desc: d.desc, img: d.img });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors"
                        onClick={() => handleDeleteDish(d.id)}
                      >
                        Del
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
