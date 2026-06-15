

import React, { useState, useMemo } from "react";



import DistrictRiskChart from "../components/charts/DistrictRiskChart";

import DistrictRankingTable from "../components/tables/DistrictRankingTable";



export default function DistrictAnalysis({

  data = [],

}) {

  const [selectedDistrict, setSelectedDistrict] =

    useState("All");



  const districts = useMemo(() => {

    const uniqueDistricts = [

      ...new Set(

        data.map((item) => item.district)

      ),

    ];



    return uniqueDistricts.sort();

  }, [data]);



  const filteredData = useMemo(() => {

    if (selectedDistrict === "All") {

      return data;

    }



    return data.filter(

      (item) =>

        item.district === selectedDistrict

    );

  }, [data, selectedDistrict]);



  const totalPredictions =

    filteredData.length;



  const highRiskCount =

    filteredData.filter(

      (item) =>

        item.risk_level === "HIGH"

    ).length;



  const mediumRiskCount =

    filteredData.filter(

      (item) =>

        item.risk_level === "MEDIUM"

    ).length;



  const lowRiskCount =

    filteredData.filter(

      (item) =>

        item.risk_level === "LOW"

    ).length;



  return (

    <div className="space-y-6 p-6">



      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">



        <h1 className="text-3xl font-bold text-white">

          District Analysis

        </h1>



        <select

          value={selectedDistrict}

          onChange={(e) =>

            setSelectedDistrict(

              e.target.value

            )

          }

          className="bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-2"

        >

          <option value="All">

            All Districts

          </option>



          {districts.map(

            (district) => (

              <option

                key={district}

                value={district}

              >

                {district}

              </option>

            )

          )}

        </select>



      </div>



      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">



        <div className="bg-slate-800 rounded-xl p-4">

          <h3 className="text-gray-400">

            Total Predictions

          </h3>



          <p className="text-3xl font-bold text-white">

            {totalPredictions}

          </p>

        </div>



        <div className="bg-red-900 rounded-xl p-4">

          <h3 className="text-red-200">

            High Risk

          </h3>



          <p className="text-3xl font-bold text-white">

            {highRiskCount}

          </p>

        </div>



        <div className="bg-yellow-700 rounded-xl p-4">

          <h3 className="text-yellow-100">

            Medium Risk

          </h3>



          <p className="text-3xl font-bold text-white">

            {mediumRiskCount}

          </p>

        </div>



        <div className="bg-green-700 rounded-xl p-4">

          <h3 className="text-green-100">

            Low Risk

          </h3>



          <p className="text-3xl font-bold text-white">

            {lowRiskCount}

          </p>

        </div>



      </div>



      {/* Risk Chart */}

      <div className="bg-slate-800 rounded-xl p-4">

        <h2 className="text-xl font-semibold text-white mb-4">

          District Risk Trend

        </h2>



        <DistrictRiskChart

          data={filteredData}

        />

      </div>



      {/* Ranking Table */}

      <div className="bg-slate-800 rounded-xl p-4">

        <h2 className="text-xl font-semibold text-white mb-4">

          District Ranking

        </h2>



        <DistrictRankingTable

          data={filteredData}

        />

      </div>



      {/* Prediction Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">



        <div className="bg-slate-800 rounded-xl p-4">

          <h3 className="text-white font-semibold">

            2 Week Forecast

          </h3>



          <p className="text-2xl font-bold text-cyan-400 mt-2">

            {

              filteredData[0]

                ?.expected_cases_2w || 0

            }

          </p>

        </div>



        <div className="bg-slate-800 rounded-xl p-4">

          <h3 className="text-white font-semibold">

            Average Surge Probability

          </h3>



          <p className="text-2xl font-bold text-orange-400 mt-2">

            {filteredData.length

              ? (

                  filteredData.reduce(

                    (sum, item) =>

                      sum +

                      (item.surge_probability ||

                        0),

                    0

                  ) /

                  filteredData.length

                ).toFixed(2)

              : "0.00"}

          </p>

        </div>



      </div>



    </div>

  );

}

