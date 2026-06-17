import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// ===============================
// MAP DATA
// ===============================
export const getMapData = async () => {
  try {
    const res = await API.get("/map-data");
    return res.data;
  } catch (error) {
    console.error("Map API Error:", error);

    return {
      success: false,
      data: [],
    };
  }
};

// ===============================
// VALIDATION SCORECARD
// ===============================
export const getValidationScorecard = async () => {
  try {
    const res = await API.get("/validation");

    console.log(
      "Validation Scorecard Response:",
      res.data
    );

    return res.data;
  } catch (error) {
    console.error(
      "Validation API Error:",
      error
    );

    return {
      success: false,
      validation: {
        dataset_size: 0,
        district_count: 0,
        precision: 0,
        recall: 0,
        f1_score: 0,
        risk_distribution: {
          high: 0,
          medium: 0,
          low: 0,
        },
      },
    };
  }
};

// ===============================
// DATA SOURCES
// ===============================
export const getDataSources = async () => {
  try {
    const res = await API.get(
      "/data-sources"
    );

    return res.data;
  } catch (error) {
    console.error(
      "Data Sources API Error:",
      error
    );

    return {
      success: false,
      data: [],
    };
  }
};

// ===============================
// SHAP DATA
// ===============================
export const getDistrictShap = async (
  district
) => {
  try {
    const res = await API.get(
      `/shap/${district}`
    );

    return res.data;
  } catch (error) {
    console.error(
      "SHAP API Error:",
      error
    );

    return {
      success: false,
      data: {
        district,
        features: [],
      },
    };
  }
};

// ===============================
// ALERT DATA
// ===============================
export const getDistrictAlert = async (
  district
) => {
  try {
    const res = await API.get(
      `/alerts/${district}`
    );

    return res.data;
  } catch (error) {
    console.error(
      "Alert API Error:",
      error
    );

    return {
      success: false,
      data: null,
    };
  }
};

export default API;