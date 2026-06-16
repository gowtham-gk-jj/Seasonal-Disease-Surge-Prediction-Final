import React, {
  useEffect,
  useState
} from "react";

import {
  FaMapMarkedAlt,
  FaExclamationTriangle
} from "react-icons/fa";

import {
  getMapData
} from "../services/api";

const TamilNaduOutbreakMap = ({
  onDistrictSelect
}) => {

  const [districts, setDistricts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedDistrict,
    setSelectedDistrict] =
    useState(null);

  const [error,
    setError] =
    useState("");

  useEffect(() => {

    fetchMapData();

  }, []);

  const fetchMapData =
    async () => {

      try {

        setLoading(true);

        const response =
          await getMapData();

        if (
          response &&
          response.success &&
          response.data
        ) {

          const sortedData =
            [...response.data].sort(
              (a, b) =>
                (b.risk_score || 0) -
                (a.risk_score || 0)
            );

          setDistricts(
            sortedData
          );

          if (
            sortedData.length > 0
          ) {

            setSelectedDistrict(
              sortedData[0]
            );

            if (
              onDistrictSelect
            ) {

              onDistrictSelect(
                sortedData[0]
                  .district
              );

            }

          }

        }

      } catch (err) {

        console.error(
          "Map Data Error:",
          err
        );

        setError(
          "Unable to load district risk data."
        );

      } finally {

        setLoading(false);

      }

    };

  const getRiskColor =
    (riskLevel) => {

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
          return "#94a3b8";

      }

    };

  const getRiskBackground =
    (riskLevel) => {

      switch (
        riskLevel?.toUpperCase()
      ) {

        case "HIGH":
          return "#fee2e2";

        case "MEDIUM":
          return "#fef3c7";

        case "LOW":
          return "#dcfce7";

        default:
          return "#e2e8f0";

      }

    };

  const handleDistrictClick =
    (district) => {

      setSelectedDistrict(
        district
      );

      if (
        onDistrictSelect
      ) {

        onDistrictSelect(
          district.district
        );

      }

    };

  if (loading) {

    return (

      <div
        style={{
          background:
            "#ffffff",
          padding:
            "25px",
          borderRadius:
            "16px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.08)"
        }}
      >

        <div
          style={{
            textAlign:
              "center",
            padding:
              "40px"
          }}
        >

          <h3>
            Loading District
            Risk Data...
          </h3>

        </div>

      </div>

    );

  }

  return (

    <div
      style={{
        background:
          "#ffffff",
        padding:
          "25px",
        borderRadius:
          "16px",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.08)"
      }}
    >

      {/* Header */}

      <div
        style={{
          display: "flex",
          alignItems:
            "center",
          gap: "10px",
          marginBottom:
            "20px"
        }}
      >

        <FaMapMarkedAlt
          size={24}
          color="#2563eb"
        />

        <h2
          style={{
            margin: 0
          }}
        >
          Tamil Nadu Disease
          Risk Dashboard
        </h2>

      </div>

      {/* Error */}

      {error && (

        <div
          style={{
            background:
              "#fee2e2",
            color:
              "#dc2626",
            padding:
              "12px",
            borderRadius:
              "10px",
            marginBottom:
              "15px"
          }}
        >

          {error}

        </div>

      )}

      {/* Legend */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom:
            "20px",
          flexWrap:
            "wrap"
        }}
      >

        <span>
          🟢 Low Risk
        </span>

        <span>
          🟡 Medium Risk
        </span>

        <span>
          🔴 High Risk
        </span>

      </div>

      {/* District Grid */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(180px,1fr))",
          gap: "15px"
        }}
      >

        {districts.map(
          (
            district,
            index
          ) => (

            <div
              key={index}
              onClick={() =>
                handleDistrictClick(
                  district
                )
              }
              style={{
                cursor:
                  "pointer",

                padding:
                  "15px",

                borderRadius:
                  "14px",

                background:
                  getRiskBackground(
                    district.risk_level
                  ),

                border:
                  selectedDistrict
                    ?.district ===
                  district.district
                    ? `3px solid ${getRiskColor(
                        district.risk_level
                      )}`
                    : "1px solid #e5e7eb",

                transition:
                  "0.3s ease"
              }}
            >

              <h4
                style={{
                  margin:
                    "0 0 10px",
                  color:
                    "#1e293b"
                }}
              >

                {
                  district.district
                }

              </h4>

              <div
                style={{
                  color:
                    getRiskColor(
                      district.risk_level
                    ),
                  fontWeight:
                    "bold",
                  marginBottom:
                    "10px"
                }}
              >

                {
                  district.risk_level
                }

              </div>

              <div>

                Risk Score

                <h3
                  style={{
                    margin:
                      "5px 0"
                  }}
                >

                  {Number(
                    district.risk_score || 0
                  ).toFixed(2)}

                </h3>

              </div>

            </div>

          )
        )}

      </div>

      {/* Selected District */}

      {selectedDistrict && (

        <div
          style={{
            marginTop:
              "25px",
            padding:
              "20px",
            background:
              "#f8fafc",
            borderRadius:
              "12px",
            border:
              "1px solid #e2e8f0"
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems:
                "center",
              gap: "10px"
            }}
          >

            <FaExclamationTriangle
              color={getRiskColor(
                selectedDistrict.risk_level
              )}
            />

            <h3
              style={{
                margin: 0
              }}
            >

              {
                selectedDistrict.district
              }

            </h3>

          </div>

          <p>

            <strong>
              Risk Level:
            </strong>

            {" "}

            {
              selectedDistrict.risk_level
            }

          </p>

          <p>

            <strong>
              Risk Score:
            </strong>

            {" "}

            {Number(
              selectedDistrict.risk_score || 0
            ).toFixed(2)}

          </p>

        </div>

      )}

    </div>

  );

};

export default TamilNaduOutbreakMap;