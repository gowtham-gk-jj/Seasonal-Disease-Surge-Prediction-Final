import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import RiskTable from "../components/tables/RiskTable";
import { getDashboardSummary } from "../services/dashboardService";

export default function Prediction() {
  const [data, setData] = useState([]);
  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [riskFilter, setRiskFilter] =
    useState("ALL");

  useEffect(() => {
    loadPredictions();
  }, []);

  const loadPredictions = async () => {
    try {
      setLoading(true);

      const response =
        await getDashboardSummary();

      const districts =
        response?.all_districts || [];

      setData(districts);
    } catch (error) {
      console.error(
        "Prediction Load Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        (item?.district || "")
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        (item?.disease || "")
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesRisk =
        riskFilter === "ALL"
          ? true
          : item?.risk_level ===
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
        item?.risk_level === "HIGH"
    ).length;

  const mediumRiskCount =
    filteredData.filter(
      (item) =>
        item?.risk_level === "MEDIUM"
    ).length;

  const lowRiskCount =
    filteredData.filter(
      (item) =>
        item?.risk_level === "LOW"
    ).length;

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading Predictions...
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Disease Predictions
          </h1>

          <p className="text-slate-400 mt-1">
            Seasonal Disease Surge Prediction Results
          </p>
        </div>

        <div className="text-sm text-slate-400">
          Total Records{" "}
          <span className="font-semibold text-white">
            {filteredData.length}
          </span>
        </div>

      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-slate-400">
            Total Predictions
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {filteredData.length}
          </h2>
        </div>

        <div className="bg-red-900 rounded-xl p-4">
          <p className="text-red-200">
            High Risk
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {highRiskCount}
          </h2>
        </div>

        <div className="bg-yellow-700 rounded-xl p-4">
          <p className="text-yellow-100">
            Medium Risk
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {mediumRiskCount}
          </h2>
        </div>

        <div className="bg-green-700 rounded-xl p-4">
          <p className="text-green-100">
            Low Risk
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
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

      {/* Prediction Table */}

      <RiskTable
        title="Disease Prediction Results"
        data={filteredData}
      />

      {filteredData.length === 0 && (
        <div className="bg-slate-800 rounded-xl p-8 text-center">

          <h3 className="text-lg font-semibold text-white">
            No Prediction Records Found
          </h3>

          <p className="text-slate-400 mt-2">
            Try changing the search text
            or risk filter.
          </p>

        </div>
      )}

    </div>
  );
}