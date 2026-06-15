import { useState, useEffect } from "react";
import dashboardService from "../services/dashboardService";

export default function useDashboard() {
  const [stats, setStats] = useState(null);
  const [performance, setPerformance] = useState([]);
  const [diseaseSummary, setDiseaseSummary] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [
        statsData,
        summaryData,
        performanceData,
      ] = await Promise.all([
        dashboardService.getDashboardStats(),
        dashboardService.getDiseaseSummary(),
        dashboardService.getModelPerformance(),
      ]);

      setStats(statsData);
      setDiseaseSummary(summaryData);
      setPerformance(performanceData);

      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    stats,
    diseaseSummary,
    performance,
    loading,
    error,
    refreshDashboard: fetchDashboardData,
  };
}