const Alert =
require("../models/Alert");

const Prediction =
require("../models/Prediction");

class AlertService {

    async generateAlert(
        district
    ) {

        const prediction =
            await Prediction.findOne({
                district
            })
            .sort({
                createdAt: -1
            });

        if (!prediction) {
            return null;
        }

        let priority =
            "LOW";

        if (
            prediction.risk_level ===
            "HIGH"
        ) {
            priority =
                "CRITICAL";
        }
        else if (
            prediction.risk_level ===
            "MEDIUM"
        ) {
            priority =
                "MEDIUM";
        }

        const englishAlert =
            `${prediction.disease} surge risk detected in ${district}. Expected cases: ${prediction.expected_cases_2w}`;

        const alert =
            await Alert.create({

                district,

                disease:
                    prediction.disease,

                risk_level:
                    prediction.risk_level,

                probability:
                    prediction.surge_probability,

                priority,

                message:
                    englishAlert
            });

        return {

            alert_id:
                alert._id,

            district,

            disease:
                prediction.disease,

            risk_level:
                prediction.risk_level,

            probability:
                prediction.surge_probability,

            english_alert:
                englishAlert,

            tamil_alert:
                `${district} மாவட்டத்தில் ${prediction.disease} நோய் அதிகரிக்கும் அபாயம் உள்ளது. எதிர்பார்க்கப்படும் நோயாளிகள்: ${prediction.expected_cases_2w}`
        };
    }
}

module.exports =
new AlertService();