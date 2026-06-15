const Prediction = require("../models/Prediction");
const Alert = require("../models/Alert");
const District = require("../models/District");

// ── Dashboard Summary ─────────────────────────────────────
exports.getDashboardSummary = async (req, res) => {
    try {

        const totalDistricts =
            await Prediction.distinct(
                "district"
            ).then(
                districts =>
                    districts.length
            );

        const totalPredictions =
            await Prediction.countDocuments();

        const totalAlerts =
            await Alert.countDocuments({
                resolved: false
            });

        const highRisk =
            await Prediction.countDocuments({
                risk_level: "HIGH"
            });

        const mediumRisk =
            await Prediction.countDocuments({
                risk_level: "MEDIUM"
            });

        const lowRisk =
            await Prediction.countDocuments({
                risk_level: "LOW"
            });

        const topRiskDistricts =
            await Prediction.find()
                .sort({
                    surge_probability: -1
                })
                .limit(5);

        res.status(200).json({
            success: true,

            summary: {
                total_districts:
                    totalDistricts,

                total_predictions:
                    totalPredictions,

                active_alerts:
                    totalAlerts,

                forecast_horizon:
                    "14-21 days",

                risk_breakdown: {
                    high: highRisk,
                    medium: mediumRisk,
                    low: lowRisk
                },

                last_updated:
                    new Date()
            },

            top_risk_districts:
                topRiskDistricts
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ── Recent Alerts ─────────────────────────────────────────
exports.getRecentAlerts = async (req, res) => {
    try {

        const alerts =
            await Alert.find()
                .sort({
                    createdAt: -1
                })
                .limit(10);

        res.status(200).json({
            success: true,
            count: alerts.length,
            alerts
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};