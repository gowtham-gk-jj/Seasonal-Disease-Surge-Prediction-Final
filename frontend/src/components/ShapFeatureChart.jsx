import React, {
    useEffect,
    useState
} from "react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import {
    FaBrain,
    FaSearch
} from "react-icons/fa";

import {
    getDistrictShap
} from "../services/api";

const ShapFeatureChart = ({
    selectedDistrict = "Chennai"
}) => {

    const [shapData,
        setShapData] =
        useState([]);

    const [district,
        setDistrict] =
        useState(selectedDistrict);

    const [loading,
        setLoading] =
        useState(false);

    const [error,
        setError] =
        useState("");

    useEffect(() => {

        loadShapData(
            selectedDistrict
        );

    }, [selectedDistrict]);

    const loadShapData =
        async (
            districtName
        ) => {

            try {

                setLoading(true);

                setError("");

                const response =
                    await getDistrictShap(
                        districtName
                    );

                if (
                    response.success
                ) {

                    const sorted =
                        response.data.features
                            .sort(
                                (
                                    a,
                                    b
                                ) =>
                                    b.impact -
                                    a.impact
                            );

                    setDistrict(
                        response.data
                            .district
                    );

                    setShapData(
                        sorted
                    );

                }

            } catch (err) {

                console.error(
                    err
                );

                setError(
                    "Unable to load SHAP data"
                );

            } finally {

                setLoading(false);

            }

        };

    const handleSearch =
        () => {

            if (
                district
            ) {

                loadShapData(
                    district
                );

            }

        };

    return (

        <div
            style={{
                background:
                    "#ffffff",
                padding:
                    "25px",
                borderRadius:
                    "16px",
                boxShadow:
                    "0 2px 10px rgba(0,0,0,0.08)"
            }}
        >

            {/* Header */}

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

                <FaBrain
                    size={24}
                    color="#7c3aed"
                />

                <h2
                    style={{
                        margin: 0
                    }}
                >
                    SHAP Feature
                    Importance
                </h2>

            </div>

            {/* Search */}

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom:
                        "20px"
                }}
            >

                <input
                    type="text"
                    value={
                        district
                    }
                    onChange={(e) =>
                        setDistrict(
                            e.target
                                .value
                        )
                    }
                    placeholder="Enter District Name"
                    style={{
                        flex: 1,
                        padding:
                            "12px",
                        border:
                            "1px solid #ddd",
                        borderRadius:
                            "8px"
                    }}
                />

                <button
                    onClick={
                        handleSearch
                    }
                    style={{
                        background:
                            "#2563eb",
                        color:
                            "white",
                        border:
                            "none",
                        padding:
                            "12px 18px",
                        borderRadius:
                            "8px",
                        cursor:
                            "pointer"
                    }}
                >

                    <FaSearch />

                </button>

            </div>

            {/* Error */}

            {error && (

                <div
                    style={{
                        background:
                            "#fee2e2",
                        color:
                            "#dc2626",
                        padding:
                            "12px",
                        borderRadius:
                            "8px",
                        marginBottom:
                            "15px"
                    }}
                >
                    {error}
                </div>

            )}

            {/* Loading */}

            {loading ? (

                <h3>
                    Loading SHAP
                    Data...
                </h3>

            ) : (

                <>
                    {/* District */}

                    <h3
                        style={{
                            color:
                                "#1e293b"
                        }}
                    >
                        District :
                        {" "}
                        {district}
                    </h3>

                    {/* Chart */}

                    <div
                        style={{
                            width:
                                "100%",
                            height:
                                "420px"
                        }}
                    >

                        <ResponsiveContainer>

                            <BarChart
                                data={
                                    shapData
                                }
                                layout="vertical"
                                margin={{
                                    top: 20,
                                    right: 20,
                                    left: 60,
                                    bottom: 20
                                }}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    type="number"
                                />

                                <YAxis
                                    dataKey="feature"
                                    type="category"
                                    width={
                                        160
                                    }
                                />

                                <Tooltip />

                                <Bar
                                    dataKey="impact"
                                    fill="#7c3aed"
                                    radius={[
                                        0,
                                        6,
                                        6,
                                        0
                                    ]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                    {/* Top Feature */}

                    {shapData.length >
                        0 && (

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

                            <strong>
                                Most Important
                                Feature:
                            </strong>

                            <p>

                                {
                                    shapData[0]
                                        .feature
                                }

                                {" "}
                                (
                                {
                                    shapData[0]
                                        .impact
                                }
                                )

                            </p>

                        </div>

                    )}

                </>

            )}

        </div>

    );

};

export default ShapFeatureChart;