

import React, { useEffect, useState } from "react";

import { getDashboardSummary } from "../services/dashboardService";

import TamilNaduChoropleth from "../components/TamilNaduChoropleth";

import "../styles/dashboard.css";



const Dashboard = () => {

  const [summary, setSummary] = useState({

    totalDistricts: 0,

    totalPredictions: 0,

    highRiskCount: 0,

    mediumRiskCount: 0,

    lowRiskCount: 0,

    last_updated: null,

  });



  const [allDistricts, setAllDistricts] = useState([]);

  const [topRiskDistricts, setTopRiskDistricts] =

    useState([]);



  const [loading, setLoading] =

    useState(true);



  const [error, setError] =

    useState("");



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



      if (!response?.success) {

        throw new Error(

          "Failed to load dashboard"

        );

      }



      setSummary({

        totalDistricts:

          response.summary?.totalDistricts || 0,



        totalPredictions:

          response.summary?.totalPredictions || 0,



        highRiskCount:

          response.summary?.highRiskCount || 0,



        mediumRiskCount:

          response.summary?.mediumRiskCount || 0,



        lowRiskCount:

          response.summary?.lowRiskCount || 0,



        last_updated:

          response.summary?.last_updated || null,

      });



      setAllDistricts(

        response.all_districts || []

      );



      setTopRiskDistricts(

        response.top_risk_districts || []

      );

    } catch (err) {

      console.error(

        "Dashboard Error:",

        err

      );



      setError(

        err.message ||

          "Failed to load dashboard"

      );

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    loadDashboard();



    const interval =

      setInterval(

        loadDashboard,

        30000

      );



    return () =>

      clearInterval(interval);

  }, []);



  const getRiskClass = (risk) => {

    switch (

      String(risk || "").toUpperCase()

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

            Seasonal Disease Surge Prediction

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



      <div className="stats-grid">



        <div className="stat-card blue">

          <h4>Total Districts</h4>

          <h2>

            {summary.totalDistricts}

          </h2>

        </div>



        <div className="stat-card cyan">

          <h4>Total Predictions</h4>

          <h2>

            {summary.totalPredictions}

          </h2>

        </div>



        <div className="stat-card red">

          <h4>High Risk</h4>

          <h2>

            {summary.highRiskCount}

          </h2>

        </div>



        <div className="stat-card orange">

          <h4>Medium Risk</h4>

          <h2>

            {summary.mediumRiskCount}

          </h2>

        </div>



        <div className="stat-card green">

          <h4>Low Risk</h4>

          <h2>

            {summary.lowRiskCount}

          </h2>

        </div>



      </div>



      <div

        style={{

          display: "grid",

          gridTemplateColumns:

            "1.2fr 1fr",

          gap: "20px",

          marginTop: "25px",

        }}

      >

        <div className="section-card">

          <h2

            style={{

              marginBottom: "15px",

            }}

          >

            Tamil Nadu Risk Map

          </h2>



          <TamilNaduChoropleth

            districtsData={

              allDistricts

            }

          />

        </div>



        <div className="section-card">

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

                <th>Cases</th>

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

                        {district.disease ||

                          "Dengue"}

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

                          Number(

                            district.surge_probability || 0

                          ) * 100

                        ).toFixed(1)}

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

                    No Data Available

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>



      <div

        className="last-update"

        style={{

          marginTop: "25px",

        }}

      >

        Last Updated :

        {" "}

        {summary.last_updated

          ? new Date(

              summary.last_updated

            ).toLocaleString()

          : "N/A"}

      </div>



      <div className="data-source-footer">

        IMD | ERA5 | IDSP | EMRI 108 |

        PHC Records

      </div>

    </div>

  );

};



export default Dashboard;
