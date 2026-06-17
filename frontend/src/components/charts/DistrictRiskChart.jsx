import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

export default function DistrictRiskChart({
  data = [],
}) {
  const chartData = useMemo(() => {
    const grouped = {};

    data.forEach((item) => {
      const district = item.district;

      if (!district) return;

      const probability =
        Number(item.surge_probability) || 0;

      if (!grouped[district]) {
        grouped[district] = {
          district,
          surge_probability: probability,
          risk_level:
            item.risk_level || "LOW",
        };
      } else {
        if (
          probability >
          grouped[district]
            .surge_probability
        ) {
          grouped[district] = {
            district,
            surge_probability:
              probability,
            risk_level:
              item.risk_level || "LOW",
          };
        }
      }
    });

    return Object.values(grouped)
      .sort(
        (a, b) =>
          b.surge_probability -
          a.surge_probability
      )
      .slice(0, 15);
  }, [data]);

  const getColor = (
    riskLevel
  ) => {
    switch (
      riskLevel?.toUpperCase()
    ) {
      case "HIGH":
        return "#ef4444";

      case "MEDIUM":
        return "#f59e0b";

      case "LOW":
        return "#22c55e";

      default:
        return "#64748b";
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl p-4">
      <h2 className="text-white text-2xl font-bold mb-1">
        District Risk Ranking
      </h2>

      <p className="text-slate-400 text-sm mb-4">
        Ranked by Surge Probability
      </p>

      <ResponsiveContainer
        width="100%"
        height={520}
      >
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 10,
            right: 30,
            left: 60,
            bottom: 10,
          }}
        >
          <CartesianGrid
            stroke="#334155"
            strokeDasharray="3 3"
          />

          <XAxis
            type="number"
            domain={[0, 1]}
            tickFormatter={(v) =>
              `${Math.round(
                v * 100
              )}%`
            }
            stroke="#94a3b8"
          />

          <YAxis
            type="category"
            dataKey="district"
            width={140}
            stroke="#cbd5e1"
          />

          <Tooltip
            contentStyle={{
              background:
                "#0f172a",
              border:
                "1px solid #334155",
              borderRadius: "10px",
              color: "#fff",
            }}
            formatter={(
              value
            ) => [
              `${Math.round(
                value * 100
              )}%`,
              "Surge Probability",
            ]}
            labelStyle={{
              color: "#fff",
            }}
          />

          <Bar
            dataKey="surge_probability"
            radius={[
              0,
              6,
              6,
              0,
            ]}
          >
            {chartData.map(
              (
                entry,
                index
              ) => (
                <Cell
                  key={index}
                  fill={getColor(
                    entry.risk_level
                  )}
                />
              )
            )}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}