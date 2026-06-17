import React from "react";
import {
  FaHome,
  FaChartLine,
  FaMapMarkedAlt,
  FaHospital,
  FaBell,
  FaInfoCircle,
  FaBrain,
  FaDatabase,
  FaCheckCircle,
} from "react-icons/fa";

const tabs = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <FaHome />,
  },

  {
    id: "predictions",
    label: "Predictions",
    icon: <FaChartLine />,
  },

  {
    id: "district-analysis",
    label: "District Analysis",
    icon: <FaMapMarkedAlt />,
  },

  {
    id: "validation-scorecard",
    label: "Validation Scorecard",
    icon: <FaCheckCircle />,
  },

  {
    id: "shap-analysis",
    label: "SHAP Feature Breakdown",
    icon: <FaBrain />,
  },

  {
    id: "resource-planning",
    label: "Resource Planning",
    icon: <FaHospital />,
  },

  {
    id: "data-sources",
    label: "Data Source Citation Panel",
    icon: <FaDatabase />,
  },

  {
    id: "alerts",
    label: "ASHA Alert Generator",
    icon: <FaBell />,
  },

  {
    id: "about",
    label: "About",
    icon: <FaInfoCircle />,
  },
];

export default function Sidebar({
  activeTab,
  setActiveTab,
}) {
  return (
    <aside
      className="
        w-72
        bg-slate-900
        border-r
        border-slate-800
        min-h-screen
        hidden
        lg:block
      "
    >
      {/* Logo */}

      <div className="p-6 border-b border-slate-800">
        <h2 className="text-3xl font-black text-cyan-400">
          DiseaseSurge AI
        </h2>

        <p className="text-slate-500 text-sm mt-2">
          Early Warning System
        </p>
      </div>

      {/* Menu */}

      <nav className="p-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() =>
              setActiveTab(tab.id)
            }
            className={`
              w-full
              flex
              items-center
              gap-3
              px-4
              py-4
              rounded-xl
              mb-3
              transition-all
              duration-200

              ${
                activeTab === tab.id
                  ? `
                    bg-cyan-500/20
                    text-cyan-400
                    border
                    border-cyan-500/30
                  `
                  : `
                    text-slate-400
                    hover:bg-slate-800
                    hover:text-white
                  `
              }
            `}
          >
            <span className="text-lg">
              {tab.icon}
            </span>

            <span className="font-medium text-left">
              {tab.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
}