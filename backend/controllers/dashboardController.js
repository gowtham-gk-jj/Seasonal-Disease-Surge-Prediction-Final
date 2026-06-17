const Prediction = require("../models/Prediction");
const Alert = require("../models/Alert");
const District = require("../models/District");

// =====================================================
// Dashboard Summary
// =====================================================

exports.getDashboardSummary = async (req, res) => {
  try {
    const totalDistricts = await Prediction.distinct(
      "district"
    ).then((districts) => districts.length);

    const totalPredictions =
      await Prediction.countDocuments();

    const totalAlerts =
      await Alert.countDocuments({
        resolved: false,
      });

    const highRisk =
      await Prediction.countDocuments({
        risk_level: "HIGH",
      });

    const mediumRisk =
      await Prediction.countDocuments({
        risk_level: "MEDIUM",
      });

    const lowRisk =
      await Prediction.countDocuments({
        risk_level: "LOW",
      });

    // =====================================================
    // Get ONE record per district
    // Highest probability record kept
    // =====================================================

    const allDistrictPredictions =
      await Prediction.aggregate([
        {
          $sort: {
            surge_probability: -1,
          },
        },
        {
          $group: {
            _id: "$district",

            district: {
              $first: "$district",
            },

            disease: {
              $first: "$disease",
            },

            risk_level: {
              $first: "$risk_level",
            },

            surge_probability: {
              $first:
                "$surge_probability",
            },

            expected_cases_2w: {
              $first:
                "$expected_cases_2w",
            },

            createdAt: {
              $first: "$createdAt",
            },
          },
        },
        {
          $sort: {
            surge_probability: -1,
          },
        },
      ]);

    // =====================================================
    // Top 10 Districts
    // =====================================================

    const topRiskDistricts =
      allDistrictPredictions.slice(
        0,
        10
      );

    return res.status(200).json({
      success: true,

      summary: {
        totalDistricts,
        totalPredictions,

        activeAlerts:
          totalAlerts,

        highRiskCount:
          highRisk,

        mediumRiskCount:
          mediumRisk,

        lowRiskCount:
          lowRisk,

        forecastHorizon:
          "14-21 days",

        last_updated:
          new Date(),
      },

      top_risk_districts:
        topRiskDistricts,

      all_districts:
        allDistrictPredictions,
    });
  } catch (error) {
    console.error(
      "Dashboard Summary Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to load dashboard data",
    });
  }
};

// =====================================================
// Recent Alerts
// =====================================================

exports.getRecentAlerts = async (
  req,
  res
) => {
  try {
    const alerts = await Alert.find()
      .sort({
        createdAt: -1,
      })
      .limit(10);

    return res.status(200).json({
      success: true,
      count: alerts.length,
      alerts,
    });
  } catch (error) {
    console.error(
      "Recent Alerts Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to load alerts",
    });
  }
};