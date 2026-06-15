const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
{
    district: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    disease: {
        type: String,
        required: true,
        trim: true
    },

    year: {
        type: Number,
        required: true
    },

    week_number: {
        type: Number,
        required: true
    },

    surge_probability: {
        type: Number,
        required: true,
        min: 0,
        max: 1
    },

    expected_cases_2w: {
        type: Number,
        required: true,
        default: 0
    },

    risk_level: {
        type: String,
        required: true,
        enum: [
            "LOW",
            "MEDIUM",
            "HIGH"
        ]
    },

    alert: {
        type: Boolean,
        default: false
    },

    model_version: {
        type: String,
        default: "v1.0"
    }
},
{
    timestamps: true
}
);

module.exports =
mongoose.model(
    "Prediction",
    predictionSchema
);