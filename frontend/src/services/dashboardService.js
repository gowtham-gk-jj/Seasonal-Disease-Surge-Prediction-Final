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
    // Main Dashboard Summary
    const summaryResponse = await api.get(
      "/predictions/dashboard-summary"
    );

    console.log(
      "Dashboard Summary API:",
      summaryResponse.data
    );

    let topDistricts = [];
    let highRiskPredictions = [];

    // Top Districts
    try {
      const topResponse = await api.get(
        "/predictions/top-districts"
      );

      console.log(
        "Top Districts API:",
        topResponse.data
      );

      topDistricts =
        topResponse?.data?.data || [];
    } catch (error) {
      console.error(
        "Top District API Failed:",
        error
      );
    }

    // High Risk Predictions
    try {
      const highResponse = await api.get(
        "/predictions/high-risk"
      );

      console.log(
        "High Risk API:",
        highResponse.data
      );

      highRiskPredictions =
        highResponse?.data?.data || [];
    } catch (error) {
      console.error(
        "High Risk API Failed:",
        error
      );
    }

    const summary =
      summaryResponse?.data?.data || {};

    return {
      success: true,

      summary: {
        totalPredictions:
          summary.totalPredictions || 0,

        totalDistricts:
          summary.totalDistricts || 0,

        highRiskCount:
          summary.highRiskCount || 0,

        mediumRiskCount:
          summary.mediumRiskCount || 0,

        lowRiskCount:
          summary.lowRiskCount || 0,

        last_updated:
          summary.last_updated ||
          new Date(),
      },

      top_risk_districts:
        topDistricts,

      high_risk_predictions:
        highRiskPredictions,
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
        last_updated: new Date(),
      },

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
      count: 0,
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
        "Top Risk District API Error:",
        error
      );

      return {
        success: false,
        data: [],
      };
    }
  };

// =====================================
// Get Predictions By District
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
        "District Prediction API Error:",
        error
      );

      return {
        success: false,
        data: [],
      };
    }
  };

export default api;