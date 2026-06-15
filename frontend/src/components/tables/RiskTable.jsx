

import React from "react";



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

      {level || "LOW"}

    </span>

  );

}



export default function RiskTable({

  data = [],

  title = "Disease Risk Table",

}) {

  if (!Array.isArray(data)) {

    return null;

  }



  const sortedData = [...data].sort(

    (a, b) =>

      (b.surge_probability || 0) -

      (a.surge_probability || 0)

  );



  return (

    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">



      <div className="px-4 py-3 border-b border-slate-800">

        <h2 className="text-lg font-bold text-white">

          {title}

        </h2>

      </div>



      <div className="overflow-x-auto">



        <table className="w-full text-sm">



          <thead>

            <tr className="bg-slate-800 text-slate-300">



              <th className="text-left px-4 py-3">

                District

              </th>



              <th className="text-left px-4 py-3">

                Disease

              </th>



              <th className="text-left px-4 py-3">

                Surge Probability

              </th>



              <th className="text-left px-4 py-3">

                Expected Cases

              </th>



              <th className="text-left px-4 py-3">

                Risk Level

              </th>



            </tr>

          </thead>



          <tbody>



            {sortedData.map(

              (row, index) => (

                <tr

                  key={`${row.district}-${row.disease}-${row.week_number}-${index}`}

                  className="border-b border-slate-800 hover:bg-slate-800/40"

                >



                  <td className="px-4 py-3 text-white font-semibold">

                    {row.district || "-"}

                  </td>



                  <td className="px-4 py-3 text-slate-300">

                    {row.disease || "-"}

                  </td>



                  <td className="px-4 py-3 text-cyan-400">

                    {Math.round(

                      (row.surge_probability || 0) *

                        100

                    )}

                    %

                  </td>



                  <td className="px-4 py-3 text-slate-300">

                    {row.expected_cases_2w || 0}

                  </td>



                  <td className="px-4 py-3">

                    <RiskBadge

                      level={row.risk_level}

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

