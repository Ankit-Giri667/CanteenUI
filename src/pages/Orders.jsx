import React from "react";

export default function Orders({ orders }) {
  return (
    <div>
      <h2 className="text-2xl font-bold">Orders</h2>
      <p className="text-slate-400">Latest orders placed from checkout.</p>

      {orders.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/30 p-8 text-center">
          <p className="text-slate-300">No orders yet.</p>
          <p className="text-slate-500 text-sm mt-1">Place an order from Menu → Cart → Checkout.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {orders.map((o) => (
            <div key={o.orderId} className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-bold">{o.orderId}</p>
                  <p className="text-slate-400 text-sm">{new Date(o.createdAt).toLocaleString()}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold">Rs {o.total}</p>
                  <p className="text-sm text-emerald-300">{o.status}</p>
                </div>
              </div>

              <div className="mt-4 text-slate-300">
                <p>
                  Customer: <span className="font-semibold">{o.customerName}</span>
                </p>
                {o.note ? <p className="text-slate-400 text-sm mt-1">Note: {o.note}</p> : null}
              </div>

              <div className="mt-4 grid gap-2">
                {o.items.map((it) => (
                  <div key={it.id} className="flex justify-between text-sm text-slate-300">
                    <span>
                      {it.name} × {it.qty}
                    </span>
                    <span>Rs {it.price * it.qty}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
