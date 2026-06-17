import React, { useMemo } from "react";

function RiskBadge({ level }) {
  const styles = {
    HIGH: "bg-red-500/20 text-red-400 border-red-500/30",
    MEDIUM:
      "bg-orange-500/20 text-orange-400 border-orange-500/30",
    LOW: "bg-green-500/20 text-green-400 border-green-500/30",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-bold border ${
        styles[level] || styles.LOW
      }`}
    >
      {level || "LOW"}
    </span>
  );
}

export default function RiskTable({
  data = [],
  title = "Disease Risk Table",
}) {
  const latestDistrictData = useMemo(() => {
    const districtMap = {};

    data.forEach((item) => {
      const district =
        item?.district;

      if (!district) return;

      const year =
        Number(item?.year) || 0;

      const week =
        Number(
          item?.week_number
        ) || 0;

      if (
        !districtMap[district]
      ) {
        districtMap[district] =
          item;
      } else {
        const oldYear =
          Number(
            districtMap[district]
              ?.year
          ) || 0;

        const oldWeek =
          Number(
            districtMap[district]
              ?.week_number
          ) || 0;

        if (
          year > oldYear ||
          (year === oldYear &&
            week > oldWeek)
        ) {
          districtMap[district] =
            item;
        }
      }
    });

    return Object.values(
      districtMap
    ).sort(
      (a, b) =>
        (b.surge_probability ||
          0) -
        (a.surge_probability ||
          0)
    );
  }, [data]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">

      <div className="px-4 py-3 border-b border-slate-800">
        <h2 className="text-lg font-bold text-white">
          {title}
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          Latest Prediction For Each District
        </p>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead>
            <tr className="bg-slate-800 text-slate-300">

              <th className="text-left px-4 py-3">
                District
              </th>

              <th className="text-left px-4 py-3">
                Disease
              </th>

              <th className="text-left px-4 py-3">
                Probability
              </th>

              <th className="text-left px-4 py-3">
                Expected Cases
              </th>

              <th className="text-left px-4 py-3">
                Risk Level
              </th>

              <th className="text-left px-4 py-3">
                Year
              </th>

              <th className="text-left px-4 py-3">
                Week
              </th>

            </tr>
          </thead>

          <tbody>

            {latestDistrictData.length >
            0 ? (
              latestDistrictData.map(
                (
                  row,
                  index
                ) => (
                  <tr
                    key={`${row.district}-${index}`}
                    className="border-b border-slate-800 hover:bg-slate-800/40"
                  >

                    <td className="px-4 py-3 text-white font-semibold">
                      {row.district}
                    </td>

                    <td className="px-4 py-3 text-slate-300">
                      {row.disease ||
                        "Dengue"}
                    </td>

                    <td className="px-4 py-3 text-cyan-400">
                      {(
                        (row.surge_probability ||
                          0) *
                        100
                      ).toFixed(1)}
                      %
                    </td>

                    <td className="px-4 py-3 text-slate-300">
                      {row.expected_cases_2w ||
                        0}
                    </td>

                    <td className="px-4 py-3">
                      <RiskBadge
                        level={
                          row.risk_level
                        }
                      />
                    </td>

                    <td className="px-4 py-3 text-slate-300">
                      {row.year}
                    </td>

                    <td className="px-4 py-3 text-slate-300">
                      {
                        row.week_number
                      }
                    </td>

                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 text-slate-400"
                >
                  No Prediction Data
                  Available
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}