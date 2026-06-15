const District = require("../models/District");

// Get All Districts
exports.getAllDistricts = async (req, res) => {
    try {
        const districts = await District.find();

        res.status(200).json({
            success: true,
            count: districts.length,
            data: districts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get District By ID
exports.getDistrictById = async (req, res) => {
    try {
        const district = await District.findById(req.params.id);

        if (!district) {
            return res.status(404).json({
                success: false,
                message: "District not found"
            });
        }

        res.status(200).json({
            success: true,
            data: district
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Create District
exports.createDistrict = async (req, res) => {
    try {
        const district = await District.create(req.body);

        res.status(201).json({
            success: true,
            data: district
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update District
exports.updateDistrict = async (req, res) => {
    try {
        const district = await District.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            data: district
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete District
exports.deleteDistrict = async (req, res) => {
    try {
        await District.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "District deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};