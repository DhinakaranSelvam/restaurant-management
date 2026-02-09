import React, { useState } from "react";
import { PageHeader, Card, Badge, Button } from "./ui";

const AdminPanel = ({
  offers,
  handleAddOffer,
  handleDeleteOffer,
  newOffer,
  setNewOffer,
  dishes,
  handleAddDish,
  handleDeleteDish,
  setEditId,
  setEditDish,
}) => {
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [newDish, setNewDish] = useState({ name: "", price: "", desc: "", img: "" });

  const handleAddNewDish = async () => {
    if (newDish.name && newDish.price) {
      await handleAddDish({
        name: newDish.name,
        price: newDish.price,
        description: newDish.desc,
        image_url: newDish.img
      });
      setNewDish({ name: "", price: "", desc: "", img: "" });
      setShowAddDishModal(false);
    }
  };

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
            <button 
              className="text-xs font-black uppercase tracking-widest text-spice-saffron hover:underline"
              onClick={() => setShowAddDishModal(true)}
            >
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

      {/* Add Dish Modal */}
      {showAddDishModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-6 text-center">Add New Dish</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dish Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-spice-saffron focus:outline-none"
                  value={newDish.name}
                  onChange={(e) => setNewDish({...newDish, name: e.target.value})}
                  placeholder="Enter dish name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-spice-saffron focus:outline-none"
                  value={newDish.price}
                  onChange={(e) => setNewDish({...newDish, price: e.target.value})}
                  placeholder="Enter price (e.g., ₹120)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-spice-saffron focus:outline-none"
                  value={newDish.desc}
                  onChange={(e) => setNewDish({...newDish, desc: e.target.value})}
                  placeholder="Enter dish description"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-spice-saffron focus:outline-none"
                  value={newDish.img}
                  onChange={(e) => setNewDish({...newDish, img: e.target.value})}
                  placeholder="Enter image URL"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setShowAddDishModal(false);
                  setNewDish({ name: "", price: "", desc: "", img: "" });
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-spice-saffron text-white rounded-lg hover:bg-yellow-500"
                onClick={handleAddNewDish}
              >
                Add Dish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
