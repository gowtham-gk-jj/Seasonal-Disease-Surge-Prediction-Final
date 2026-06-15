import React from "react";

export default function ResourcePlanning() {
  const resources = [
    {
      resource: "Hospital Beds",
      available: 820,
      required: 650,
    },
    {
      resource: "Ambulances",
      available: 120,
      required: 90,
    },
    {
      resource: "Medical Staff",
      available: 950,
      required: 800,
    },
    {
      resource: "Dengue Test Kits",
      available: 4500,
      required: 3000,
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

      <h1 className="text-2xl font-bold text-white mb-6">
        Resource Planning
      </h1>

      <table className="w-full">

        <thead>
          <tr className="border-b border-slate-700 text-slate-400">

            <th className="text-left py-3">
              Resource
            </th>

            <th className="text-left py-3">
              Available
            </th>

            <th className="text-left py-3">
              Required
            </th>

            <th className="text-left py-3">
              Status
            </th>

          </tr>
        </thead>

        <tbody>

          {resources.map((item) => (

            <tr
              key={item.resource}
              className="border-b border-slate-800"
            >

              <td className="py-3 text-white">
                {item.resource}
              </td>

              <td className="text-cyan-400">
                {item.available}
              </td>

              <td className="text-orange-400">
                {item.required}
              </td>

              <td>

                {item.available >= item.required ? (
                  <span className="text-green-400">
                    Available
                  </span>
                ) : (
                  <span className="text-red-400">
                    Shortage
                  </span>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}