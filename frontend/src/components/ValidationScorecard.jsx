import React, {
    useEffect,
    useState
} from "react";

import {
    getValidationScorecard
} from "../services/api";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import {
    FaCheckCircle,
    FaDatabase,
    FaChartLine
} from "react-icons/fa";

const COLORS = [
    "#ef4444",
    "#f59e0b",
    "#22c55e"
];

const ValidationScorecard = () => {

    const [validation,
        setValidation] =
        useState(null);

    const [loading,
        setLoading] =
        useState(true);

    useEffect(() => {

        loadValidation();

    }, []);

    const loadValidation =
        async () => {

            try {

                const response =
                    await getValidationScorecard();

                if (
                    response.success
                ) {

                    setValidation(
                        response.validation
                    );

                }

            } catch (error) {

                console.error(
                    "Validation Error",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

    if (loading) {

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
                Loading Validation Metrics...
            </div>

        );

    }

    if (!validation) {

        return (

            <div
                style={{
                    background:
                        "#fff",
                    padding:
                        "25px",
                    borderRadius:
                        "16px"
                }}
            >
                No Validation Data Found
            </div>

        );

    }

    const pieData = [

        {
            name: "High Risk",
            value:
                validation
                    .risk_distribution
                    .high
        },

        {
            name: "Medium Risk",
            value:
                validation
                    .risk_distribution
                    .medium
        },

        {
            name: "Low Risk",
            value:
                validation
                    .risk_distribution
                    .low
        }

    ];

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

                <FaChartLine
                    size={24}
                    color="#2563eb"
                />

                <h2
                    style={{
                        margin: 0
                    }}
                >
                    Validation Scorecard
                </h2>

            </div>

            {/* Metrics */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(180px,1fr))",
                    gap: "15px",
                    marginBottom:
                        "25px"
                }}
            >

                <div
                    style={{
                        background:
                            "#dbeafe",
                        padding:
                            "20px",
                        borderRadius:
                            "12px"
                    }}
                >

                    <h4>
                        Precision
                    </h4>

                    <h2>
                        {(
                            validation.precision *
                            100
                        ).toFixed(
                            1
                        )}
                        %
                    </h2>

                </div>

                <div
                    style={{
                        background:
                            "#dcfce7",
                        padding:
                            "20px",
                        borderRadius:
                            "12px"
                    }}
                >

                    <h4>
                        Recall
                    </h4>

                    <h2>
                        {(
                            validation.recall *
                            100
                        ).toFixed(
                            1
                        )}
                        %
                    </h2>

                </div>

                <div
                    style={{
                        background:
                            "#fef3c7",
                        padding:
                            "20px",
                        borderRadius:
                            "12px"
                    }}
                >

                    <h4>
                        F1 Score
                    </h4>

                    <h2>
                        {(
                            validation.f1_score *
                            100
                        ).toFixed(
                            1
                        )}
                        %
                    </h2>

                </div>

            </div>

            {/* Dataset */}

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

                <FaDatabase
                    color="#6366f1"
                />

                <h4>
                    Dataset Size :
                    {" "}
                    {
                        validation.dataset_size
                    }
                </h4>

            </div>

            {/* Pie Chart */}

            <div
                style={{
                    width: "100%",
                    height:
                        "300px"
                }}
            >

                <ResponsiveContainer>

                    <PieChart>

                        <Pie
                            data={
                                pieData
                            }
                            cx="50%"
                            cy="50%"
                            outerRadius={
                                100
                            }
                            label
                            dataKey="value"
                        >

                            {pieData.map(
                                (
                                    entry,
                                    index
                                ) => (

                                    <Cell
                                        key={
                                            index
                                        }
                                        fill={
                                            COLORS[
                                                index
                                            ]
                                        }
                                    />

                                )
                            )}

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>

            {/* Summary */}

            <div
                style={{
                    marginTop:
                        "20px",
                    padding:
                        "15px",
                    borderRadius:
                        "12px",
                    background:
                        "#f8fafc"
                }}
            >

                <div
                    style={{
                        display:
                            "flex",
                        alignItems:
                            "center",
                        gap: "10px"
                    }}
                >

                    <FaCheckCircle
                        color="#22c55e"
                    />

                    <strong>
                        Model Performance
                    </strong>

                </div>

                <p>

                    Precision:
                    {" "}
                    {(
                        validation.precision *
                        100
                    ).toFixed(
                        1
                    )}
                    %
                    {" | "}

                    Recall:
                    {" "}
                    {(
                        validation.recall *
                        100
                    ).toFixed(
                        1
                    )}
                    %
                    {" | "}

                    F1:
                    {" "}
                    {(
                        validation.f1_score *
                        100
                    ).toFixed(
                        1
                    )}
                    %

                </p>

            </div>

        </div>

    );

};

export default ValidationScorecard;