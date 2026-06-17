import React, { useState, useEffect } from "react";
import axios from "axios";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import DistrictAnalysis from "./pages/DistrictAnalysis";
import ResourcePlanning from "./pages/ResourcePlanning";
import Alerts from "./components/ASHAAlertGenerator";
import About from "./pages/About";

/* NEW COMPONENTS */
import ValidationScorecard from "./components/ValidationScorecard";
import ShapFeatureChart from "./components/ShapFeatureChart";
import DataSourcePanel from "./components/DataSourcePanel";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [time, setTime] = useState(new Date());

  const [predictionData, setPredictionData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    loadPredictions();
  }, []);

  const loadPredictions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/predictions"
      );

      setPredictionData(response.data.data || []);
    } catch (error) {
      console.error(
        "Prediction Load Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const highCount = predictionData.filter(
    (item) => item.risk_level === "HIGH"
  ).length;

  const medCount = predictionData.filter(
    (item) => item.risk_level === "MEDIUM"
  ).length;

  const renderPage = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;

      case "predictions":
        return (
          <Prediction
            data={predictionData}
          />
        );

      case "district-analysis":
        return (
          <DistrictAnalysis
            data={predictionData}
          />
        );

      case "validation-scorecard":
        return <ValidationScorecard />;

      case "shap-analysis":
        return <ShapFeatureChart />;

      case "resource-planning":
        return (
          <ResourcePlanning
            data={predictionData}
          />
        );

      case "data-sources":
        return <DataSourcePanel />;

      case "alerts":
        return (
          <Alerts
            data={predictionData}
          />
        );

      case "about":
        return <About />;

      default:
        return <Dashboard />;
    }
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "50px",
          textAlign: "center",
          fontSize: "22px",
        }}
      >
        Loading Disease Data...
      </div>
    );
  }

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      time={time}
      totalPredictions={
        predictionData.length
      }
      highRisk={highCount}
      mediumRisk={medCount}
    >
      {renderPage()}
    </DashboardLayout>
  );
}

export default App;