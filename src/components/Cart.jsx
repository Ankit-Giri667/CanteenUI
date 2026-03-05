import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem.jsx";

export default function Cart({ cart, totals, incQty, decQty, removeItem, clearCart }) {
  return (
    <div>
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Cart</h2>
          <p className="text-slate-400">Review items before checkout.</p>
        </div>

        {cart.length > 0 ? (
          <button
            onClick={clearCart}
            className="px-4 py-3 border rounded-2xl border-slate-800 bg-slate-900/40 hover:bg-slate-900"
          >
            Clear Cart
          </button>
        ) : null}
      </div>

      {cart.length === 0 ? (
        <div className="p-8 mt-8 text-center border rounded-3xl border-slate-800 bg-slate-900/30">
          <p className="text-slate-300">Your cart is empty.</p>
          <Link
            to="/menu"
            className="inline-flex px-5 py-3 mt-4 font-semibold rounded-2xl bg-emerald-500 text-slate-950 hover:brightness-110"
          >
            Go to Menu
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 mt-6">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onInc={incQty}
              onDec={decQty}
              onRemove={removeItem}
            />
          ))}

          <div className="p-6 mt-4 border rounded-3xl border-slate-800 bg-slate-900/30">
            <div className="flex justify-between text-slate-300">
              <span>Subtotal</span>
              <span>Rs {totals.subtotal}</span>
            </div>
            <div className="flex justify-between mt-2 text-slate-300">
              <span>Tax (10%)</span>
              <span>Rs {totals.tax}</span>
            </div>
            <div className="flex justify-between mt-3 text-lg font-bold">
              <span>Total</span>
              <span>Rs {totals.total}</span>
            </div>

            <div className="flex flex-wrap gap-3 mt-5">
              <Link
                to="/checkout"
                className="inline-flex px-5 py-3 font-semibold rounded-2xl bg-emerald-500 text-slate-950 hover:brightness-110"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/menu"
                className="inline-flex px-5 py-3 border rounded-2xl border-slate-700 hover:bg-slate-900"
              >
                Add More
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
