import React, { useEffect, useState } from "react";
import { getDashboardSummary } from "../services/dashboardService";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [topRiskDistricts, setTopRiskDistricts] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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



      <div className="dashboard-header">

        <div>

          <h1>

            Disease Surge Dashboard

          </h1>



          <p>

            AI Powered Disease Prediction &

            Monitoring

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



      {/* Risk Breakdown */}



      <div className="section-card">



        <h2>Risk Breakdown</h2>



        <table className="custom-table">



          <thead>

            <tr>

              <th>Risk Level</th>

              <th>Count</th>

            </tr>

          </thead>



          <tbody>



            <tr>

              <td>🔴 High</td>

              <td>

                {summary?.highRiskCount || 0}

              </td>

            </tr>



            <tr>

              <td>🟠 Medium</td>

              <td>

                {summary?.mediumRiskCount || 0}

              </td>

            </tr>



            <tr>

              <td>🟢 Low</td>

              <td>

                {summary?.lowRiskCount || 0}

              </td>

            </tr>



          </tbody>



        </table>



      </div>



      {/* Top Risk Districts */}



      <div className="section-card">



        <h2>Top Risk Districts</h2>



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



            {topRiskDistricts.length > 0 ? (

              topRiskDistricts.map(

                (district, index) => (

                  <tr

                    key={`${district.district}-${district.disease}-${index}`}

                  >

                    <td>

                      {district.district}

                    </td>



                    <td>

                      {district.disease}

                    </td>



                    <td>

                      <span

                        className={`risk-badge ${getRiskClass(

                          district.risk_level

                        )}`}

                      >

                        {district.risk_level}

                      </span>

                    </td>



                    <td>

                      {(

                        (district.surge_probability || 0) *

                        100

                      ).toFixed(0)}

                      %

                    </td>



                    <td>

                      {district.expected_cases_2w || 0}

                    </td>

                  </tr>

                )

              )

            ) : (

              <tr>

                <td colSpan="5">

                  No Risk Data Found

                </td>

              </tr>

            )}



          </tbody>



        </table>



      </div>



      <div className="last-update">

        Last Updated:

        {" "}

        {summary?.last_updated

          ? new Date(

              summary.last_updated

            ).toLocaleString()

          : "N/A"}

      </div>



      <div className="data-source-footer">

        Data Sources:

        IDSP (Official) |

        IMD (Official) |

        EMRI (Prototype) |

        PHC OPD (Prototype)

      </div>



    </div>

  );

};



export default Dashboard;

