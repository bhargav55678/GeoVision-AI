import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const API_URL = "http://127.0.0.1:8000";


const History = () => {

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // -----------------------------------------
  // Fetch history
  // -----------------------------------------

  const fetchHistory = async () => {

    try {

      setLoading(true);

      setError("");


      const response = await fetch(
        `${API_URL}/history/`
      );


      if (!response.ok) {

        throw new Error(
          "Failed to load analysis history."
        );

      }


      const data = await response.json();

      setHistory(data);

    } catch (err) {

      console.error(
        "HISTORY ERROR:",
        err
      );

      setError(
        "Unable to load analysis history."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchHistory();

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

      <main className="max-w-[1600px] mx-auto px-6 md:px-10 py-10">


        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">

          <div>

            <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">

              Analysis History

            </h1>


            <p className="text-slate-400 mt-3 text-lg">

              Review your previous satellite image comparisons

            </p>

          </div>


          {!loading && !error && history.length > 0 && (

            <div className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-3">

              <p className="text-xs text-slate-500">
                Total Analyses
              </p>

              <p className="text-2xl font-bold text-cyan-400">
                {history.length}
              </p>

            </div>

          )}

        </div>



        {/* ================================= */}
        {/* LOADING */}
        {/* ================================= */}

        {loading && (

          <div className="flex justify-center items-center py-24">

            <div className="text-center">

              <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-700 border-t-cyan-400 mx-auto" />

              <p className="mt-4 text-slate-400">

                Loading analysis history...

              </p>

            </div>

          </div>

        )}



        {/* ================================= */}
        {/* ERROR */}
        {/* ================================= */}

        {!loading && error && (

          <div className="bg-red-500/10 border border-red-500/40 rounded-xl p-8 text-center">

            <h2 className="text-xl font-semibold text-red-400">

              Unable to load history

            </h2>


            <p className="text-slate-400 mt-2">

              {error}

            </p>


            <button
              onClick={fetchHistory}
              className="
                mt-5
                bg-cyan-500
                hover:bg-cyan-400
                text-black
                font-bold
                px-6
                py-3
                rounded-lg
                transition
              "
            >

              Try Again

            </button>

          </div>

        )}



        {/* ================================= */}
        {/* EMPTY HISTORY */}
        {/* ================================= */}

        {!loading &&
          !error &&
          history.length === 0 && (

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-14 text-center">

              <h2 className="text-2xl font-semibold">

                No Analysis History

              </h2>


              <p className="text-slate-400 mt-3">

                Your completed image comparisons will appear here.

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
                  transition
                "
              >

                Start an Analysis

              </Link>

            </div>

          )}



        {/* ================================= */}
        {/* HISTORY LIST */}
        {/* ================================= */}

        {!loading &&
          !error &&
          history.length > 0 && (

            <div className="space-y-6">

              {history.map((item) => (

                <div
                  key={item.id}
                  className="
                    bg-slate-900
                    rounded-2xl
                    p-6
                    border
                    border-slate-800
                    shadow-lg
                    hover:border-cyan-500/40
                    transition
                    duration-200
                  "
                >

                  <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-8">


                    {/* ================================= */}
                    {/* COMPARISON IMAGE */}
                    {/* ================================= */}

                    <div className="flex items-center">

                      <img
                        src={`${API_URL}/${item.comparison_image.replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt={`Comparison result ${item.id}`}
                        className="
                          w-full
                          aspect-video
                          object-contain
                          rounded-xl
                          border
                          border-slate-700
                          bg-slate-950
                        "
                      />

                    </div>



                    {/* ================================= */}
                    {/* INFORMATION */}
                    {/* ================================= */}

                    <div className="flex flex-col">


                      {/* Header */}

                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">

                        <div>

                          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-wide">

                            Analysis Record

                          </p>


                          <h2 className="text-2xl font-bold mt-1">

                            Analysis #{item.id}

                          </h2>


                          <p className="text-slate-500 text-sm mt-1">

                            {formatDate(item.created_at)}

                          </p>

                        </div>


                        {/* Status */}

                        <span
                          className={
                            item.status === "Change Detected"
                              ? `
                                inline-flex
                                w-fit
                                bg-red-500/20
                                text-red-400
                                border
                                border-red-500/30
                                px-4
                                py-2
                                rounded-full
                                font-semibold
                              `
                              : `
                                inline-flex
                                w-fit
                                bg-green-500/20
                                text-green-400
                                border
                                border-green-500/30
                                px-4
                                py-2
                                rounded-full
                                font-semibold
                              `
                          }
                        >

                          {item.status}

                        </span>

                      </div>



                      {/* Statistics */}

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">


                        {/* Changed Regions */}

                        <div className="bg-slate-800/70 rounded-xl p-5 border border-slate-700">

                          <p className="text-slate-400 text-sm">

                            Changed Regions

                          </p>


                          <p className="text-3xl font-bold text-cyan-400 mt-2">

                            {item.changed_regions}

                          </p>

                        </div>


                        {/* Changed Area */}

                        <div className="bg-slate-800/70 rounded-xl p-5 border border-slate-700">

                          <p className="text-slate-400 text-sm">

                            Changed Area

                          </p>


                          <p className="text-3xl font-bold text-cyan-400 mt-2">

                            {item.changed_area_percentage}%

                          </p>

                        </div>


                        {/* Confidence */}

                        <div className="bg-slate-800/70 rounded-xl p-5 border border-slate-700">

                          <p className="text-slate-400 text-sm">

                            Confidence

                          </p>


                          <p className="text-3xl font-bold text-emerald-400 mt-2">

                            {item.confidence}%

                          </p>

                        </div>

                      </div>



                      {/* Image names */}

                      <div className="mt-6 bg-slate-800/40 border border-slate-800 rounded-xl p-4 text-sm">

                        <p className="text-slate-400">

                          <span className="text-white font-semibold">
                            Before:
                          </span>{" "}

                          {item.before_image}

                        </p>


                        <p className="text-slate-400 mt-2">

                          <span className="text-white font-semibold">
                            After:
                          </span>{" "}

                          {item.after_image}

                        </p>

                      </div>



                      {/* View Result */}

                      <div className="mt-6">

                        <Link
                          to={`/history/${item.id}`}
                          className="
                            inline-flex
                            items-center
                            justify-center
                            bg-cyan-500
                            hover:bg-cyan-400
                            text-black
                            font-bold
                            px-6
                            py-3
                            rounded-lg
                            transition
                            duration-200
                          "
                        >

                          View Result →

                        </Link>

                      </div>

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


export default History;