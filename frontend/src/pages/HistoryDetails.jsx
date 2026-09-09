import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Download,
  RefreshCw,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Image as ImageIcon,
  Activity,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";

const API_URL = "http://127.0.0.https://geovision-ai-f3h3.onrender.com1:8000";

const HistoryDetails = () => {
  const { id } = useParams();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalysis();
  }, [id]);

  const loadAnalysis = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/history/${id}`
      );

      if (!response.ok) {
        throw new Error("Analysis not found");
      }

      const data = await response.json();

      setAnalysis(data);

    } catch (error) {
      console.error(
        "History details error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (filename) => {
    if (!filename) return null;

    const cleanPath = filename
      .replace(/\\/g, "/")
      .replace(/^\/+/, "");

    if (cleanPath.startsWith("uploads/")) {
      return `${API_URL}/${cleanPath}`;
    }

    return `${API_URL}/uploads/${cleanPath}`;
  };

  const detected =
    analysis &&
    (
      analysis.status?.toLowerCase() ===
        "change detected" ||
      analysis.changed_regions > 0
    );

  const downloadResult = async () => {
    if (!analysis?.comparison_image) {
      return;
    }

    try {
      const imageUrl = getImageUrl(
        analysis.comparison_image
      );

      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error(
          "Unable to download image"
        );
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `GeoVision-Result-${analysis.id}.png`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(
        "Download error:",
        error
      );

      alert(
        "Unable to download the result."
      );
    }
  };

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#10141a] text-[#dfe2eb]">

        <Sidebar />

        <main className="ml-80 min-h-screen">

          <div className="flex min-h-screen items-center justify-center">

            <div className="text-center">

              <div className="
                mx-auto
                mb-5
                h-12
                w-12
                animate-spin
                rounded-full
                border-2
                border-slate-700
                border-t-cyan-400
              " />

              <p className="
                font-mono
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-cyan-400
              ">
                Loading Analysis Record
              </p>

            </div>

          </div>

        </main>

      </div>
    );
  }


  /* =========================================
     NOT FOUND
  ========================================= */

  if (!analysis) {
    return (
      <div className="min-h-screen bg-[#10141a] text-[#dfe2eb]">

        <Sidebar />

        <main className="ml-80 min-h-screen">

          <div className="flex min-h-screen items-center justify-center px-8">

            <div className="
              w-full
              max-w-lg
              rounded-xl
              border
              border-white/10
              bg-[#111827]/80
              p-10
              text-center
              backdrop-blur-md
            ">

              <AlertTriangle
                size={42}
                className="
                  mx-auto
                  mb-5
                  text-red-400
                "
              />

              <h1 className="
                text-2xl
                font-bold
              ">
                Analysis Not Found
              </h1>

              <p className="
                mt-2
                text-sm
                text-slate-500
              ">
                The requested analysis record
                could not be loaded.
              </p>

              <Link
                to="/history"
                className="
                  mt-7
                  inline-flex
                  items-center
                  gap-2
                  rounded-md
                  bg-cyan-400
                  px-5
                  py-3
                  font-mono
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-[#00363a]
                  transition
                  hover:bg-cyan-300
                "
              >
                <ArrowLeft size={16} />
                Back to History
              </Link>

            </div>

          </div>

        </main>

      </div>
    );
  }


  return (
    <div className="
      min-h-screen
      bg-[#10141a]
      text-[#dfe2eb]
    ">

      {/* =====================================
          SIDEBAR
      ===================================== */}

      <Sidebar />


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main className="ml-80 min-h-screen">


        {/* ===================================
            HEADER
        =================================== */}

        <header className="
          sticky
          top-0
          z-30
          flex
          h-16
          items-center
          justify-between
          border-b
          border-white/10
          bg-[#10141a]/90
          px-8
          backdrop-blur-xl
        ">

          <div className="flex items-center gap-3">

            <Activity
              size={18}
              className="text-cyan-400"
            />

            <span className="
              font-mono
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              text-slate-300
            ">
              Analysis Record
            </span>

          </div>


          <div className="
            font-mono
            text-xs
            text-slate-500
          ">
            GEO-VISION / ARCHIVE
          </div>

        </header>


        {/* ===================================
            CONTENT
        =================================== */}

        <section className="
          relative
          px-8
          py-10
        ">

          {/* Background glow */}

          <div className="
            pointer-events-none
            absolute
            right-0
            top-0
            h-96
            w-96
            rounded-full
            bg-cyan-500/5
            blur-[120px]
          " />


          <div className="
            relative
            mx-auto
            max-w-[1500px]
          ">


            {/* =================================
                TOP TITLE
            ================================= */}

            <div className="
              mb-8
              flex
              items-start
              justify-between
            ">

              <div>

                <Link
                  to="/history"
                  className="
                    mb-4
                    inline-flex
                    items-center
                    gap-2
                    font-mono
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-500
                    transition
                    hover:text-cyan-400
                  "
                >
                  <ArrowLeft size={15} />
                  Back to History
                </Link>


                <div className="
                  flex
                  flex-wrap
                  items-center
                  gap-4
                ">

                  <h1 className="
                    font-[Space_Grotesk]
                    text-4xl
                    font-bold
                    tracking-tight
                  ">
                    Analysis #{String(
                      analysis.id
                    ).padStart(4, "0")}
                  </h1>


                  <span className={`
                    inline-flex
                    items-center
                    gap-2
                    rounded
                    border
                    px-3
                    py-1.5
                    font-mono
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-wider
                    ${
                      detected
                        ? `
                          border-red-400/30
                          bg-red-400/10
                          text-red-400
                        `
                        : `
                          border-emerald-400/30
                          bg-emerald-400/10
                          text-emerald-400
                        `
                    }
                  `}>

                    {detected ? (
                      <AlertTriangle
                        size={14}
                      />
                    ) : (
                      <CheckCircle2
                        size={14}
                      />
                    )}

                    {analysis.status}

                  </span>

                </div>


                <p className="
                  mt-2
                  font-mono
                  text-xs
                  text-slate-500
                ">
                  {analysis.created_at
                    ? new Date(
                        analysis.created_at
                      ).toLocaleString()
                    : "Unknown timestamp"}
                </p>

              </div>

            </div>


            {/* =================================
                BEFORE / AFTER
            ================================= */}

            <div className="
              mb-6
              grid
              gap-6
              lg:grid-cols-2
            ">


              {/* BEFORE */}

              <div className="
                overflow-hidden
                rounded-xl
                border
                border-white/10
                bg-[#111827]/80
                backdrop-blur-md
              ">

                <div className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  px-5
                  py-4
                ">

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <ImageIcon
                      size={18}
                      className="text-cyan-400"
                    />

                    <span className="
                      font-mono
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-slate-200
                    ">
                      Before Image
                    </span>

                  </div>

                  <span className="
                    font-mono
                    text-[10px]
                    uppercase
                    tracking-wider
                    text-slate-600
                  ">
                    SOURCE A
                  </span>

                </div>


                <div className="
                  relative
                  flex
                  min-h-[350px]
                  items-center
                  justify-center
                  overflow-hidden
                  bg-[#0a0e14]
                ">

                  {analysis.before_image ? (
                    <img
                      src={getImageUrl(
                        analysis.before_image
                      )}
                      alt="Before"
                      className="
                        block
                        max-h-[500px]
                        w-full
                        object-contain
                      "
                    />
                  ) : (
                    <p className="
                      font-mono
                      text-xs
                      text-slate-600
                    ">
                      IMAGE UNAVAILABLE
                    </p>
                  )}

                  <div className="
                    pointer-events-none
                    absolute
                    left-3
                    top-3
                    h-5
                    w-5
                    border-l
                    border-t
                    border-cyan-400/60
                  " />

                </div>

              </div>


              {/* AFTER */}

              <div className="
                overflow-hidden
                rounded-xl
                border
                border-white/10
                bg-[#111827]/80
                backdrop-blur-md
              ">

                <div className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  px-5
                  py-4
                ">

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <ImageIcon
                      size={18}
                      className="text-cyan-400"
                    />

                    <span className="
                      font-mono
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-slate-200
                    ">
                      After Image
                    </span>

                  </div>

                  <span className="
                    font-mono
                    text-[10px]
                    uppercase
                    tracking-wider
                    text-slate-600
                  ">
                    SOURCE B
                  </span>

                </div>


                <div className="
                  relative
                  flex
                  min-h-[350px]
                  items-center
                  justify-center
                  overflow-hidden
                  bg-[#0a0e14]
                ">

                  {analysis.after_image ? (
                    <img
                      src={getImageUrl(
                        analysis.after_image
                      )}
                      alt="After"
                      className="
                        block
                        max-h-[500px]
                        w-full
                        object-contain
                      "
                    />
                  ) : (
                    <p className="
                      font-mono
                      text-xs
                      text-slate-600
                    ">
                      IMAGE UNAVAILABLE
                    </p>
                  )}

                  <div className="
                    pointer-events-none
                    absolute
                    bottom-3
                    right-3
                    h-5
                    w-5
                    border-b
                    border-r
                    border-cyan-400/60
                  " />

                </div>

              </div>

            </div>


            {/* =================================
                COMPARISON RESULT
            ================================= */}

            <div className="
              mb-6
              overflow-hidden
              rounded-xl
              border
              border-cyan-400/20
              bg-[#111827]/80
              backdrop-blur-md
            ">

              <div className="
                flex
                items-center
                justify-between
                border-b
                border-white/10
                px-6
                py-4
              ">

                <div className="
                  flex
                  items-center
                  gap-3
                ">

                  <Activity
                    size={19}
                    className="text-cyan-400"
                  />

                  <span className="
                    font-mono
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-slate-200
                  ">
                    AI Comparison Result
                  </span>

                </div>


                <span className="
                  rounded
                  border
                  border-cyan-400/30
                  bg-cyan-400/10
                  px-3
                  py-1
                  font-mono
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-cyan-400
                ">
                  AI DETECTED
                </span>

              </div>


              <div className="
                relative
                flex
                min-h-[420px]
                items-center
                justify-center
                overflow-hidden
                bg-[#0a0e14]
                p-4
              ">

                {analysis.comparison_image ? (
                  <img
                    src={getImageUrl(
                      analysis.comparison_image
                    )}
                    alt="Comparison Result"
                    className="
                      block
                      max-h-[600px]
                      w-full
                      object-contain
                    "
                  />
                ) : (
                  <p className="
                    font-mono
                    text-xs
                    text-slate-600
                  ">
                    COMPARISON RESULT UNAVAILABLE
                  </p>
                )}


                {/* HUD corners */}

                <div className="
                  pointer-events-none
                  absolute
                  left-5
                  top-5
                  h-7
                  w-7
                  border-l
                  border-t
                  border-cyan-400/70
                " />

                <div className="
                  pointer-events-none
                  absolute
                  right-5
                  top-5
                  h-7
                  w-7
                  border-r
                  border-t
                  border-cyan-400/70
                " />

                <div className="
                  pointer-events-none
                  absolute
                  bottom-5
                  left-5
                  h-7
                  w-7
                  border-b
                  border-l
                  border-cyan-400/70
                " />

                <div className="
                  pointer-events-none
                  absolute
                  bottom-5
                  right-5
                  h-7
                  w-7
                  border-b
                  border-r
                  border-cyan-400/70
                " />

              </div>

            </div>


            {/* =================================
                STATISTICS
            ================================= */}

            <div className="
              mb-6
              grid
              grid-cols-1
              gap-4
              md:grid-cols-2
              xl:grid-cols-4
            ">


              {/* Changed Regions */}

              <div className="
                rounded-xl
                border
                border-white/10
                bg-[#111827]/80
                p-5
                backdrop-blur-md
              ">

                <p className="
                  font-mono
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-500
                ">
                  Changed Regions
                </p>

                <p className="
                  mt-2
                  font-mono
                  text-3xl
                  font-bold
                  text-cyan-400
                ">
                  {analysis.changed_regions ?? 0}
                </p>

              </div>


              {/* Changed Area */}

              <div className="
                rounded-xl
                border
                border-white/10
                bg-[#111827]/80
                p-5
                backdrop-blur-md
              ">

                <p className="
                  font-mono
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-500
                ">
                  Changed Area
                </p>

                <p className="
                  mt-2
                  font-mono
                  text-3xl
                  font-bold
                  text-cyan-400
                ">
                  {analysis.changed_area_percentage ?? 0}%
                </p>

              </div>


              {/* Confidence */}

              <div className="
                rounded-xl
                border
                border-white/10
                bg-[#111827]/80
                p-5
                backdrop-blur-md
              ">

                <p className="
                  font-mono
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-500
                ">
                  AI Confidence
                </p>

                <p className="
                  mt-2
                  font-mono
                  text-3xl
                  font-bold
                  text-emerald-400
                ">
                  {analysis.confidence ?? 0}%
                </p>

              </div>


              {/* Status */}

              <div className="
                rounded-xl
                border
                border-white/10
                bg-[#111827]/80
                p-5
                backdrop-blur-md
              ">

                <p className="
                  font-mono
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-500
                ">
                  Detection Status
                </p>

                <p className={`
                  mt-2
                  flex
                  items-center
                  gap-2
                  text-lg
                  font-bold
                  ${
                    detected
                      ? "text-red-400"
                      : "text-emerald-400"
                  }
                `}>

                  {detected ? (
                    <AlertTriangle size={18} />
                  ) : (
                    <CheckCircle2 size={18} />
                  )}

                  {analysis.status}

                </p>

              </div>

            </div>


            {/* =================================
                ACTIONS
            ================================= */}

            <div className="
              grid
              gap-3
              md:grid-cols-3
            ">

              <button
                onClick={downloadResult}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-md
                  bg-[#00dbe7]
                  py-4
                  font-mono
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.1em]
                  text-[#002022]
                  transition
                  hover:bg-[#74f5ff]
                "
              >

                <Download size={18} />

                Download Result

              </button>


              <Link
                to="/analysis"
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-md
                  border
                  border-cyan-400/50
                  py-4
                  font-mono
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.1em]
                  text-cyan-400
                  transition
                  hover:bg-cyan-400/10
                "
              >

                <RefreshCw size={18} />

                Compare Again

              </Link>


              <Link
                to="/reports"
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-md
                  border
                  border-purple-400/30
                  bg-purple-500/10
                  py-4
                  font-mono
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.1em]
                  text-purple-300
                  transition
                  hover:bg-purple-500/20
                "
              >

                <FileText size={18} />

                Open Reports

              </Link>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
};

export default HistoryDetails;