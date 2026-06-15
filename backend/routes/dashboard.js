const express = require("express");

const router = express.Router();

const {
    getDashboardSummary,
    getRecentAlerts
} = require("../controllers/dashboardController");

// Dashboard Summary
router.get(
    "/summary",
    getDashboardSummary
);

// Recent Alerts
router.get(
    "/alerts",
    getRecentAlerts
);

module.exports = router;