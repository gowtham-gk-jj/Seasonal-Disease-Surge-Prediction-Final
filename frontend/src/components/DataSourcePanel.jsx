import React, {
    useEffect,
    useState
} from "react";

import {
    FaDatabase,
    FaExternalLinkAlt
} from "react-icons/fa";

import {
    getDataSources
} from "../services/api";

const DataSourcePanel = () => {

    const [sources,
        setSources] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);

    useEffect(() => {

        loadSources();

    }, []);

    const loadSources =
        async () => {

            try {

                const response =
                    await getDataSources();

                if (
                    response.success
                ) {

                    setSources(
                        response.data
                    );

                }

            } catch (error) {

                console.error(
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
                        "16px"
                }}
            >
                Loading Data Sources...
            </div>

        );

    }

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

                <FaDatabase
                    size={24}
                    color="#2563eb"
                />

                <h2>
                    Data Sources
                </h2>

            </div>

            {sources.map(
                (
                    source,
                    index
                ) => (

                    <div
                        key={index}
                        style={{
                            padding:
                                "15px",
                            marginBottom:
                                "12px",
                            border:
                                "1px solid #e2e8f0",
                            borderRadius:
                                "10px"
                        }}
                    >

                        <h4>
                            {
                                source.source
                            }
                        </h4>

                        <p>
                            {
                                source.description
                            }
                        </p>

                        <a
                            href={
                                source.url
                            }
                            target="_blank"
                            rel="noreferrer"
                        >
                            Visit Source
                            {" "}
                            <FaExternalLinkAlt />
                        </a>

                    </div>

                )
            )}

        </div>

    );

};

export default DataSourcePanel;