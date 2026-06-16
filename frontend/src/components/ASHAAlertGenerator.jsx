import React, {
    useEffect,
    useState
} from "react";

import {
    FaBell,
    FaLanguage
} from "react-icons/fa";

import {
    getDistrictAlert
} from "../services/api";

const ASHAAlertGenerator = ({
    selectedDistrict =
        "Chennai"
}) => {

    const [alertData,
        setAlertData] =
        useState(null);

    const [loading,
        setLoading] =
        useState(false);

    const [error,
        setError] =
        useState("");

    useEffect(() => {

        loadAlert(
            selectedDistrict
        );

    }, [selectedDistrict]);

    const loadAlert =
        async (
            district
        ) => {

            try {

                setLoading(
                    true
                );

                setError("");

                const response =
                    await getDistrictAlert(
                        district
                    );

                if (
                    response.success
                ) {

                    setAlertData(
                        response.data
                    );

                }

            } catch (error) {

                console.error(
                    error
                );

                setError(
                    "Unable to fetch alert"
                );

            } finally {

                setLoading(
                    false
                );

            }

        };

    const getRiskColor =
        (
            riskLevel
        ) => {

            switch (
                riskLevel?.toUpperCase()
            ) {

                case "HIGH":
                    return "#ef4444";

                case "MEDIUM":
                    return "#f59e0b";

                case "LOW":
                    return "#22c55e";

                default:
                    return "#64748b";

            }

        };

    return (

        <div
            style={{
                background:
                    "#fff",
                padding:
                    "25px",
                borderRadius:
                    "16px",
                boxShadow:
                    "0 2px 10px rgba(0,0,0,0.08)"
            }}
        >

            <div
                style={{
                    display: "flex",
                    alignItems:
                        "center",
                    gap: "10px",
                    marginBottom:
                        "20px"
                }}
            >

                <FaBell
                    size={24}
                    color="#dc2626"
                />

                <h2>
                    ASHA Alert
                    Generator
                </h2>

            </div>

            {loading && (

                <h3>
                    Loading Alert...
                </h3>

            )}

            {error && (

                <div
                    style={{
                        color:
                            "red"
                    }}
                >
                    {error}
                </div>

            )}

            {alertData && (

                <>

                    <div
                        style={{
                            background:
                                getRiskColor(
                                    alertData.risk_level
                                ),
                            color:
                                "#fff",
                            padding:
                                "10px",
                            borderRadius:
                                "8px",
                            marginBottom:
                                "15px",
                            textAlign:
                                "center",
                            fontWeight:
                                "bold"
                        }}
                    >

                        {
                            alertData.risk_level
                        }
                        {" "}
                        RISK

                    </div>

                    <h3>
                        District:
                        {" "}
                        {
                            alertData.district
                        }
                    </h3>

                    {/* English */}

                    <div
                        style={{
                            background:
                                "#eff6ff",
                            padding:
                                "15px",
                            borderRadius:
                                "10px",
                            marginBottom:
                                "15px"
                        }}
                    >

                        <strong>
                            English Alert
                        </strong>

                        <p>
                            {
                                alertData.english_alert
                            }
                        </p>

                    </div>

                    {/* Tamil */}

                    <div
                        style={{
                            background:
                                "#f5f3ff",
                            padding:
                                "15px",
                            borderRadius:
                                "10px"
                        }}
                    >

                        <div
                            style={{
                                display:
                                    "flex",
                                alignItems:
                                    "center",
                                gap:
                                    "8px"
                            }}
                        >

                            <FaLanguage />

                            <strong>
                                Tamil
                                Alert
                            </strong>

                        </div>

                        <p
                            style={{
                                fontSize:
                                    "16px",
                                lineHeight:
                                    "1.8"
                            }}
                        >
                            {
                                alertData.tamil_alert
                            }
                        </p>

                    </div>

                </>

            )}

        </div>

    );

};

export default ASHAAlertGenerator;