const Prediction = require("../models/Prediction");

// =====================================================
// Get All Predictions
// =====================================================

exports.getAllPredictions = async () => {
  return await Prediction.find().sort({
    year: -1,
    week_number: -1,
  });
};

// =====================================================
// Get Prediction By ID
// =====================================================

exports.getPredictionById = async (id) => {
  return await Prediction.findById(id);
};

// =====================================================
// Get Predictions By District
// =====================================================

exports.getPredictionsByDistrict = async (
  district
) => {
  return await Prediction.find({
    district: {
      $regex: new RegExp(
        `^${district}$`,
        "i"
      ),
    },
  }).sort({
    year: -1,
    week_number: -1,
  });
};

// =====================================================
// Create Prediction
// =====================================================

exports.createPrediction = async (
  predictionData
) => {
  return await Prediction.create(
    predictionData
  );
};

// =====================================================
// Update Prediction
// =====================================================

exports.updatePrediction = async (
  id,
  updateData
) => {
  return await Prediction.findByIdAndUpdate(
    id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};

// =====================================================
// Delete Prediction
// =====================================================

exports.deletePrediction = async (id) => {
  return await Prediction.findByIdAndDelete(
    id
  );
};

// =====================================================
// High Risk Predictions
// =====================================================

exports.getHighRiskPredictions =
  async () => {
    return await Prediction.find({
      $or: [
        {
          risk_level: "HIGH",
        },
        {
          surge_probability: {
            $gte: 0.7,
          },
        },
      ],
    }).sort({
      surge_probability: -1,
    });
  };

// =====================================================
// Top Risk Districts
// =====================================================

exports.getTopRiskDistricts =
  async (limit = 10) => {

    const districts =
      await Prediction.aggregate([
        {
          $sort: {
            year: -1,
            week_number: -1,
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
          },
        },
        {
          $sort: {
            surge_probability: -1,
          },
        },
        {
          $limit: limit,
        },
      ]);

    return districts;
  };

// =====================================================
// Latest Predictions
// =====================================================

exports.getLatestPredictions =
  async (limit = 50) => {

    return await Prediction.find()
      .sort({
        year: -1,
        week_number: -1,
      })
      .limit(limit);
  };

// =====================================================
// Dashboard Summary
// =====================================================

exports.getDashboardSummary =
  async () => {

    const latestDistrictPredictions =
      await Prediction.aggregate([
        {
          $sort: {
            year: -1,
            week_number: -1,
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

            year: {
              $first: "$year",
            },

            week_number: {
              $first:
                "$week_number",
            },

            surge_probability: {
              $first:
                "$surge_probability",
            },

            expected_cases_2w: {
              $first:
                "$expected_cases_2w",
            },

            risk_level: {
              $first:
                "$risk_level",
            },

            alert: {
              $first: "$alert",
            },
          },
        },
        {
          $sort: {
            surge_probability: -1,
          },
        },
      ]);

    const totalDistricts =
      latestDistrictPredictions.length;

    const highRiskCount =
      latestDistrictPredictions.filter(
        (d) =>
          d.risk_level === "HIGH"
      ).length;

    const mediumRiskCount =
      latestDistrictPredictions.filter(
        (d) =>
          d.risk_level === "MEDIUM"
      ).length;

    const lowRiskCount =
      latestDistrictPredictions.filter(
        (d) =>
          d.risk_level === "LOW"
      ).length;

    return {
      summary: {
        totalPredictions:
          totalDistricts,

        totalDistricts,

        highRiskCount,

        mediumRiskCount,

        lowRiskCount,

        last_updated:
          new Date(),
      },

      all_districts:
        latestDistrictPredictions,

      top_risk_districts:
        latestDistrictPredictions.slice(
          0,
          10
        ),
    };
  };