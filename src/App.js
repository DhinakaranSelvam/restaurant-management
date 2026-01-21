import React, { useState } from "react";

import dosaImg from "./images/dosa.jpg";
import idliImg from "./images/idli.jpg";
import pongalImg from "./images/pongal.jpg";
import curdRiceImg from "./images/curd_rice.jpg";

export default function App() {
  /* ---------- AUTH ---------- */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [page, setPage] = useState("login");

  /* ---------- DATA ---------- */
  const [popupDish, setPopupDish] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  const [offers, setOffers] = useState([
    "10% OFF on Dosa Combo",
    "Free Payasam above ₹300",
    "Weekend Veg Thali @ ₹99",
  ]);
  const [newOffer, setNewOffer] = useState("");

  const [dishes, setDishes] = useState([
    {
      id: 1,
      name: "Masala Dosa",
      price: "₹60",
      desc: "Crispy dosa with potato masala.",
      img: dosaImg,
      rating: 4,
    },
    {
      id: 2,
      name: "Idli Sambar",
      price: "₹40",
      desc: "Soft idlis with hot sambar.",
      img: idliImg,
      rating: 5,
    },
    {
      id: 3,
      name: "Vegetable Pongal",
      price: "₹70",
      desc: "Traditional rice-lentil pongal.",
      img: pongalImg,
      rating: 4,
    },
    {
      id: 4,
      name: "Curd Rice",
      price: "₹50",
      desc: "Cooling curd rice.",
      img: curdRiceImg,
      rating: 3,
    },
  ]);

  const [editId, setEditId] = useState(null);
  const [editDish, setEditDish] = useState({ name: "", price: "", desc: "" });

  /* ---------- LOGIN ---------- */
  const handleLogin = (email, password) => {
    setIsAdmin(email === "admin@restaurant.com" && password === "admin123");
    setIsLoggedIn(true);
    setPage("home");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setPage("login");
  };

  const rateDish = (id, rating) => {
    setDishes(dishes.map((d) => (d.id === id ? { ...d, rating } : d)));
  };

  const handleUpdateDish = () => {
    setDishes(dishes.map(d => d.id === editId ? { ...d, ...editDish } : d));
    setEditId(null);
    setEditDish({ name: "", price: "", desc: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50 font-sans">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-teal-700 to-emerald-500 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <h3 className="text-xl font-bold">🍽️ South Spice</h3>
        <nav className="flex items-center">
          {isLoggedIn && (
            <>
              <span className="ml-4 cursor-pointer font-semibold hover:text-emerald-200 transition-colors" onClick={() => setPage("home")}>Home</span>
              <span className="ml-4 cursor-pointer font-semibold hover:text-emerald-200 transition-colors" onClick={() => setPage("offers")}>Offers</span>
              <span className="ml-4 cursor-pointer font-semibold hover:text-emerald-200 transition-colors" onClick={() => setPage("contact")}>Contact</span>
              {isAdmin && <span className="ml-4 cursor-pointer font-semibold hover:text-emerald-200 transition-colors" onClick={() => setPage("admin")}>Admin</span>}
              <span className="ml-4 cursor-pointer font-semibold hover:text-emerald-200 transition-colors" onClick={logout}>Logout</span>
            </>
          )}
        </nav>
      </header>

      <main className="flex-1 p-8">
        {/* LOGIN */}
        {!isLoggedIn && (
          <div className="bg-white p-6 rounded-xl mb-8 shadow-lg max-w-xs mx-auto mt-20">
            <div className="bg-gradient-to-r from-sky-400 to-indigo-500 text-white px-4 py-2 rounded-lg mb-4 font-semibold text-center">Login</div>
            <div className="flex flex-col space-y-3">
              <input id="email" className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Email" />
              <input id="password" type="password" className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Password" />
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-md cursor-pointer mt-2 hover:bg-indigo-700 transition-all font-semibold"
                onClick={() =>
                  handleLogin(
                    document.getElementById("email").value,
                    document.getElementById("password").value
                  )
                }
              >
                Login
              </button>
            </div>
          </div>
        )}

        {/* HOME */}
        {isLoggedIn && page === "home" && (
          <div className="bg-white p-6 rounded-xl mb-8 shadow-lg">
            <div className="bg-gradient-to-r from-sky-400 to-indigo-500 text-white px-4 py-2 rounded-lg mb-6 font-semibold inline-block">Our Dishes</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {dishes.map((d) => (
                <div key={d.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                  <img src={d.img} alt={d.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h4 className="font-bold text-lg">{d.name}</h4>
                    <p className="text-emerald-700 font-semibold">{d.price}</p>
                    <div className="flex space-x-1 my-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span key={s} className="cursor-pointer text-xl text-yellow-400" onClick={() => rateDish(d.id, s)}>
                          {s <= d.rating ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <button className="w-full bg-indigo-600 text-white px-3 py-2 rounded-md cursor-pointer mt-2 hover:bg-indigo-700 transition-colors font-medium" onClick={() => setPopupDish(d)}>
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OFFERS */}
        {isLoggedIn && page === "offers" && (
          <div className="bg-white p-6 rounded-xl mb-8 shadow-lg">
            <div className="bg-gradient-to-r from-sky-400 to-indigo-500 text-white px-4 py-2 rounded-lg mb-6 font-semibold inline-block">Special Offers</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {offers.map((o, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md border-l-4 border-emerald-500 p-5">
                  <h4 className="font-bold text-emerald-800 text-lg mb-2">🎉 Limited Deal</h4>
                  <p className="text-gray-600">{o}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT (USER & ADMIN) */}
        {isLoggedIn && page === "contact" && (
          <div className="bg-white p-6 rounded-xl mb-8 shadow-lg max-w-2xl mx-auto">
            {isAdmin ? (
              <>
                <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg mb-4 font-bold inline-block">User Messages</div>
                {messages.length === 0 ? (
                  <p className="text-gray-500 italic">No messages yet.</p>
                ) : (
                  <ul className="space-y-3 mt-4">
                    {messages.map((m, i) => (
                      <li key={i} className="p-3 bg-gray-50 rounded-md border border-gray-200 text-gray-700">{m}</li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <>
                <div className="bg-gradient-to-r from-sky-400 to-indigo-500 text-white px-4 py-2 rounded-lg mb-4 font-semibold inline-block">Contact Us</div>
                <p className="text-gray-600 mb-4">Have feedback or questions? Drop us a message!</p>
                <textarea
                  className="w-full p-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px]"
                  placeholder="Your message here..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <button
                  className="bg-indigo-600 text-white px-6 py-2 rounded-md cursor-pointer mt-4 hover:bg-indigo-700 transition-colors font-semibold"
                  onClick={() => {
                    if (messageText.trim()) {
                      setMessages([...messages, messageText]);
                      setMessageText("");
                      alert("Message sent successfully!");
                    }
                  }}
                >
                  Send Message
                </button>
              </>
            )}
          </div>
        )}

        {/* ADMIN */}
        {isLoggedIn && isAdmin && page === "admin" && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-emerald-500">
              <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg mb-4 font-bold inline-block">Manage Offers</div>
              <div className="flex space-x-2 mb-6">
                <input
                  className="flex-1 p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Type new offer..."
                  value={newOffer}
                  onChange={(e) => setNewOffer(e.target.value)}
                />
                <button
                  className="bg-emerald-600 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-emerald-700 transition-colors font-semibold"
                  onClick={() => {
                    if (newOffer.trim()) {
                      setOffers([...offers, newOffer]);
                      setNewOffer("");
                    }
                  }}
                >
                  Add Offer
                </button>
              </div>
              <ul className="space-y-2">
                {offers.map((o, i) => (
                  <li key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-md border border-gray-100">
                    <span className="text-gray-700">{o}</span>
                    <button
                      className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
                      onClick={() => setOffers(offers.filter((_, x) => x !== i))}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-sky-500 overflow-x-auto">
              <div className="bg-sky-100 text-sky-800 px-4 py-2 rounded-lg mb-4 font-bold inline-block">Manage Dishes</div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 border-b border-gray-200 font-bold text-gray-600 uppercase text-xs">Name</th>
                    <th className="p-3 border-b border-gray-200 font-bold text-gray-600 uppercase text-xs">Price</th>
                    <th className="p-3 border-b border-gray-200 font-bold text-gray-600 uppercase text-xs">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {dishes.map((d) => (
                    <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-gray-700 font-medium">{d.name}</td>
                      <td className="p-3 text-emerald-600 font-semibold">{d.price}</td>
                      <td className="p-3 space-x-2">
                        <button 
                          className="text-indigo-600 hover:underline font-medium" 
                          onClick={() => {
                            setEditId(d.id);
                            setEditDish({ name: d.name, price: d.price, desc: d.desc });
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline font-medium"
                          onClick={() => setDishes(dishes.filter((x) => x.id !== d.id))}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* EDIT POPUP */}
      {editId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setEditId(null)}>
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl" onClick={() => setEditId(null)}>&times;</button>
            <div className="bg-gradient-to-r from-sky-400 to-indigo-500 text-white px-4 py-2 rounded-lg mb-6 font-bold text-lg inline-block text-center w-full text-white">Edit Dish</div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Dish Name</label>
                <input 
                  className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={editDish.name}
                  onChange={(e) => setEditDish({...editDish, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Price</label>
                <input 
                  className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={editDish.price}
                  onChange={(e) => setEditDish({...editDish, price: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                <textarea 
                  className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
                  value={editDish.desc}
                  onChange={(e) => setEditDish({...editDish, desc: e.target.value})}
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-8">
              <button 
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all shadow-sm"
                onClick={() => setEditId(null)}
              >
                Cancel
              </button>
              <button 
                className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
                onClick={handleUpdateDish}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP */}
      {popupDish && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setPopupDish(null)}>
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl" onClick={() => setPopupDish(null)}>&times;</button>
            <div className="bg-gradient-to-r from-sky-400 to-indigo-500 text-white px-4 py-2 rounded-lg mb-4 font-bold text-lg inline-block">{popupDish.name}</div>
            <img src={popupDish.img} alt={popupDish.name} className="w-full h-48 object-cover rounded-xl mb-4 shadow-sm" />
            <p className="text-gray-600 leading-relaxed mb-4">{popupDish.desc}</p>
            <p className="text-emerald-700 text-2xl font-bold">{popupDish.price}</p>
            <button className="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl mt-6 font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95" onClick={() => setPopupDish(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      <footer className="bg-gradient-to-r from-teal-800 to-emerald-700 text-white p-6 text-center text-sm font-medium shadow-inner">
        © 2026 South Spice Restaurant | All Rights Reserved
      </footer>
    </div>
  );
}
