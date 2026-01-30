import React, { useState, useEffect } from "react";
import * as api from "./api";

import dosaImg from "./images/dosa.jpg";
import backgroundBtn from "./images/backround.jpg";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Home from "./components/Home";
import Offers from "./components/Offers";
import Contact from "./components/Contact";
import AdminPanel from "./components/AdminPanel";
import EditPopup from "./components/EditPopup";
import DishDetailsPopup from "./components/DishDetailsPopup";

export default function App() {
  /* ---------- AUTH ---------- */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [page, setPage] = useState("login");

  /* ---------- DATA ---------- */
  const [popupDish, setPopupDish] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  const [offers, setOffers] = useState([]);
  const [newOffer, setNewOffer] = useState("");

  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dishesData = await api.getDishes();
        setDishes(dishesData.map(d => ({ ...d, desc: d.description, img: d.image_url || dosaImg })));
        
        const offersData = await api.getOffers();
        setOffers(offersData);

        if (isAdmin) {
          const messagesData = await api.getMessages();
          setMessages(messagesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, isAdmin]);

  const [editId, setEditId] = useState(null);
  const [editDish, setEditDish] = useState({ name: "", price: "", desc: "", img: "" });

  /* ---------- LOGIN ---------- */
  const handleLogin = async (email, password) => {
    try {
      const data = await api.login(email, password);
      localStorage.setItem("token", data.token);
      setIsAdmin(data.user.role === "admin");
      setIsLoggedIn(true);
      setPage("home");
    } catch (error) {
      alert("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  const handleSignup = async (username, email, password) => {
    try {
      await api.signup(username, email, password);
      alert("Signup successful! Please login.");
      // Optionally auto-login here or stay on login page
    } catch (error) {
      alert("Signup failed: " + (error.response?.data?.message || error.message));
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setPage("login");
  };

  const rateDish = async (id, rating) => {
    try {
      await api.rateDish(id, rating);
      setDishes(dishes.map((d) => (d.id === id ? { ...d, rating } : d)));
    } catch (error) {
      console.error("Error rating dish:", error);
    }
  };

  const handleUpdateDish = async () => {
    try {
      await api.updateDish(editId, {
        name: editDish.name,
        price: editDish.price,
        description: editDish.desc,
        image_url: editDish.img
      });
      setDishes(
        dishes.map((d) => (d.id === editId ? { ...d, ...editDish } : d))
      );
      setEditId(null);
      setEditDish({ name: "", price: "", desc: "", img: "" });
    } catch (error) {
      console.error("Error updating dish:", error);
    }
  };

  const handleDeleteDish = async (id) => {
    try {
      await api.deleteDish(id);
      setDishes(dishes.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  const handleAddOffer = async () => {
    if (newOffer.trim()) {
      try {
        const addedOffer = await api.createOffer(newOffer);
        setOffers([...offers, addedOffer]);
        setNewOffer("");
      } catch (error) {
        console.error("Error adding offer:", error);
      }
    }
  };

  const handleDeleteOffer = async (id) => {
    try {
      await api.deleteOffer(id);
      setOffers(offers.filter((o) => o.id !== id));
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  const handleSendMessage = async () => {
    if (messageText.trim()) {
      try {
        const sentMessage = await api.sendMessage(messageText);
        setMessages([sentMessage, ...messages]);
        setMessageText("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-spice-saffron/30 relative overflow-x-hidden">
      <div 
        className="fixed inset-0 -z-10 bg-fixed bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(255, 252, 245, 0.7), rgba(255, 252, 245, 0.7)), url(${backgroundBtn})` 
        }}
      />
      <Header
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        setPage={setPage}
        logout={logout}
      />

      <main className="flex-1 p-8">
        {!isLoggedIn && <Login handleLogin={handleLogin} handleSignup={handleSignup} />}

        {isLoggedIn && page === "home" && (
          <Home
            dishes={dishes}
            rateDish={rateDish}
            setPopupDish={setPopupDish}
          />
        )}

        {isLoggedIn && page === "offers" && <Offers offers={offers} />}

        {isLoggedIn && page === "contact" && (
          <Contact
            isAdmin={isAdmin}
            messages={messages}
            messageText={messageText}
            setMessageText={setMessageText}
            handleSendMessage={handleSendMessage}
          />
        )}

        {isLoggedIn && isAdmin && page === "admin" && (
          <AdminPanel
            offers={offers}
            handleAddOffer={handleAddOffer}
            handleDeleteOffer={handleDeleteOffer}
            newOffer={newOffer}
            setNewOffer={setNewOffer}
            dishes={dishes}
            handleDeleteDish={handleDeleteDish}
            setEditId={setEditId}
            setEditDish={setEditDish}
          />
        )}
      </main>

      <EditPopup
        editId={editId}
        setEditId={setEditId}
        editDish={editDish}
        setEditDish={setEditDish}
        handleUpdateDish={handleUpdateDish}
      />

      <DishDetailsPopup popupDish={popupDish} setPopupDish={setPopupDish} />

      <Footer />
    </div>
  );
}
