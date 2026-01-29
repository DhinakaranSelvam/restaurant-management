import React from "react";
import { Button, NavLink } from "./ui";

const Header = ({ isLoggedIn, isAdmin, setPage, logout }) => {
  return (
    <header className="card-glass sticky top-0 z-40 px-8 py-5 flex justify-between items-center">
      <h3 className="text-2xl font-display font-extrabold text-spice-forest flex items-center gap-2">
        <span className="text-spice-saffron">🍽️</span> South Spice
      </h3>
      <nav className="flex items-center gap-6">
        {isLoggedIn && (
          <>
            <NavLink onClick={() => setPage("home")}>Home</NavLink>
            <NavLink onClick={() => setPage("offers")}>Offers</NavLink>
            <NavLink onClick={() => setPage("contact")}>Contact</NavLink>
            {isAdmin && (
              <NavLink 
                onClick={() => setPage("admin")} 
                className="text-spice-forest"
              >
                Admin
              </NavLink>
            )}
            <Button 
              onClick={logout}
              className="ml-2 px-5 py-2 rounded-full"
            >
              Logout
            </Button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
