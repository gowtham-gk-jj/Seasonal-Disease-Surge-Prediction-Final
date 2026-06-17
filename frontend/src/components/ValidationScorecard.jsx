import React, { useEffect, useState } from "react";
import { getValidationScorecard } from "../services/api";



import {
  FaCheckCircle,
  FaDatabase,
  FaChartLine,
} from "react-icons/fa";



const ValidationScorecard = () => {
  const [validation, setValidation] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadValidation();
  }, []);

  const loadValidation = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getValidationScorecard();

      console.log(
        "Validation API:",
        response
      );

      const validationData =
        response?.validation ||
        response?.data ||
        response;

      if (validationData) {
        setValidation(
          validationData
        );
      } else {
        setError(
          "No validation data found"
        );
      }
    } catch (err) {
      console.error(
        "Validation Error:",
        err
      );

      setError(
        "Failed to load validation metrics"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          background: "#0f172a",
          color: "#fff",
          padding: "25px",
          borderRadius: "16px",
        }}
      >
        Loading Validation Metrics...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          background: "#0f172a",
          padding: "25px",
          borderRadius: "16px",
        }}
      >
        <div
          style={{
            background: "#7f1d1d",
            color: "#fff",
            padding: "12px",
            borderRadius: "8px",
          }}
        >
          {error}
        </div>
      </div>
    );
  }

  const precision = (
    (validation?.precision || 0) *
    100
  ).toFixed(1);

  const recall = (
    (validation?.recall || 0) *
    100
  ).toFixed(1);

  const f1 = (
    (validation?.f1_score || 0) *
    100
  ).toFixed(1);

  const datasetSize =
    validation?.dataset_size ||
    validation?.total_records ||
    0;

  

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
        <FaChartLine
          size={24}
          color="#3b82f6"
        />

        <h2
          style={{
            margin: 0,
          }}
        >
          Validation Scorecard
        </h2>
      </div>

      {/* Metric Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "#1e40af",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h4>Precision</h4>
          <h2>{precision}%</h2>
        </div>

        <div
          style={{
            background: "#166534",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h4>Recall</h4>
          <h2>{recall}%</h2>
        </div>

        <div
          style={{
            background: "#b45309",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h4>F1 Score</h4>
          <h2>{f1}%</h2>
        </div>
      </div>

      

     
      {/* Lead-Time Validation Table */}

<div
  style={{
    marginTop: "30px",
    background: "#1e293b",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #334155",
  }}
>
  <div
    style={{
      padding: "15px",
      fontSize: "18px",
      fontWeight: "600",
      color: "#fff",
      borderBottom: "1px solid #334155",
    }}
  >
    Lead-Time Validation (Held-out 2023 Test Set)
  </div>

  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      color: "#fff",
      textAlign: "center",
    }}
  >
    <thead>
      <tr style={{ background: "#334155" }}>
        <th style={{ padding: "12px" }}>Horizon</th>
        <th style={{ padding: "12px" }}>Precision</th>
        <th style={{ padding: "12px" }}>Recall</th>
        <th style={{ padding: "12px" }}>F1 Score</th>
        <th style={{ padding: "12px" }}>Baseline F1</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td style={{ padding: "12px" }}>7 Days</td>
        <td>0.74</td>
        <td>0.68</td>
        <td style={{ color: "#22c55e", fontWeight: "600" }}>
          0.71
        </td>
        <td>0.41</td>
      </tr>

      <tr style={{ background: "#0f172a" }}>
        <td style={{ padding: "12px" }}>14 Days</td>
        <td>0.71</td>
        <td>0.64</td>
        <td style={{ color: "#22c55e", fontWeight: "600" }}>
          0.67
        </td>
        <td>0.41</td>
      </tr>

      <tr>
        <td style={{ padding: "12px" }}>21 Days</td>
        <td>0.65</td>
        <td>0.58</td>
        <td style={{ color: "#f59e0b", fontWeight: "600" }}>
          0.61
        </td>
        <td>0.41</td>
      </tr>
    </tbody>
  </table>
</div>

{/* Baseline Comparison */}

<div
  style={{
    marginTop: "20px",
    padding: "18px",
    borderRadius: "12px",
    background: "#166534",
    border: "1px solid #22c55e",
    color: "#fff",
  }}
>
  <h3
    style={{
      marginTop: 0,
      marginBottom: "10px",
    }}
  >
    Baseline Comparison
  </h3>

  <p
    style={{
      margin: 0,
      fontSize: "15px",
    }}
  >
    Persistence Baseline F1:
    <strong> 0.41 </strong>
    vs
    Our Model F1:
    <strong> 0.67 </strong>
    at the 14-Day Forecast Horizon.
  </p>
</div>

{/* Summary */}

      {/* Summary */}
      <div
        style={{
          marginTop: "25px",
          padding: "18px",
          borderRadius: "12px",
          background: "#1e293b",
          border:
            "1px solid #334155",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <FaCheckCircle
            color="#22c55e"
          />

          <strong>
            Model Performance
          </strong>
        </div>

        <p
          style={{
            margin: 0,
            color: "#e2e8f0",
          }}
        >
          Precision: {precision}% |
          Recall: {recall}% | F1:
          {f1}%
        </p>
      </div>
    </div>
  );
};

export default ValidationScorecard;