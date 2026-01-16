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

  return (
    <div className="app-root">
      <style>{`
        body { margin:0; font-family:Segoe UI; background:#f0fdf4; }

        .app-root { min-height:100vh; display:flex; flex-direction:column; }

        header, footer {
          background:linear-gradient(90deg,#0f766e,#22c55e);
          color:white;
          padding:15px 30px;
          display:flex;
          justify-content:space-between;
          align-items:center;
        }

        nav span { margin-left:15px; cursor:pointer; font-weight:600; }

        .main { flex:1; padding:30px; }

        .section {
          background:white;
          padding:20px;
          border-radius:12px;
          margin-bottom:30px;
          box-shadow:0 10px 25px rgba(0,0,0,0.1);
        }

        .section-title {
          background:linear-gradient(90deg,#38bdf8,#6366f1);
          color:white;
          padding:10px 15px;
          border-radius:8px;
          margin-bottom:15px;
          font-weight:600;
        }

        .grid {
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
          gap:20px;
        }

        .card {
          background:white;
          border-radius:12px;
          overflow:hidden;
          box-shadow:0 8px 20px rgba(0,0,0,0.15);
        }

        .card img { width:100%; height:140px; object-fit:cover; }

        .card-body { padding:15px; }

        .stars span { cursor:pointer; color:gold; }

        input, textarea {
          width:260px;
          padding:8px;
          margin:6px 0;
          border-radius:6px;
          border:1px solid #cbd5f5;
        }

        .btn {
          background:#6366f1;
          color:white;
          border:none;
          padding:8px 12px;
          border-radius:6px;
          cursor:pointer;
          margin-top:6px;
        }

        table { width:100%; border-collapse:collapse; }
        th, td { padding:8px; border-bottom:1px solid #e5e7eb; text-align:left; }

        footer { text-align:center; }
      `}</style>

      {/* HEADER */}
      <header>
        <h3>🍽️ South Spice</h3>
        <nav>
          {isLoggedIn && (
            <>
              <span onClick={() => setPage("home")}>Home</span>
              <span onClick={() => setPage("offers")}>Offers</span>
              <span onClick={() => setPage("contact")}>Contact</span>
              {isAdmin && <span onClick={() => setPage("admin")}>Admin</span>}
              <span onClick={logout}>Logout</span>
            </>
          )}
        </nav>
      </header>

      <div className="main">
        {/* LOGIN */}
        {!isLoggedIn && (
          <div
            className="section"
            style={{ maxWidth: 300, margin: "80px auto" }}
          >
            <div className="section-title">Login</div>
            <input id="email" placeholder="Email" />
            <input id="password" type="password" placeholder="Password" />
            <button
              className="btn"
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
        )}

        {/* HOME */}
        {isLoggedIn && page === "home" && (
          <div className="section">
            <div className="section-title">Our Dishes</div>
            <div className="grid">
              {dishes.map((d) => (
                <div key={d.id} className="card">
                  <img src={d.img} alt={d.name} />
                  <div className="card-body">
                    <h4>{d.name}</h4>
                    <p>{d.price}</p>
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span key={s} onClick={() => rateDish(d.id, s)}>
                          {s <= d.rating ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <button className="btn" onClick={() => setPopupDish(d)}>
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OFFERS */}
        {isLoggedIn && page === "offers" && (
          <div className="section">
            <div className="section-title">Offers</div>
            <div className="grid">
              {offers.map((o, i) => (
                <div key={i} className="card">
                  <div className="card-body">
                    <h4>🎉 Special</h4>
                    <p>{o}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT (USER) */}
        {isLoggedIn && !isAdmin && page === "contact" && (
          <div className="section">
            <div className="section-title">Contact Us</div>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <br />
            <button
              className="btn"
              onClick={() => {
                setMessages([...messages, messageText]);
                setMessageText("");
              }}
            >
              Send
            </button>
          </div>
        )}

        {/* ADMIN */}
        {isLoggedIn && isAdmin && page === "admin" && (
          <>
            <div className="section">
              <div className="section-title">User Messages</div>
              <ul>
                {messages.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>

            <div className="section">
              <div className="section-title">Manage Offers</div>
              <input
                value={newOffer}
                onChange={(e) => setNewOffer(e.target.value)}
              />
              <button
                className="btn"
                onClick={() => setOffers([...offers, newOffer])}
              >
                Add
              </button>
              <ul>
                {offers.map((o, i) => (
                  <li key={i}>
                    {o}
                    <button
                      className="btn"
                      onClick={() =>
                        setOffers(offers.filter((_, x) => x !== i))
                      }
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="section">
              <div className="section-title">Manage Dishes</div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dishes.map((d) => (
                    <tr key={d.id}>
                      <td>{d.name}</td>
                      <td>{d.price}</td>
                      <td>
                        <button className="btn" onClick={() => setEditId(d.id)}>
                          Edit
                        </button>
                        <button
                          className="btn"
                          onClick={() =>
                            setDishes(dishes.filter((x) => x.id !== d.id))
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* POPUP */}
      {popupDish && (
        <div className="popup" onClick={() => setPopupDish(null)}>
          <div className="section">
            <div className="section-title">{popupDish.name}</div>
            <p>{popupDish.desc}</p>
            <p>{popupDish.price}</p>
          </div>
        </div>
      )}

      <footer>© 2026 South Spice Restaurant</footer>
    </div>
  );
}
