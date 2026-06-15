const fs = require("fs");
const path = require("path");

// ======================================================
// GET ALL SHAP DATA
// ======================================================

exports.getAllShapData = async (
    req,
    res
) => {

    try {

        const filePath = path.join(
            __dirname,
            "../data/shap_output.json"
        );

        if (
            !fs.existsSync(filePath)
        ) {

            return res.status(404).json({
                success: false,
                message:
                    "shap_output.json not found"
            });

        }

        const shapData = JSON.parse(
            fs.readFileSync(
                filePath,
                "utf8"
            )
        );

        return res.status(200).json({
            success: true,
            count: shapData.length,
            data: shapData
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================================================
// GET SHAP DATA FOR ONE DISTRICT
// ======================================================

exports.getDistrictShap = async (
    req,
    res
) => {

    try {

        const district =
            req.params.district;

        const filePath = path.join(
            __dirname,
            "../data/shap_output.json"
        );

        if (
            !fs.existsSync(filePath)
        ) {

            return res.status(404).json({
                success: false,
                message:
                    "shap_output.json not found"
            });

        }

        const shapData = JSON.parse(
            fs.readFileSync(
                filePath,
                "utf8"
            )
        );

        const districtData =
            shapData.find(
                (item) =>
                    item.district
                        .toLowerCase() ===
                    district
                        .toLowerCase()
            );

        if (!districtData) {

            return res.status(404).json({
                success: false,
                message:
                    "District SHAP data not found"
            });

        }

        return res.status(200).json({
            success: true,
            data: districtData
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};