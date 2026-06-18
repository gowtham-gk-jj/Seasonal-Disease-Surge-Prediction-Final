const Prediction = require("../models/Prediction");

// ==========================================
// GET ALL ALERTS
// ==========================================

exports.getAllAlerts = async (
  req,
  res
) => {
  try {
    const predictions =
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
          },
        },
        {
          $sort: {
            surge_probability: -1,
          },
        },
      ]);

    return res.status(200).json({
      success: true,
      count: predictions.length,
      data: predictions,
    });
  } catch (error) {
    console.error(
      "Get All Alerts Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET DISTRICT ALERT
// ==========================================

exports.getDistrictAlert = async (
  req,
  res
) => {
  try {
    const district =
      req.params.district;

    const prediction =
      await Prediction.findOne({
        district: new RegExp(
          `^${district}$`,
          "i"
        ),
      }).sort({
        surge_probability: -1,
      });

    if (!prediction) {
      return res.status(404).json({
        success: false,
        message:
          "District not found",
      });
    }

    let englishAlert =
      "";

    let tamilAlert =
      "";

    if (
      prediction.risk_level ===
      "HIGH"
    ) {
      englishAlert =
        `HIGH RISK ALERT for ${prediction.district}. Immediate surveillance and preventive measures are recommended.`;

      tamilAlert =
        `${prediction.district} மாவட்டத்தில் அதிக அபாய எச்சரிக்கை. உடனடி கண்காணிப்பு மற்றும் தடுப்பு நடவடிக்கைகள் அவசியம்.`;
    } else if (
      prediction.risk_level ===
      "MEDIUM"
    ) {
      englishAlert =
        `MEDIUM RISK ALERT for ${prediction.district}. Monitor disease trends closely.`;

      tamilAlert =
        `${prediction.district} மாவட்டத்தில் நடுத்தர அபாயம். நோய் பரவலை தொடர்ந்து கண்காணிக்கவும்.`;
    } else {
      englishAlert =
        `LOW RISK ALERT for ${prediction.district}. Routine monitoring is recommended.`;

      tamilAlert =
        `${prediction.district} மாவட்டத்தில் குறைந்த அபாயம். வழக்கமான கண்காணிப்பை தொடரவும்.`;
    }

    return res.status(200).json({
      success: true,

      data: {
        district:
          prediction.district,

        disease:
          prediction.disease,

        risk_level:
          prediction.risk_level,

        surge_probability:
          prediction.surge_probability,

        expected_cases_2w:
          prediction.expected_cases_2w,

        forecast_horizon:
          "14-21 Days",

        english_alert:
          englishAlert,

        tamil_alert:
          tamilAlert,
      },
    });
  } catch (error) {
    console.error(
      "District Alert Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};