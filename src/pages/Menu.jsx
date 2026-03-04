import React, { useMemo, useState } from "react";
import { menuItems } from "../data/menu.js";
import ProductCard from "../components/ProductCard.jsx";
import { FaSearch } from "react-icons/fa";

export default function Menu({ cart, addToCart }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [spicyOnly, setSpicyOnly] = useState(false);

  const categories = useMemo(() => {
    return ["All", ...new Set(menuItems.map((x) => x.category))];
  }, []);

  const filtered = useMemo(() => {
    return menuItems
      .filter((x) => (category === "All" ? true : x.category === category))
      .filter((x) => (spicyOnly ? x.spicy : true))
      .filter((x) => x.name.toLowerCase().includes(query.toLowerCase()));
  }, [query, category, spicyOnly]);

  const qtyInCart = (id) => cart.find((c) => c.id === id)?.qty ?? 0;

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Menu</h2>
          <p className="text-slate-400">Select items and add to cart.</p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3">
            <FaSearch className="text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search item..."
              className="w-full bg-transparent outline-none text-slate-100 placeholder:text-slate-500"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3 outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-slate-950">
                {c}
              </option>
            ))}
          </select>

          <button
            onClick={() => setSpicyOnly((s) => !s)}
            className={`rounded-2xl border px-4 py-3 font-semibold transition ${
              spicyOnly
                ? "border-emerald-500 bg-emerald-500 text-slate-950"
                : "border-slate-800 bg-slate-900/40 text-slate-100 hover:bg-slate-900"
            }`}
          >
            {spicyOnly ? "Spicy Only: ON" : "Spicy Only: OFF"}
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <ProductCard key={item.id} item={item} inCartQty={qtyInCart(item.id)} onAdd={addToCart} />
        ))}
      </div>

      {filtered.length === 0 ? <p className="mt-8 text-center text-slate-400">No items found.</p> : null}
    </div>
  );
}
