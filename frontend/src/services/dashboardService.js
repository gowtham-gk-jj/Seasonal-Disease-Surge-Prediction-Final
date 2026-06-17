import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// =====================================
// Dashboard Summary
// =====================================
export const getDashboardSummary = async () => {
  try {
    const response = await api.get(
      "/predictions/dashboard-summary"
    );

    console.log(
      "Dashboard Summary API:",
      response.data
    );

    return {
      success: response.data.success,

      summary:
        response.data.summary || {},

      all_districts:
        response.data.all_districts || [],

      top_risk_districts:
        response.data.top_risk_districts || [],

      high_risk_predictions:
        response.data.high_risk_predictions || [],
    };
  } catch (error) {
    console.error(
      "Dashboard API Error:",
      error
    );

    return {
      success: false,

      summary: {
        totalPredictions: 0,
        totalDistricts: 0,
        highRiskCount: 0,
        mediumRiskCount: 0,
        lowRiskCount: 0,
        last_updated: null,
      },

      all_districts: [],
      top_risk_districts: [],
      high_risk_predictions: [],
    };
  }
};

// =====================================
// Get All Predictions
// =====================================
export const getPredictions = async () => {
  try {
    const response = await api.get(
      "/predictions"
    );

    return response.data;
  } catch (error) {
    console.error(
      "Predictions API Error:",
      error
    );

    return {
      success: false,
      data: [],
    };
  }
};

// =====================================
// Get High Risk Predictions
// =====================================
export const getHighRiskPredictions =
  async () => {
    try {
      const response = await api.get(
        "/predictions/high-risk"
      );

      return response.data;
    } catch (error) {
      console.error(
        "High Risk API Error:",
        error
      );

      return {
        success: false,
        data: [],
      };
    }
  };

// =====================================
// Get Top Risk Districts
// =====================================
export const getTopRiskDistricts =
  async () => {
    try {
      const response = await api.get(
        "/predictions/top-districts"
      );

      return response.data;
    } catch (error) {
      console.error(
        "Top Risk API Error:",
        error
      );

      return {
        success: false,
        data: [],
      };
    }
  };

// =====================================
// Get District Predictions
// =====================================
export const getDistrictPredictions =
  async (district) => {
    try {
      const response = await api.get(
        `/predictions/district/${district}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "District API Error:",
        error
      );

      return {
        success: false,
        data: [],
      };
    }
  };

export default api;