import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  FaBrain,
  FaSearch,
  FaLightbulb,
} from "react-icons/fa";

import { getDistrictShap } from "../services/api";

const ShapFeatureChart = ({
  selectedDistrict = "Chennai",
}) => {
  const [shapData, setShapData] = useState([]);
  const [district, setDistrict] =
    useState(selectedDistrict);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (selectedDistrict) {
      loadShapData(selectedDistrict);
    }
  }, [selectedDistrict]);

  const loadShapData = async (
    districtName
  ) => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getDistrictShap(
          districtName
        );

      if (
        response?.success &&
        Array.isArray(
          response?.data?.features
        )
      ) {
        const sorted = [
          ...response.data.features,
        ].sort(
          (a, b) =>
            b.impact - a.impact
        );

        setDistrict(
          response?.data?.district ||
            districtName
        );

        setShapData(sorted);
      } else {
        setShapData([]);
        setError(
          "No SHAP data available"
        );
      }
    } catch (err) {
      console.error(
        "SHAP API Error:",
        err
      );

      setError(
        "Unable to load SHAP data"
      );

      setShapData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (district?.trim()) {
      loadShapData(
        district.trim()
      );
    }
  };

  const topFeature =
    shapData?.[0]?.feature;

  const secondFeature =
    shapData?.[1]?.feature;

  const thirdFeature =
    shapData?.[2]?.feature;

  return (
    <div
      style={{
        background: "#0f172a",
        color: "#fff",
        padding: "25px",
        borderRadius: "16px",
        border:
          "1px solid #1e293b",
        boxShadow:
          "0 10px 25px rgba(0,0,0,0.25)",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "25px",
        }}
      >
        <FaBrain
          size={24}
          color="#7c3aed"
        />

        <h2
          style={{
            margin: 0,
          }}
        >
          SHAP Feature Breakdown
        </h2>
      </div>

      {/* Search */}

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "25px",
        }}
      >
        <input
          type="text"
          value={district}
          onChange={(e) =>
            setDistrict(
              e.target.value
            )
          }
          placeholder="Search District..."
          onKeyDown={(e) =>
            e.key === "Enter" &&
            handleSearch()
          }
          style={{
            flex: 1,
            padding: "14px 18px",
            background:
              "#1e293b",
            color: "#fff",
            border:
              "1px solid #334155",
            borderRadius: "10px",
            outline: "none",
            fontSize: "15px",
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            background:
              "#2563eb",
            color: "#fff",
            border: "none",
            padding:
              "14px 20px",
            borderRadius:
              "10px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          <FaSearch />
        </button>
      </div>

      {/* Error */}

      {error && (
        <div
          style={{
            background:
              "#7f1d1d",
            color: "#fff",
            padding: "12px",
            borderRadius: "8px",
            marginBottom:
              "20px",
          }}
        >
          {error}
        </div>
      )}

      {/* Loading */}

      {loading ? (
        <h3>
          Loading SHAP Data...
        </h3>
      ) : (
        <>
          <h3
            style={{
              marginBottom:
                "20px",
            }}
          >
            District:{" "}
            {district}
          </h3>

          {/* Chart */}

          <div
            style={{
              width: "100%",
              height: 450,
            }}
          >
            {shapData.length >
            0 ? (
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart
                  data={shapData}
                  layout="vertical"
                  margin={{
                    top: 20,
                    right: 30,
                    left: 80,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                  />

                  <XAxis
                    type="number"
                    stroke="#cbd5e1"
                  />

                  <YAxis
                    dataKey="feature"
                    type="category"
                    width={180}
                    stroke="#cbd5e1"
                  />

                  <Tooltip
                    contentStyle={{
                      background:
                        "#1e293b",
                      border:
                        "1px solid #334155",
                      borderRadius:
                        "10px",
                      color: "#fff",
                    }}
                  />

                  <Bar
                    dataKey="impact"
                    fill="#7c3aed"
                    radius={[
                      0, 6, 6, 0,
                    ]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div
                style={{
                  height: "100%",
                  display:
                    "flex",
                  justifyContent:
                    "center",
                  alignItems:
                    "center",
                  border:
                    "1px dashed #334155",
                  borderRadius:
                    "12px",
                }}
              >
                No SHAP data
                available
              </div>
            )}
          </div>

          {/* Top Drivers */}

          {shapData.length >
            0 && (
            <div
              style={{
                marginTop:
                  "25px",
                background:
                  "#1e293b",
                padding:
                  "20px",
                borderRadius:
                  "12px",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                }}
              >
                Top Drivers
              </h3>

              <ol>
                <li>
                  {topFeature}
                </li>
                <li>
                  {secondFeature}
                </li>
                <li>
                  {thirdFeature}
                </li>
              </ol>
            </div>
          )}

          {/* AI Explanation */}

          {shapData.length >
            0 && (
            <div
              style={{
                marginTop:
                  "20px",
                background:
                  "#166534",
                border:
                  "1px solid #22c55e",
                padding:
                  "20px",
                borderRadius:
                  "12px",
              }}
            >
              <div
                style={{
                  display:
                    "flex",
                  alignItems:
                    "center",
                  gap: "10px",
                  marginBottom:
                    "10px",
                }}
              >
                <FaLightbulb />

                <strong>
                  AI
                  Explanation
                </strong>
              </div>

              <p
                style={{
                  margin: 0,
                }}
              >
                The
                predicted
                disease surge
                in{" "}
                <strong>
                  {
                    district
                  }
                </strong>{" "}
                is primarily
                driven by{" "}
                <strong>
                  {
                    topFeature
                  }
                </strong>
                ,{" "}
                <strong>
                  {
                    secondFeature
                  }
                </strong>{" "}
                and{" "}
                <strong>
                  {
                    thirdFeature
                  }
                </strong>
                . These
                factors
                contributed
                the most to
                the model's
                outbreak
                prediction.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShapFeatureChart;