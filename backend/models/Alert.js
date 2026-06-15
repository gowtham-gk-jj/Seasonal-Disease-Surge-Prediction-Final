const mongoose = require("mongoose");

// ── Alert Model ───────────────────────────────────────────
const alertSchema = new mongoose.Schema(
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

    risk_level: {
        type: String,
        required: true,
        enum: [
            "LOW",
            "MEDIUM",
            "HIGH"
        ]
    },

    probability: {
        type: Number,
        required: true,
        min: 0,
        max: 1
    },

    message: {
        type: String,
        required: true,
        trim: true
    },

    priority: {
        type: String,
        enum: [
            "LOW",
            "MEDIUM",
            "HIGH",
            "CRITICAL"
        ],
        default: "MEDIUM"
    },

    issued_at: {
        type: Date,
        default: Date.now
    },

    resolved: {
        type: Boolean,
        default: false
    },

    resolved_at: {
        type: Date,
        default: null
    }
},
{
    timestamps: true
}
);

// Indexes
alertSchema.index({ district: 1 });
alertSchema.index({ disease: 1 });
alertSchema.index({ risk_level: 1 });
alertSchema.index({ resolved: 1 });

// Export Model
module.exports = mongoose.model(
    "Alert",
    alertSchema
);