import React, {
  useEffect,
  useState,
  useMemo,
} from "react";

import {
  MapContainer,
  GeoJSON,
  TileLayer,
} from "react-leaflet";

import { feature } from "topojson-client";

import "leaflet/dist/leaflet.css";

const TamilNaduChoropleth = ({
  districtsData = [],
  onDistrictSelect,
}) => {
  const [geoData, setGeoData] =
    useState(null);

  useEffect(() => {
    fetch("/tamilnadu.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Failed to load tamilnadu.json"
          );
        }

        return res.json();
      })
      .then((topology) => {
        const objectKey =
          Object.keys(
            topology.objects
          )[0];

        const geojson = feature(
          topology,
          topology.objects[
            objectKey
          ]
        );

        console.log(
          "Map District Count:",
          geojson.features.length
        );

        setGeoData(geojson);
      })
      .catch((err) => {
        console.error(
          "Map Load Error:",
          err
        );
      });
  }, []);

  const normalize = (
    districtName
  ) => {
    return String(
      districtName || ""
    )
      .toLowerCase()
      .trim()

      .replace(
        / district$/i,
        ""
      )

      .replace(
        "the nilgiris",
        "nilgiris"
      )

      .replace(
        "nilgiri",
        "nilgiris"
      )

      .replace(
        "viluppuram",
        "villupuram"
      )

      .replace(
        "thiruvallur",
        "tiruvallur"
      )

      .replace(
        "kancheepuram",
        "kanchipuram"
      )

      .replace(
        "thoothukudi",
        "tuticorin"
      )

      .replace(
        "thoothukkudi",
        "tuticorin"
      )

      .replace(
        "tiruchirappalli",
        "trichy"
      )

      .replace(
        "tiruchirapalli",
        "trichy"
      )

      .replace(
        "tiruchchirappalli",
        "trichy"
      )

      .replace(
        "trichirapalli",
        "trichy"
      )

      .replace(
        "tirupattur",
        "tirupathur"
      )

      .replace(
        "thiruvarur",
        "tiruvarur"
      )

      .replace(/-/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const districtLookup =
    useMemo(() => {
      const lookup = {};

      districtsData.forEach(
        (district) => {
          const name =
            district?.district ||
            district?.district_name ||
            district?.District ||
            district?.DISTRICT ||
            district?.name ||
            district?.Name;

          lookup[
            normalize(name)
          ] = district;
        }
      );

      return lookup;
    }, [districtsData]);

  const getDistrictName = (
    feature
  ) => {
    return (
      feature?.properties
        ?.district ||
      feature?.properties
        ?.DISTRICT ||
      feature?.properties
        ?.District ||
      feature?.properties
        ?.NAME_2 ||
      feature?.properties
        ?.NAME ||
      feature?.properties
        ?.name ||
      ""
    );
  };

  const getDistrictData = (
    districtName
  ) => {
    const geoName =
      normalize(
        districtName
      );

    let district =
      districtLookup[geoName];

    if (district)
      return district;

    district =
      Object.values(
        districtLookup
      ).find((d) => {
        const apiName =
          normalize(
            d?.district ||
              d?.district_name ||
              d?.name
          );

        return (
          apiName === geoName ||
          apiName.includes(
            geoName
          ) ||
          geoName.includes(
            apiName
          )
        );
      });

    if (!district) {
      console.log(
        "NOT MATCHED:",
        districtName
      );
    }

    return district || null;
  };

  const getColor = (
    risk
  ) => {
    switch (
      String(
        risk || ""
      ).toUpperCase()
    ) {
      case "HIGH":
        return "#ef4444";

      case "MEDIUM":
        return "#f59e0b";

      case "LOW":
        return "#22c55e";

      default:
        return "#cbd5e1";
    }
  };

  const styleFeature = (
    feature
  ) => {
    const districtName =
      getDistrictName(
        feature
      );

    const districtData =
      getDistrictData(
        districtName
      );

    return {
      fillColor: getColor(
        districtData?.risk_level
      ),
      fillOpacity: 0.8,
      color: "#ffffff",
      weight: 1,
      opacity: 1,
    };
  };

  const onEachFeature = (
    feature,
    layer
  ) => {
    const districtName =
      getDistrictName(
        feature
      );

    const districtData =
      getDistrictData(
        districtName
      );

    const risk =
      districtData?.risk_level ||
      "NO DATA";

    const probability =
      districtData?.surge_probability
        ? (
            districtData.surge_probability *
            100
          ).toFixed(1)
        : "0";

    const cases =
      districtData?.expected_cases_2w ||
      0;

    layer.bindTooltip(
      `
      <div>
        <strong>${districtName}</strong><br/>
        Risk: ${risk}<br/>
        Probability: ${probability}%<br/>
        Cases: ${cases}
      </div>
      `,
      {
        sticky: true,
      }
    );

    layer.on({
      mouseover: (e) => {
        e.target.setStyle({
          weight: 3,
          color: "#000",
        });
      },

      mouseout: (e) => {
        e.target.setStyle({
          weight: 1,
          color: "#fff",
        });
      },

      click: () => {
        onDistrictSelect?.(
          districtName
        );
      },
    });
  };

  if (!geoData) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign:
            "center",
        }}
      >
        Loading Tamil Nadu Map...
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <MapContainer
        center={[
          10.9, 78.7,
        ]}
        zoom={7}
        scrollWheelZoom
        style={{
          height: "700px",
          width: "100%",
        }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <GeoJSON
          data={geoData}
          style={
            styleFeature
          }
          onEachFeature={
            onEachFeature
          }
        />
      </MapContainer>

      <div
        style={{
          padding: "12px",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          fontWeight: "600",
        }}
      >
        <span>
          🔴 High Risk
        </span>
        <span>
          🟡 Medium Risk
        </span>
        <span>
          🟢 Low Risk
        </span>
        <span>
          ⚪ No Data
        </span>
      </div>
    </div>
  );
};

export default TamilNaduChoropleth;