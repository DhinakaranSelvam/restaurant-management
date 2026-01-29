import React from "react";
import { Input, Textarea, Button } from "./ui";

const EditPopup = ({ editId, setEditId, editDish, setEditDish, handleUpdateDish }) => {
  if (!editId) return null;

  return (
    <div className="modal-overlay" onClick={() => setEditId(null)}>
      <div className="modal-content animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setEditId(null)}>
          &times;
        </button>
        <div className="mb-10 text-center">
          <h3 className="heading-secondary">
            Modify <span className="text-spice-saffron">Dish</span>
          </h3>
          <p className="text-small-caps mt-2">Administrative Control</p>
        </div>

        <div className="space-y-6">
          <Input
            label="Dish Name"
            value={editDish.name}
            onChange={(e) => setEditDish({ ...editDish, name: e.target.value })}
            className="rounded-2xl"
          />
          <Input
            label="Price Tag"
            value={editDish.price}
            onChange={(e) => setEditDish({ ...editDish, price: e.target.value })}
            className="rounded-2xl"
          />
          <Input
            label="Image URL"
            value={editDish.img}
            onChange={(e) => setEditDish({ ...editDish, img: e.target.value })}
            className="rounded-2xl"
          />
          <Textarea
            label="Description"
            value={editDish.desc}
            onChange={(e) => setEditDish({ ...editDish, desc: e.target.value })}
            className="rounded-2xl"
          />
        </div>

        <div className="flex gap-4 mt-10">
          <Button
            variant="ghost"
            className="flex-1 py-4 rounded-2xl"
            onClick={() => setEditId(null)}
          >
            Cancel
          </Button>
          <Button
            className="flex-[2] py-4 rounded-2xl shadow-lg shadow-spice-forest/20"
            onClick={handleUpdateDish}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
