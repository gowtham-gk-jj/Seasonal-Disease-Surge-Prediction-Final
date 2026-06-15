

import React, { useMemo } from "react";

import {

  ResponsiveContainer,

  BarChart,

  Bar,

  XAxis,

  YAxis,

  CartesianGrid,

  Tooltip,

} from "recharts";



export default function DistrictRiskChart({

  data = [],

  color = "#ef4444",

}) {



  // Remove duplicate districts

  const chartData = useMemo(() => {

    const grouped = {};



    data.forEach((item) => {

      const district = item.district;



      if (!district) return;



      if (!grouped[district]) {

        grouped[district] = {

          district,

          surge_probability:

            Number(item.surge_probability) || 0,

        };

      } else {

        // Keep highest risk value

        grouped[district].surge_probability =

          Math.max(

            grouped[district].surge_probability,

            Number(item.surge_probability) || 0

          );

      }

    });



    return Object.values(grouped)

      .sort(

        (a, b) =>

          b.surge_probability -

          a.surge_probability

      )

      .slice(0, 20); // Top 20 districts

  }, [data]);



  return (

    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">



      <h2 className="text-white text-lg font-bold mb-4">

        District Risk Ranking

      </h2>



      <ResponsiveContainer

        width="100%"

        height={500}

      >

        <BarChart

          data={chartData}

          layout="vertical"

          margin={{

            top: 10,

            right: 30,

            left: 40,

            bottom: 10,

          }}

        >

          <CartesianGrid

            stroke="#334155"

          />



          <XAxis

            type="number"

            domain={[0, 1]}

            tickFormatter={(v) =>

              `${Math.round(v * 100)}%`

            }

            stroke="#94a3b8"

          />



          <YAxis

            type="category"

            dataKey="district"

            width={140}

            stroke="#94a3b8"

          />



          <Tooltip

            formatter={(value) => [

              `${Math.round(

                value * 100

              )}%`,

              "Surge Risk",

            ]}

          />



          <Bar

            dataKey="surge_probability"

            fill={color}

            radius={[0, 6, 6, 0]}

          />

        </BarChart>

      </ResponsiveContainer>



    </div>

  );

}

