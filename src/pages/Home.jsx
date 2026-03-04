import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaChartLine,
  FaShoppingBag,
  FaMoneyBillWave,
  FaFire,
  FaReceipt,
  FaClock,
} from "react-icons/fa";

function isSameLocalDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatTime(iso) {
  try {
    return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

export default function Home({ orders = [] }) {
  const stats = useMemo(() => {
    const now = new Date();

    const todaysOrders = orders.filter((o) => isSameLocalDay(new Date(o.createdAt), now));
    const todaysSales = todaysOrders.reduce((sum, o) => sum + (o.total || 0), 0);

    // Top selling item today (by qty)
    const qtyByItem = {};
    for (const o of todaysOrders) {
      for (const it of o.items || []) {
        qtyByItem[it.name] = (qtyByItem[it.name] || 0) + (it.qty || 0);
      }
    }
    const topEntry = Object.entries(qtyByItem).sort((a, b) => b[1] - a[1])[0];
    const topItem = topEntry ? { name: topEntry[0], qty: topEntry[1] } : null;

    // Best 3 items today
    const top3 = Object.entries(qtyByItem)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, qty]) => ({ name, qty }));

    const maxQty = top3.length ? Math.max(...top3.map((x) => x.qty)) : 1;

    return {
      todaysSales,
      ordersToday: todaysOrders.length,
      topItem,
      top3,
      maxQty,
      recent: todaysOrders.slice(0, 4),
    };
  }, [orders]);

  const StatCard = ({ icon, title, value, sub }) => (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/35 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center justify-center border h-11 w-11 rounded-2xl border-slate-800 bg-slate-950/40">
          {icon}
        </div>
        <span className="text-xs text-slate-500">Today</span>
      </div>
      <p className="mt-4 text-sm text-slate-400">{title}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
      {sub ? <p className="mt-2 text-sm text-slate-400">{sub}</p> : null}
    </div>
  );

  return (
    <div className="grid gap-6">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900/30 p-8">
        <div className="absolute rounded-full pointer-events-none -top-24 -right-24 h-72 w-72 bg-emerald-500/15 blur-3xl" />
        <div className="absolute rounded-full pointer-events-none -bottom-24 -left-24 h-72 w-72 bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_50%)]" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Canteen Management System
            </h1>

            <p className="max-w-2xl mt-3 text-slate-300">
              Monitor <span className="font-semibold text-slate-100">today’s sales</span>, track{" "}
              <span className="font-semibold text-slate-100">total orders</span>, and manage menu & cart faster.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 hover:brightness-110 active:scale-[0.98]"
              >
                Go to Menu <FaArrowRight />
              </Link>

              <Link
                to="/orders"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-950/20 px-5 py-3 text-slate-100 hover:bg-slate-900 active:scale-[0.98]"
              >
                View Orders
              </Link>

              <Link
                to="/cart"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-950/20 px-5 py-3 text-slate-100 hover:bg-slate-900 active:scale-[0.98]"
              >
                Cart / Checkout <FaReceipt />
              </Link>
            </div>
          </div>

          {/* Snapshot */}
          <div className="w-full md:w-[360px] rounded-3xl border border-slate-800 bg-slate-950/25 p-6">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Today Snapshot</p>
              <span className="text-xs text-slate-500">{new Date().toLocaleDateString()}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-4 border rounded-2xl border-slate-800 bg-slate-950/30">
                <p className="text-xs text-slate-400">Sales</p>
                <p className="mt-1 text-lg font-bold">Rs {stats.todaysSales}</p>
              </div>
              <div className="p-4 border rounded-2xl border-slate-800 bg-slate-950/30">
                <p className="text-xs text-slate-400">Orders</p>
                <p className="mt-1 text-lg font-bold">{stats.ordersToday}</p>
              </div>
            </div>

            <div className="p-4 mt-4 border rounded-2xl border-slate-800 bg-slate-950/30">
              <p className="text-xs text-slate-400">Top item</p>
              <p className="mt-1 font-semibold">
                {stats.topItem ? stats.topItem.name : "—"}
                {stats.topItem ? (
                  <span className="ml-2 text-xs text-slate-400">({stats.topItem.qty} sold)</span>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={<FaMoneyBillWave className="text-2xl text-emerald-300" />}
          title="Today's Sales"
          value={`Rs ${stats.todaysSales}`}
          sub="Revenue from orders placed today."
        />
        <StatCard
          icon={<FaShoppingBag className="text-2xl text-cyan-300" />}
          title="Total Orders Today"
          value={stats.ordersToday}
          sub="Number of orders placed today."
        />
        <StatCard
          icon={<FaFire className="text-2xl text-orange-300" />}
          title="Top Selling Item"
          value={stats.topItem ? stats.topItem.name : "—"}
          sub={stats.topItem ? `Sold: ${stats.topItem.qty} pcs` : "No sales yet today."}
        />
      </section>

      {/* DETAILS */}
      <section className="grid gap-5 lg:grid-cols-2">
        {/* Top items */}
        <div className="rounded-[28px] border border-slate-800 bg-slate-900/30 p-7">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 border rounded-2xl border-slate-800 bg-slate-950/40">
              <FaChartLine className="text-slate-200" />
            </div>
            <div>
              <p className="font-bold">Top Items Today</p>
              <p className="text-sm text-slate-400">Based on quantity sold</p>
            </div>
          </div>

          {stats.top3.length === 0 ? (
            <div className="p-5 mt-6 border rounded-2xl border-slate-800 bg-slate-950/25 text-slate-400">
              No sales yet. Place an order to see today’s top items.
            </div>
          ) : (
            <div className="grid gap-4 mt-6">
              {stats.top3.map((x) => {
                const pct = Math.round((x.qty / stats.maxQty) * 100);
                return (
                  <div key={x.name} className="grid gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-200">{x.name}</span>
                      <span className="text-slate-400">{x.qty} pcs</span>
                    </div>
                    <div className="w-full h-3 overflow-hidden border rounded-full border-slate-800 bg-slate-950/40">
                      <div
                        className="h-full rounded-full bg-emerald-500/80"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent orders */}
        <div className="rounded-[28px] border border-slate-800 bg-slate-900/30 p-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 border rounded-2xl border-slate-800 bg-slate-950/40">
                <FaClock className="text-slate-200" />
              </div>
              <div>
                <p className="font-bold">Recent Orders Today</p>
                <p className="text-sm text-slate-400">Latest 4 orders</p>
              </div>
            </div>

            <Link to="/orders" className="text-sm text-emerald-300 hover:text-emerald-200">
              View all →
            </Link>
          </div>

          {stats.recent.length === 0 ? (
            <div className="p-5 mt-6 border rounded-2xl border-slate-800 bg-slate-950/25 text-slate-400">
              No orders yet today.
            </div>
          ) : (
            <div className="grid gap-3 mt-6">
              {stats.recent.map((o) => (
                <div
                  key={o.orderId}
                  className="p-4 border rounded-2xl border-slate-800 bg-slate-950/25"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{o.orderId}</p>
                      <p className="text-sm text-slate-400">
                        {formatTime(o.createdAt)} • {o.customerName || "Guest"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">Rs {o.total}</p>
                      <p className="text-xs text-emerald-300">{o.status || "Preparing"}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {(o.items || []).slice(0, 3).map((it) => (
                      <span
                        key={it.id}
                        className="px-3 py-1 text-xs border rounded-full border-slate-800 bg-slate-950/30 text-slate-300"
                      >
                        {it.name} × {it.qty}
                      </span>
                    ))}
                    {(o.items || []).length > 3 ? (
                      <span className="px-3 py-1 text-xs border rounded-full border-slate-800 bg-slate-950/30 text-slate-400">
                        +{(o.items || []).length - 3} more
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}