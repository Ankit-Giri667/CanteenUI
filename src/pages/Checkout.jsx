import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout({ totals, placeOrder }) {
  const [customerName, setCustomerName] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  const handlePlace = (e) => {
    e.preventDefault();
    placeOrder({
      customerName: customerName.trim() || "Guest",
      note: note.trim(),
    });
    navigate("/orders");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6">
        <h2 className="text-2xl font-bold">Checkout</h2>
        <p className="text-slate-400">Enter details and place your order.</p>

        <form onSubmit={handlePlace} className="mt-6 grid gap-4">
          <div>
            <label className="text-sm text-slate-300">Customer Name</label>
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-3 outline-none"
              placeholder="e.g., Nitesh"
            />
          </div>

          <div>
            <label className="text-sm text-slate-300">Note (optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-3 outline-none min-h-[120px]"
              placeholder="Less spicy / extra sauce / takeaway..."
            />
          </div>

          <button className="rounded-2xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 hover:brightness-110">
            Place Order (Rs {totals.total})
          </button>

          <Link to="/cart" className="text-slate-400 hover:text-slate-200">
            ← Back to cart
          </Link>
        </form>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6">
        <h3 className="text-xl font-bold">Bill Summary</h3>
        <div className="mt-4 grid gap-2 text-slate-300">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rs {totals.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>Rs {totals.tax}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-slate-100">
            <span>Total</span>
            <span>Rs {totals.total}</span>
          </div>
        </div>

        <div className="mt-6 text-sm text-slate-400">
          This is a frontend demo. You can later connect a backend (Node/Express/Firebase) to store orders permanently.
        </div>
      </div>
    </div>
  );
}
