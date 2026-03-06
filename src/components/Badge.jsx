import React from "react";

export default function Badge({ text }) {
  return (
    <span className="ml-1 inline-flex items-center justify-center rounded-full bg-emerald-500 text-slate-950 text-xs font-bold px-2 py-0.5">
      {text}
    </span>
  );
}
