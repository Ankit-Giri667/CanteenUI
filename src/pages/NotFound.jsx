import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-10 text-center border rounded-3xl border-slate-800 bg-slate-900/30">
      <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
      <p className="mt-2 text-slate-400">Go back to menu.</p>
      <Link
        to="/menu"
        className="inline-flex px-5 py-3 mt-5 font-semibold rounded-2xl bg-emerald-500 text-slate-950 hover:brightness-110"
      >
        Menu
      </Link>
    </div>
  );
}
