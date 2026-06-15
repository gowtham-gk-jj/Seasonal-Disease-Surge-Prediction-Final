const express = require("express");

const router = express.Router();

const {
    getAllAlerts,
    getDistrictAlert
} = require(
    "../controllers/alertController"
);

// All alerts
router.get(
    "/",
    getAllAlerts
);

// Single district alert
router.get(
    "/:district",
    getDistrictAlert
);

module.exports = router;