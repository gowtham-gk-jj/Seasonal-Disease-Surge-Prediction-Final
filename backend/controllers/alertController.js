const fs = require("fs");
const path = require("path");

// ======================================================
// GET ALL ALERTS
// ======================================================

exports.getAllAlerts = async (
    req,
    res
) => {

    try {

        const filePath = path.join(
            __dirname,
            "../data/alerts.json"
        );

        if (
            !fs.existsSync(filePath)
        ) {

            return res.status(404).json({
                success: false,
                message:
                    "alerts.json not found"
            });

        }

        const alerts = JSON.parse(
            fs.readFileSync(
                filePath,
                "utf8"
            )
        );

        return res.status(200).json({
            success: true,
            count: alerts.length,
            data: alerts
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================================================
// GET ALERT BY DISTRICT
// ======================================================

exports.getDistrictAlert = async (
    req,
    res
) => {

    try {

        const district =
            req.params.district;

        const filePath = path.join(
            __dirname,
            "../data/alerts.json"
        );

        if (
            !fs.existsSync(filePath)
        ) {

            return res.status(404).json({
                success: false,
                message:
                    "alerts.json not found"
            });

        }

        const alerts = JSON.parse(
            fs.readFileSync(
                filePath,
                "utf8"
            )
        );

        const districtAlert =
            alerts.find(
                (item) =>
                    item.district
                        .toLowerCase() ===
                    district
                        .toLowerCase()
            );

        if (!districtAlert) {

            return res.status(404).json({
                success: false,
                message:
                    "District alert not found"
            });

        }

        return res.status(200).json({
            success: true,
            data: districtAlert
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};