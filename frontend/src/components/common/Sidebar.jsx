import React from "react";

const tabs = [
  "dashboard",
  "predictions",
  "district-analysis",
  "resource-planning",
  "alerts",
  "about",
];

export default function Sidebar({
  activeTab,
  setActiveTab,
}) {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen hidden lg:block">
      <div className="p-6">
        <h2 className="text-xl font-black text-cyan-400">
          DiseaseSurge AI
        </h2>

        <p className="text-slate-500 text-xs mt-1">
          Early Warning System
        </p>
      </div>

      <nav className="px-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition ${
              activeTab === tab
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>
    </aside>
  );
}