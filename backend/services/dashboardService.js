const Prediction = require("../models/Prediction");
const Alert = require("../models/Alert");
const District = require("../models/District");

// Get Dashboard Statistics
exports.getDashboardStats = async () => {

    const totalDistricts =
        await District.countDocuments();

    const totalPredictions =
        await Prediction.countDocuments();

    const activeAlerts =
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

    const recentAlerts =
        await Alert.find()
            .sort({
                createdAt: -1
            })
            .limit(10);

    return {
        totalDistricts,
        totalPredictions,
        activeAlerts,

        riskBreakdown: {
            high: highRisk,
            medium: mediumRisk,
            low: lowRisk
        },

        topRiskDistricts,
        recentAlerts,

        forecastHorizon:
            "14-21 days",

        lastUpdated:
            new Date()
    };
};

// Get Risk Breakdown Only
exports.getRiskBreakdown = async () => {

    const high =
        await Prediction.countDocuments({
            risk_level: "HIGH"
        });

    const medium =
        await Prediction.countDocuments({
            risk_level: "MEDIUM"
        });

    const low =
        await Prediction.countDocuments({
            risk_level: "LOW"
        });

    return {
        high,
        medium,
        low
    };
};

// Get Top Risk Districts
exports.getTopRiskDistricts = async (
    limit = 5
) => {

    return await Prediction.find()
        .sort({
            surge_probability: -1
        })
        .limit(limit);
};

// Get Recent Alerts
exports.getRecentAlerts = async (
    limit = 10
) => {

    return await Alert.find()
        .sort({
            createdAt: -1
        })
        .limit(limit);
};

// Get Active Alerts
exports.getActiveAlerts = async () => {

    return await Alert.find({
        resolved: false
    });
};