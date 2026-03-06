import React from "react";
import { FaStar, FaPepperHot, FaPlus } from "react-icons/fa";

export default function ProductCard({ item, inCartQty = 0, onAdd }) {
  return (
    <div className="overflow-hidden transition border rounded-2xl border-slate-800 bg-slate-900/40 hover:bg-slate-900">
      <img src={item.image} alt={item.name} className="object-cover w-full h-44" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-slate-400">{item.category}</p>
          </div>

          <div className="text-right">
            <p className="font-bold">Rs {item.price}</p>
            <div className="flex items-center justify-end gap-2 mt-1 text-sm text-slate-300">
              <span className="inline-flex items-center gap-1">
                <FaStar /> {item.rating}
              </span>
              {item.spicy ? (
                <span className="inline-flex items-center gap-1 text-orange-300">
                  <FaPepperHot /> Spicy
                </span>
              ) : (
                <span className="text-slate-500">Mild</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => onAdd(item)}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-slate-950 hover:brightness-110 active:scale-[0.98]"
          >
            <FaPlus /> Add
          </button>

          <p className="text-sm text-slate-400">
            In cart: <span className="font-semibold text-slate-200">{inCartQty}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
