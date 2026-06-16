import React, { useEffect, useState } from "react";
import { getDashboardSummary } from "../services/dashboardService";
import "../styles/dashboard.css";
import TamilNaduOutbreakMap from "../components/TamilNaduOutbreakMap";
import ValidationScorecard from "../components/ValidationScorecard";
import ShapFeatureChart from "../components/ShapFeatureChart";
import DataSourcePanel from "../components/DataSourcePanel";
import ASHAAlertGenerator from "../components/ASHAAlertGenerator";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [topRiskDistricts, setTopRiskDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [
  selectedDistrict,
  setSelectedDistrict
] = useState(
  "Chennai"
);

  useEffect(() => {
    loadDashboard();
    const timer = setInterval(
      loadDashboard,
      30000
    );
    return () => clearInterval(timer);
  }, []);

  const loadDashboard = async () => {
  try {
    setLoading(true);
    setError("");

    const response =
      await getDashboardSummary();

    console.log(
      "Dashboard Response:",
      response
    );

    if (
      response &&
      response.summary
    ) {
      console.log(
        "Summary Data:",
        response.summary
      );

      setSummary({
        totalDistricts:
          response.summary
            .totalDistricts || 0,

        totalPredictions:
          response.summary
            .totalPredictions || 0,

        highRiskCount:
          response.summary
            .highRiskCount || 0,

        mediumRiskCount:
          response.summary
            .mediumRiskCount || 0,

        lowRiskCount:
          response.summary
            .lowRiskCount || 0,

        last_updated:
          response.summary
            .last_updated,
      });

      setTopRiskDistricts(
        response.top_risk_districts ||
          []
      );
    } else {
      setError(
        "No dashboard data received"
      );
    }
  } catch (err) {
    console.error(err);

    setError(
      "Failed to load dashboard"
    );
  } finally {
    setLoading(false);
  }
};


  const getRiskClass = (risk) => {

    switch (

      risk?.toUpperCase()

    ) {

      case "HIGH":

        return "risk-high";



      case "MEDIUM":

        return "risk-medium";



      default:

        return "risk-low";

    }

  };



  if (loading) {

    return (

      <div className="dashboard-loading">

        Loading Dashboard...

      </div>

    );

  }



  if (error) {

    return (

      <div className="dashboard-error">

        {error}

      </div>

    );

  }



 return (
  <div className="dashboard-container">

    {/* Header */}

    <div className="dashboard-header">

      <div>

        <h1>
          Seasonal Disease Surge Prediction System
        </h1>

        <p>
          AI Powered Early Warning &
          Explainable Disease Analytics
        </p>

      </div>

      <button
        onClick={loadDashboard}
        className="refresh-btn"
      >
        Refresh
      </button>

    </div>

    {/* Statistics */}

    <div className="stats-grid">

      <div className="stat-card blue">
        <h4>Total Districts</h4>
        <h2>
          {summary?.totalDistricts || 0}
        </h2>
      </div>

      <div className="stat-card cyan">
        <h4>Total Predictions</h4>
        <h2>
          {summary?.totalPredictions || 0}
        </h2>
      </div>

      <div className="stat-card red">
        <h4>High Risk</h4>
        <h2>
          {summary?.highRiskCount || 0}
        </h2>
      </div>

      <div className="stat-card orange">
        <h4>Medium Risk</h4>
        <h2>
          {summary?.mediumRiskCount || 0}
        </h2>
      </div>

      <div className="stat-card green">
        <h4>Low Risk</h4>
        <h2>
          {summary?.lowRiskCount || 0}
        </h2>
      </div>

    </div>

    {/* TN Map */}

    <div
      style={{
        marginTop: "25px"
      }}
    >

      <TamilNaduOutbreakMap
        onDistrictSelect={
          setSelectedDistrict
        }
      />

    </div>

    {/* Validation + SHAP */}

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(500px,1fr))",
        gap: "20px",
        marginTop: "25px"
      }}
    >

      <ValidationScorecard />

      <ShapFeatureChart
        selectedDistrict={
          selectedDistrict
        }
      />

    </div>

    {/* Top Risk Table */}

    <div
      className="section-card"
      style={{
        marginTop: "25px"
      }}
    >

      <h2>
        Top Risk Districts
      </h2>

      <table className="custom-table">

        <thead>

          <tr>
            <th>District</th>
            <th>Disease</th>
            <th>Risk</th>
            <th>Probability</th>
            <th>Expected Cases</th>
          </tr>

        </thead>

        <tbody>

          {topRiskDistricts.length >
          0 ? (

            topRiskDistricts.map(
              (
                district,
                index
              ) => (

                <tr key={index}>

                  <td>
                    {
                      district.district
                    }
                  </td>

                  <td>
                    {
                      district.disease
                    }
                  </td>

                  <td>

                    <span
                      className={`risk-badge ${getRiskClass(
                        district.risk_level
                      )}`}
                    >

                      {
                        district.risk_level
                      }

                    </span>

                  </td>

                  <td>

                    {(
                      district.surge_probability *
                      100
                    ).toFixed(
                      0
                    )}
                    %

                  </td>

                  <td>

                    {
                      district.expected_cases_2w
                    }

                  </td>

                </tr>

              )
            )

          ) : (

            <tr>

              <td colSpan="5">
                No Data Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

    {/* Sources + Alerts */}

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(500px,1fr))",
        gap: "20px",
        marginTop: "25px"
      }}
    >

      <DataSourcePanel />

      <ASHAAlertGenerator
        selectedDistrict={
          selectedDistrict
        }
      />

    </div>

    {/* Footer */}

    <div
      className="last-update"
    >

      Last Updated :

      {" "}

      {summary?.last_updated
        ? new Date(
            summary.last_updated
          ).toLocaleString()
        : "N/A"}

    </div>

    <div
      className="data-source-footer"
    >

      IMD |
      ERA5 |
      IDSP |
      EMRI 108 |
      PHC Records

    </div>

  </div>
);

};

export default Dashboard;