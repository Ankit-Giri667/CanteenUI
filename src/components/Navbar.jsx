import React from "react";
import { NavLink } from "react-router-dom";
import { FaUtensils, FaShoppingCart, FaClipboardList } from "react-icons/fa";
import Badge from "./Badge.js";

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-lg transition ${
    isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-900"
  }`;

export default function Navbar({ cartCount }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="flex items-center justify-between max-w-6xl px-4 py-4 mx-auto">
        <div className="flex items-center gap-2">
          <FaUtensils className="text-xl" />
          <span className="font-semibold tracking-wide">Canteen System</span>
        </div>

        <nav className="flex items-center gap-2">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/menu" className={linkClass}>
            Menu
          </NavLink>

          <NavLink to="/orders" className={linkClass}>
            <span className="inline-flex items-center gap-2">
              <FaClipboardList /> Orders
            </span>
          </NavLink>

          <NavLink to="/cart" className={linkClass}>
            <span className="inline-flex items-center gap-2">
              <FaShoppingCart />
              Cart
              {cartCount > 0 ? <Badge text={cartCount} /> : null}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
