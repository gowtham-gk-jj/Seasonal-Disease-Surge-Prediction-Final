import React from "react";

export default function Alerts({
  data = [],
}) {

  const alerts = data.filter(
    (item) => item.risk_level === "HIGH"
  );

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold text-white">
        Alerts Center
      </h1>

      {alerts.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-400">
          No active alerts.
        </div>
      ) : (
        alerts.map((alert) => (
          <div
            key={alert.district}
            className="bg-red-500/10 border border-red-500/30 rounded-xl p-5"
          >

            <h2 className="text-red-400 font-bold text-lg">
              🚨 {alert.district}
            </h2>

            <p className="text-slate-300 mt-2">
              Expected Cases:
              {" "}
              {alert.expected_cases_2w}
            </p>

            <p className="text-slate-300">
              Surge Probability:
              {" "}
              {Math.round(
                alert.surge_probability * 100
              )}
              %
            </p>

          </div>
        ))
      )}

    </div>
  );
}