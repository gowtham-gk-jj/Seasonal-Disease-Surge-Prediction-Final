import React, { useEffect, useState } from "react";
import {
  FaDatabase,
  FaExternalLinkAlt,
  FaCloudRain,
  FaHospital,
  FaTemperatureHigh,
  FaAmbulance,
  FaPills,
} from "react-icons/fa";

import { getDataSources } from "../services/api";

const DataSourcePanel = () => {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSources();
  }, []);

  const loadSources = async () => {
    try {
      const response = await getDataSources();

      if (response?.success) {
        setSources(response.data || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sourceCards = [
    {
      title: "Rainfall",
      description:
        "IMD Gridded Rainfall Dataset",
      update:
        "Last Updated: 6 Hours Ago",
      icon: <FaCloudRain />,
      url: "https://mausam.imd.gov.in",
    },

    {
      title: "OPD Counts",
      description:
        "IDSP Weekly Surveillance Report (Week 22, 2024)",
      update:
        "Updated Weekly",
      icon: <FaHospital />,
      url: "https://idsp.mohfw.gov.in",
    },

    {
      title: "Temperature",
      description:
        "ERA5 Reanalysis (ECMWF CDS)",
      update:
        "Updated Daily",
      icon: <FaTemperatureHigh />,
      url: "https://cds.climate.copernicus.eu",
    },

    {
      title: "Ambulance Calls",
      description:
        "EMRI 108 Emergency Call Records",
      update:
        "Updated Daily",
      icon: <FaAmbulance />,
      url: "https://www.emri.in",
    },

    {
      title: "Medicine Demand",
      description:
        "TNMSC Medicine Indent Dataset",
      update:
        "Updated Weekly",
      icon: <FaPills />,
      url: "https://www.tnmsc.tn.gov.in",
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          padding: "25px",
          color: "#fff",
        }}
      >
        Loading Data Sources...
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#0f172a",
        color: "#fff",
        padding: "25px",
        borderRadius: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "25px",
        }}
      >
        <FaDatabase
          size={24}
          color="#38bdf8"
        />

        <h2
          style={{
            margin: 0,
          }}
        >
          Data Source Citation Panel
        </h2>
      </div>

      {sourceCards.map(
        (item, index) => (
          <div
            key={index}
            style={{
              background: "#1e293b",
              padding: "18px",
              borderRadius: "12px",
              marginBottom: "15px",
              border:
                "1px solid #334155",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    color: "#fff",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    marginTop: "8px",
                    marginBottom: "5px",
                    color: "#cbd5e1",
                  }}
                >
                  {item.description}
                </p>

                <small
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  {item.update}
                </small>
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "#38bdf8",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  textDecoration:
                    "none",
                }}
              >
                Source
                <FaExternalLinkAlt />
              </a>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default DataSourcePanel;