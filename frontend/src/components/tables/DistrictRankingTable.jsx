

import React, { useMemo } from "react";



function RiskBadge({ level }) {

  const styles = {

    HIGH: "bg-red-500/20 text-red-400 border-red-500/30",

    MEDIUM:

      "bg-orange-500/20 text-orange-400 border-orange-500/30",

    LOW: "bg-green-500/20 text-green-400 border-green-500/30",

  };



  return (

    <span

      className={`px-2 py-1 rounded text-xs font-bold border ${

        styles[level] || styles.LOW

      }`}

    >

      {level}

    </span>

  );

}



export default function DistrictRankingTable({

  data = [],

}) {



  const districtRanking = useMemo(() => {

    const grouped = {};



    data.forEach((item) => {

      const district = item.district;



      if (!district) return;



      if (!grouped[district]) {

        grouped[district] = {

          district,

          surge_probability:

            Number(item.surge_probability) || 0,

          expected_cases_2w:

            Number(item.expected_cases_2w) || 0,

          risk_level:

            item.risk_level || "LOW",

        };

      } else {

        // Keep highest risk value

        if (

          Number(item.surge_probability) >

          grouped[district].surge_probability

        ) {

          grouped[district] = {

            district,

            surge_probability:

              Number(item.surge_probability) || 0,

            expected_cases_2w:

              Number(item.expected_cases_2w) || 0,

            risk_level:

              item.risk_level || "LOW",

          };

        }

      }

    });



    return Object.values(grouped).sort(

      (a, b) =>

        b.surge_probability -

        a.surge_probability

    );

  }, [data]);



  return (

    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">



      <div className="px-4 py-3 border-b border-slate-800">

        <h2 className="text-lg font-bold text-white">

          District Ranking

        </h2>



        <p className="text-xs text-slate-500">

          Ranked by surge probability

        </p>

      </div>



      <div className="overflow-x-auto">



        <table className="w-full text-sm">



          <thead>

            <tr className="bg-slate-800 text-slate-300">

              <th className="px-4 py-3 text-left">

                Rank

              </th>



              <th className="px-4 py-3 text-left">

                District

              </th>



              <th className="px-4 py-3 text-left">

                Risk Score

              </th>



              <th className="px-4 py-3 text-left">

                Expected Cases

              </th>



              <th className="px-4 py-3 text-left">

                Risk Level

              </th>

            </tr>

          </thead>



          <tbody>

            {districtRanking.map(

              (district, index) => (

                <tr

                  key={district.district}

                  className="border-b border-slate-800 hover:bg-slate-800/40"

                >

                  <td className="px-4 py-3 text-cyan-400 font-bold">

                    #{index + 1}

                  </td>



                  <td className="px-4 py-3 text-white font-semibold">

                    {district.district}

                  </td>



                  <td className="px-4 py-3 text-orange-400">

                    {Math.round(

                      district.surge_probability *

                        100

                    )}

                    %

                  </td>



                  <td className="px-4 py-3 text-slate-300">

                    {district.expected_cases_2w}

                  </td>



                  <td className="px-4 py-3">

                    <RiskBadge

                      level={

                        district.risk_level

                      }

                    />

                  </td>

                </tr>

              )

            )}

          </tbody>



        </table>



      </div>



    </div>

  );

}

