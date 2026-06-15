import React from "react";

export default function Header({
  title = "TN Disease Surge Predictor",
  subtitle = "PS08 · 14–21 Day Forecast · 38 Districts",
  time,
}) {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-lg">
            🏥
          </div>

          <div>
            <h1 className="text-sm font-bold text-white tracking-tight">
              {title}
            </h1>
            <p className="text-xs text-slate-500">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-slate-400">Live</span>
          </div>

          <span className="text-xs text-slate-500 hidden sm:block">
            {time?.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </header>
  );
}