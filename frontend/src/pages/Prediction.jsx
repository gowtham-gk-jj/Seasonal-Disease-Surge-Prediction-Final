
import React, { useMemo, useState } from "react";
import RiskTable from "../components/tables/RiskTable";

export default function Prediction({
  data = [],
}) {
  const [search, setSearch] =
    useState("");

  const [riskFilter, setRiskFilter] =
    useState("ALL");

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.district
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.disease
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesRisk =
        riskFilter === "ALL"
          ? true
          : item.risk_level ===
            riskFilter;

      return (
        matchesSearch &&
        matchesRisk
      );
    });
  }, [data, search, riskFilter]);

  const highRiskCount =
    filteredData.filter(
      (item) =>
        item.risk_level === "HIGH"
    ).length;

  const mediumRiskCount =
    filteredData.filter(
      (item) =>
        item.risk_level === "MEDIUM"
    ).length;

  const lowRiskCount =
    filteredData.filter(
      (item) =>
        item.risk_level === "LOW"
    ).length;

  return (
    <div className="space-y-6 p-6">

      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <h1 className="text-3xl font-bold text-white">
          Disease Predictions
        </h1>

        <div className="text-sm text-slate-400">
          Total Records:
          {" "}
          {filteredData.length}
        </div>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-slate-400">
            Total Predictions
          </p>

          <h2 className="text-3xl font-bold text-white">
            {filteredData.length}
          </h2>
        </div>

        <div className="bg-red-900 rounded-xl p-4">
          <p className="text-red-200">
            High Risk
          </p>

          <h2 className="text-3xl font-bold text-white">
            {highRiskCount}
          </h2>
        </div>

        <div className="bg-yellow-700 rounded-xl p-4">
          <p className="text-yellow-100">
            Medium Risk
          </p>

          <h2 className="text-3xl font-bold text-white">
            {mediumRiskCount}
          </h2>
        </div>

        <div className="bg-green-700 rounded-xl p-4">
          <p className="text-green-100">
            Low Risk
          </p>

          <h2 className="text-3xl font-bold text-white">
            {lowRiskCount}
          </h2>
        </div>

      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="Search District or Disease..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="flex-1 px-4 py-2 rounded-lg bg-slate-900 text-white border border-slate-700"
        />

        <select
          value={riskFilter}
          onChange={(e) =>
            setRiskFilter(
              e.target.value
            )
          }
          className="px-4 py-2 rounded-lg bg-slate-900 text-white border border-slate-700"
        >
          <option value="ALL">
            All Risk Levels
          </option>

          <option value="HIGH">
            High Risk
          </option>

          <option value="MEDIUM">
            Medium Risk
          </option>

          <option value="LOW">
            Low Risk
          </option>
        </select>

      </div>

      {/* Table */}
      <RiskTable
        title="Disease Prediction Results"
        data={filteredData}
      />

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="bg-slate-800 rounded-xl p-8 text-center text-slate-400">
          No prediction records found.
        </div>
      )}

    </div>
  );
}

