import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ReportGenerator from "../components/ReportGenerator";


const API_URL = "http://127.0.0.1:8000";


const Reports = () => {

  const [reports, setReports] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // -----------------------------------------
  // Fetch analysis history
  // -----------------------------------------

  const fetchReports = async () => {

    try {

      setLoading(true);

      setError("");


      const response = await fetch(
        `${API_URL}/history/`
      );


      if (!response.ok) {

        throw new Error(
          "Failed to load reports."
        );

      }


      const data = await response.json();

      setReports(data);

    } catch (err) {

      console.error(
        "REPORTS ERROR:",
        err
      );

      setError(
        "Unable to load reports."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchReports();

  }, []);


  // -----------------------------------------
  // Format date
  // -----------------------------------------

  const formatDate = (date) => {

    if (!date) {
      return "Unknown";
    }

    return new Date(date).toLocaleString();

  };


  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <main className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">


        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="mb-10">

          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">

            Reports

          </h1>


          <p className="text-slate-400 mt-3 text-lg">

            Generate and download reports from your completed analyses

          </p>

        </div>



        {/* ================================= */}
        {/* LOADING */}
        {/* ================================= */}

        {loading && (

          <div className="flex justify-center py-24">

            <div className="text-center">

              <div className="
                animate-spin
                rounded-full
                h-12
                w-12
                border-4
                border-slate-700
                border-t-cyan-400
                mx-auto
              " />

              <p className="mt-4 text-slate-400">

                Loading reports...

              </p>

            </div>

          </div>

        )}



        {/* ================================= */}
        {/* ERROR */}
        {/* ================================= */}

        {!loading && error && (

          <div className="
            bg-red-500/10
            border
            border-red-500/40
            rounded-xl
            p-8
            text-center
          ">

            <h2 className="text-xl font-semibold text-red-400">

              Unable to load reports

            </h2>


            <p className="text-slate-400 mt-2">

              {error}

            </p>


            <button
              onClick={fetchReports}
              className="
                mt-5
                bg-cyan-500
                hover:bg-cyan-400
                text-black
                font-bold
                px-6
                py-3
                rounded-lg
              "
            >

              Try Again

            </button>

          </div>

        )}



        {/* ================================= */}
        {/* EMPTY */}
        {/* ================================= */}

        {!loading &&
          !error &&
          reports.length === 0 && (

            <div className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-14
              text-center
            ">

              <h2 className="text-2xl font-semibold">

                No Reports Available

              </h2>


              <p className="text-slate-400 mt-3">

                Complete an image comparison to generate your first report.

              </p>


              <Link
                to="/analysis"
                className="
                  inline-flex
                  mt-6
                  bg-cyan-500
                  hover:bg-cyan-400
                  text-black
                  font-bold
                  px-6
                  py-3
                  rounded-lg
                "
              >

                Start Analysis

              </Link>

            </div>

          )}



        {/* ================================= */}
        {/* REPORT LIST */}
        {/* ================================= */}

        {!loading &&
          !error &&
          reports.length > 0 && (

            <div className="space-y-5">

              {reports.map((report) => (

                <div
                  key={report.id}
                  className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-6
                    shadow-lg
                    hover:border-cyan-500/40
                    transition
                  "
                >

                  <div className="
                    flex
                    flex-col
                    lg:flex-row
                    lg:items-center
                    gap-6
                  ">


                    {/* ================================= */}
                    {/* REPORT INFO */}
                    {/* ================================= */}

                    <div className="flex-1">

                      <div className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        gap-3
                      ">

                        <h2 className="text-2xl font-bold">

                          Analysis Report #{report.id}

                        </h2>


                        <span
                          className={
                            report.status === "Change Detected"
                              ? `
                                w-fit
                                bg-red-500/20
                                text-red-400
                                border
                                border-red-500/30
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                font-semibold
                              `
                              : `
                                w-fit
                                bg-green-500/20
                                text-green-400
                                border
                                border-green-500/30
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                font-semibold
                              `
                          }
                        >

                          {report.status}

                        </span>

                      </div>


                      <p className="text-slate-500 text-sm mt-2">

                        {formatDate(report.created_at)}

                      </p>



                      {/* Statistics */}

                      <div className="
                        grid
                        grid-cols-1
                        sm:grid-cols-3
                        gap-4
                        mt-6
                      ">


                        <div className="bg-slate-800 rounded-xl p-4">

                          <p className="text-slate-400 text-sm">

                            Changed Regions

                          </p>

                          <p className="text-2xl font-bold text-cyan-400 mt-1">

                            {report.changed_regions}

                          </p>

                        </div>


                        <div className="bg-slate-800 rounded-xl p-4">

                          <p className="text-slate-400 text-sm">

                            Changed Area

                          </p>

                          <p className="text-2xl font-bold text-cyan-400 mt-1">

                            {report.changed_area_percentage}%

                          </p>

                        </div>


                        <div className="bg-slate-800 rounded-xl p-4">

                          <p className="text-slate-400 text-sm">

                            Confidence

                          </p>

                          <p className="text-2xl font-bold text-emerald-400 mt-1">

                            {report.confidence}%

                          </p>

                        </div>

                      </div>

                    </div>



                    {/* ================================= */}
                    {/* ACTIONS */}
                    {/* ================================= */}

                    <div className="
                      flex
                      flex-col
                      gap-3
                      lg:w-52
                    ">

                      <Link
                        to={`/history/${report.id}`}
                        className="
                          text-center
                          bg-slate-800
                          hover:bg-slate-700
                          border
                          border-slate-700
                          text-white
                          font-semibold
                          px-5
                          py-3
                          rounded-lg
                          transition
                        "
                      >

                        View Result

                      </Link>


                      <ReportGenerator
                        result={report}
                      />

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

      </main>

    </div>

  );

};


export default Reports;